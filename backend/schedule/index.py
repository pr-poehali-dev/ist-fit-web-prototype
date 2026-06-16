import json
import os
import psycopg2

SCHEMA = "t_p3549923_ist_fit_web_prototyp"

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Управление расписанием фитнес-центра: GET — список, POST — создать, PUT — обновить, DELETE — удалить."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")
    conn = get_conn()
    cur = conn.cursor()

    try:
        if method == "GET":
            cur.execute(f"""
                SELECT t.id, t.time, t.day, t.name,
                       tr.id as trainer_id, tr.name as trainer_name,
                       l.id as location_id, l.name as location_name
                FROM {SCHEMA}.timetable t
                JOIN {SCHEMA}.trainers tr ON t.trainer_id = tr.id
                JOIN {SCHEMA}.locations l ON t.location_id = l.id
                ORDER BY t.day, t.time
            """)
            rows = cur.fetchall()
            items = [
                {"id": r[0], "time": r[1], "day": r[2], "name": r[3],
                 "trainer_id": r[4], "trainer_name": r[5],
                 "location_id": r[6], "location_name": r[7]}
                for r in rows
            ]

            cur.execute(f"SELECT id, name FROM {SCHEMA}.trainers ORDER BY id")
            trainers = [{"id": r[0], "name": r[1]} for r in cur.fetchall()]

            cur.execute(f"SELECT id, name FROM {SCHEMA}.locations ORDER BY id")
            locations = [{"id": r[0], "name": r[1]} for r in cur.fetchall()]

            return {"statusCode": 200, "headers": cors, "body": json.dumps({"schedule": items, "trainers": trainers, "locations": locations}, ensure_ascii=False)}

        body = json.loads(event.get("body") or "{}")

        if method == "POST":
            cur.execute(
                f"INSERT INTO {SCHEMA}.timetable (time, day, name, trainer_id, location_id) VALUES (%s, %s, %s, %s, %s) RETURNING id",
                (body["time"], body["day"], body["name"], body["trainer_id"], body["location_id"])
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"id": new_id})}

        if method == "PUT":
            cur.execute(
                f"UPDATE {SCHEMA}.timetable SET time=%s, day=%s, name=%s, trainer_id=%s, location_id=%s WHERE id=%s",
                (body["time"], body["day"], body["name"], body["trainer_id"], body["location_id"], body["id"])
            )
            conn.commit()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

        if method == "DELETE":
            cur.execute(f"DELETE FROM {SCHEMA}.timetable WHERE id=%s", (body["id"],))
            conn.commit()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    finally:
        cur.close()
        conn.close()
