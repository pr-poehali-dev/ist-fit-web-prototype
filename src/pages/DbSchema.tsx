import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TEAL = "#0ea5a0";

type Field = { name: string; type: string; pk?: boolean; fk?: boolean; nn?: boolean };
type Table = { id: string; label: string; fields: Field[]; x: number; y: number };
type Link = { from: string; fromField: string; to: string; toField: string };

const TABLES: Table[] = [
  {
    id: "news", label: "fitness.news", x: 20, y: 20,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "name", type: "varchar(50)", nn: true },
      { name: "date", type: "datetime" },
      { name: "img", type: "varchar(1000)" },
      { name: "text", type: "varchar(1000)" },
      { name: "liked", type: "tinyint(1)" },
    ],
  },
  {
    id: "news_pic", label: "fitness.news_pic", x: 300, y: 20,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "date", type: "datetime" },
      { name: "img", type: "varchar(1000)" },
      { name: "newsID", type: "int(11)", fk: true },
    ],
  },
  {
    id: "advertisment", label: "fitness.advertisment", x: 540, y: 20,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "text", type: "varchar(1000)" },
      { name: "img", type: "varchar(50)" },
    ],
  },
  {
    id: "tariffs", label: "fitness.tariffs", x: 760, y: 20,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "name", type: "varchar(100)" },
      { name: "text", type: "varchar(100)" },
      { name: "loc", type: "varchar(1000)" },
      { name: "price", type: "varchar(1000)" },
    ],
  },
  {
    id: "sale", label: "fitness.sale", x: 1000, y: 20,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "name", type: "varchar(100)" },
      { name: "text", type: "varchar(100)" },
    ],
  },
  {
    id: "requests", label: "fitness.requests", x: 1200, y: 20,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "date", type: "datetime" },
      { name: "name", type: "varchar(50)" },
      { name: "phone", type: "varchar(18)" },
      { name: "email", type: "varchar(50)" },
      { name: "text", type: "varchar(1000)" },
      { name: "processed", type: "tinyint(1)" },
    ],
  },
  {
    id: "contacts", label: "fitness.contacts", x: 1430, y: 20,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "address", type: "varchar(50)" },
      { name: "phone", type: "varchar(50)" },
      { name: "email", type: "varchar(50)" },
      { name: "vk", type: "varchar(50)" },
      { name: "inst", type: "varchar(50)" },
    ],
  },
  {
    id: "trainers_pic", label: "fitness.trainers_pic", x: 20, y: 380,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "name", type: "datetime" },
      { name: "date", type: "datetime" },
      { name: "trainerID", type: "int(11)", fk: true },
    ],
  },
  {
    id: "trainers", label: "fitness.trainers", x: 300, y: 420,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "name", type: "varchar(50)" },
      { name: "experience", type: "varchar(50)" },
      { name: "text", type: "varchar(1000)" },
    ],
  },
  {
    id: "timetable", label: "fitness.timetable", x: 600, y: 340,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "time", type: "varchar(25)" },
      { name: "day", type: "char(2)" },
      { name: "name", type: "varchar(25)" },
      { name: "trainerID", type: "int(11)", fk: true },
      { name: "locationID", type: "int(11)", fk: true },
    ],
  },
  {
    id: "locations", label: "fitness.locations", x: 920, y: 420,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "name", type: "varchar(50)" },
      { name: "square", type: "int(11)" },
      { name: "text", type: "varchar(1000)" },
    ],
  },
  {
    id: "locations_pic", label: "fitness.locations_pic", x: 1200, y: 380,
    fields: [
      { name: "ID", type: "int(11)", pk: true },
      { name: "date", type: "datetime" },
      { name: "img", type: "varchar(1000)" },
      { name: "locationID", type: "int(11)", fk: true },
    ],
  },
  {
    id: "admin", label: "fitness.admin", x: 1430, y: 380,
    fields: [
      { name: "login", type: "varchar(25)" },
      { name: "password", type: "varchar(50)" },
    ],
  },
];

const LINKS: Link[] = [
  { from: "news", fromField: "ID", to: "news_pic", toField: "newsID" },
  { from: "trainers", fromField: "ID", to: "trainers_pic", toField: "trainerID" },
  { from: "trainers", fromField: "ID", to: "timetable", toField: "trainerID" },
  { from: "locations", fromField: "ID", to: "timetable", toField: "locationID" },
  { from: "locations", fromField: "ID", to: "locations_pic", toField: "locationID" },
];

const TABLE_W = 220;
const HEADER_H = 30;
const ROW_H = 22;

function getTableHeight(t: Table) {
  return HEADER_H + t.fields.length * ROW_H + 8;
}

function getFieldY(t: Table, fieldName: string) {
  const idx = t.fields.findIndex((f) => f.name === fieldName);
  return t.y + HEADER_H + idx * ROW_H + ROW_H / 2;
}

function getAnchor(t: Table, fieldName: string, side: "left" | "right") {
  return {
    x: side === "right" ? t.x + TABLE_W : t.x,
    y: getFieldY(t, fieldName),
  };
}

export default function DbSchema() {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() =>
    Object.fromEntries(TABLES.map((t) => [t.id, { x: t.x, y: t.y }]))
  );
  const dragging = useRef<{ id: string; ox: number; oy: number } | null>(null);

  const tables = TABLES.map((t) => ({ ...t, ...positions[t.id] }));
  const tableMap = Object.fromEntries(tables.map((t) => [t.id, t]));

  const CANVAS_W = 1700;
  const CANVAS_H = 700;

  const onMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    dragging.current = { id, ox: svgP.x - positions[id].x, oy: svgP.y - positions[id].y };
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !svgRef.current) return;
      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM()!.inverse());
      const { id, ox, oy } = dragging.current;
      setPositions((prev) => ({ ...prev, [id]: { x: svgP.x - ox, y: svgP.y - oy } }));
    };
    const onUp = () => { dragging.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-foreground" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur" style={{ borderColor: "#e5e7eb" }}>
        <div className="max-w-full px-6 h-14 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <Icon name="ArrowLeft" size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">На сайт</span>
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <span className="text-base font-semibold tracking-widest" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
            IST<span className="text-foreground"> FIT</span>
          </span>
          <span className="text-sm text-muted-foreground">/ Схема базы данных</span>
          <span className="ml-auto text-xs text-muted-foreground">Таблицы можно перетаскивать</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="overflow-auto p-4" style={{ minHeight: "calc(100vh - 56px)" }}>
        <svg
          ref={svgRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ display: "block", cursor: "default", userSelect: "none" }}
        >
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
            </marker>
            <marker id="arrow-teal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={TEAL} />
            </marker>
          </defs>

          {/* Links */}
          {LINKS.map((link, i) => {
            const ft = tableMap[link.from];
            const tt = tableMap[link.to];
            if (!ft || !tt) return null;

            const fromRight = getAnchor(ft, link.fromField, "right");
            const toLeft = getAnchor(tt, link.toField, "left");
            const mx = (fromRight.x + toLeft.x) / 2;

            return (
              <g key={i}>
                <path
                  d={`M${fromRight.x},${fromRight.y} C${mx},${fromRight.y} ${mx},${toLeft.y} ${toLeft.x},${toLeft.y}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow)"
                />
                <circle cx={fromRight.x} cy={fromRight.y} r="3" fill={TEAL} />
              </g>
            );
          })}

          {/* Tables */}
          {tables.map((t) => {
            const h = getTableHeight(t);
            return (
              <g key={t.id} transform={`translate(${t.x},${t.y})`}
                onMouseDown={(e) => onMouseDown(e, t.id)}
                style={{ cursor: "grab" }}>

                {/* Shadow */}
                <rect x={3} y={3} width={TABLE_W} height={h} rx={6}
                  fill="rgba(0,0,0,0.08)" />

                {/* Body */}
                <rect width={TABLE_W} height={h} rx={6}
                  fill="white" stroke="#d1d5db" strokeWidth={1} />

                {/* Header */}
                <rect width={TABLE_W} height={HEADER_H} rx={6}
                  fill={TEAL} />
                <rect y={HEADER_H - 6} width={TABLE_W} height={8}
                  fill={TEAL} />

                {/* Header icon + label */}
                <text x={10} y={19}
                  fontSize={11} fontWeight={600} fill="white"
                  fontFamily="'Golos Text', sans-serif">
                  🗄 {t.label}
                </text>

                {/* Fields */}
                {t.fields.map((f, fi) => {
                  const fy = HEADER_H + fi * ROW_H + 4;
                  return (
                    <g key={f.name}>
                      {fi % 2 === 1 && (
                        <rect x={1} y={fy} width={TABLE_W - 2} height={ROW_H}
                          fill="#f8fafc" />
                      )}
                      {/* PK / FK icons */}
                      {f.pk && (
                        <text x={8} y={fy + 15} fontSize={10} fill="#f59e0b">🔑</text>
                      )}
                      {f.fk && (
                        <text x={8} y={fy + 15} fontSize={10} fill="#8b5cf6">🔗</text>
                      )}
                      {/* Field name */}
                      <text x={f.pk || f.fk ? 26 : 10} y={fy + 15}
                        fontSize={11} fill="#1e293b"
                        fontFamily="'Golos Text', sans-serif">
                        {f.name}
                      </text>
                      {/* Type */}
                      <text x={TABLE_W - 6} y={fy + 15}
                        fontSize={10} fill="#94a3b8" textAnchor="end"
                        fontFamily="'Golos Text', sans-serif">
                        {f.type}
                      </text>
                      {/* Row separator */}
                      <line x1={0} y1={fy + ROW_H} x2={TABLE_W} y2={fy + ROW_H}
                        stroke="#f1f5f9" strokeWidth={0.5} />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
