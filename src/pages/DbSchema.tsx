import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TEAL = "#0ea5a0";
const HEADER_BG = "#1a3a5c";
const BLUE = "#4a90d9";
const FONT = "'Golos Text', sans-serif";

type FieldKind = "pk" | "fk" | "index" | "plain";
type Field = { name: string; type: string; kind?: FieldKind };
type Table = { id: string; label: string; entity: string; fields: Field[]; x: number; y: number };
type Link = { from: string; fromField: string; to: string; toField: string };

const TABLES: Table[] = [
  {
    id: "news", label: "fitness", entity: "news", x: 20, y: 20,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "name", type: "varchar(50)", kind: "plain" },
      { name: "date", type: "datetime", kind: "plain" },
      { name: "img", type: "varchar(1000)", kind: "plain" },
      { name: "text", type: "varchar(1000)", kind: "plain" },
      { name: "liked", type: "tinyint(1)", kind: "plain" },
    ],
  },
  {
    id: "news_pic", label: "fitness", entity: "news_pic", x: 300, y: 20,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "date", type: "datetime", kind: "plain" },
      { name: "img", type: "varchar(1000)", kind: "plain" },
      { name: "newsID", type: "int(11)", kind: "fk" },
    ],
  },
  {
    id: "advertisment", label: "fitness", entity: "advertisment", x: 540, y: 20,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "text", type: "varchar(1000)", kind: "plain" },
      { name: "img", type: "varchar(50)", kind: "plain" },
    ],
  },
  {
    id: "tariffs", label: "fitness", entity: "tariffs", x: 760, y: 20,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "name", type: "varchar(100)", kind: "plain" },
      { name: "text", type: "varchar(100)", kind: "plain" },
      { name: "loc", type: "varchar(1000)", kind: "plain" },
      { name: "price", type: "varchar(1000)", kind: "plain" },
    ],
  },
  {
    id: "sale", label: "fitness", entity: "sale", x: 1000, y: 20,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "name", type: "varchar(100)", kind: "plain" },
      { name: "text", type: "varchar(100)", kind: "plain" },
    ],
  },
  {
    id: "requests", label: "fitness", entity: "requests", x: 1200, y: 20,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "date", type: "datetime", kind: "plain" },
      { name: "name", type: "varchar(50)", kind: "plain" },
      { name: "phone", type: "varchar(18)", kind: "plain" },
      { name: "email", type: "varchar(50)", kind: "plain" },
      { name: "text", type: "varchar(1000)", kind: "plain" },
      { name: "processed", type: "tinyint(1)", kind: "plain" },
    ],
  },
  {
    id: "contacts", label: "fitness", entity: "contacts", x: 1430, y: 20,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "address", type: "varchar(50)", kind: "plain" },
      { name: "phone", type: "varchar(50)", kind: "plain" },
      { name: "email", type: "varchar(50)", kind: "plain" },
      { name: "vk", type: "varchar(50)", kind: "plain" },
      { name: "inst", type: "varchar(50)", kind: "plain" },
    ],
  },
  {
    id: "trainers_pic", label: "fitness", entity: "trainers_pic", x: 20, y: 400,
    fields: [
      { name: "id", type: "integer", kind: "pk" },
      { name: "date", type: "date", kind: "plain" },
      { name: "img", type: "text", kind: "plain" },
      { name: "trainer_id", type: "integer", kind: "fk" },
    ],
  },
  {
    id: "trainers", label: "fitness", entity: "trainers", x: 300, y: 430,
    fields: [
      { name: "id", type: "integer", kind: "pk" },
      { name: "name", type: "varchar(255)", kind: "plain" },
      { name: "experience", type: "varchar(100)", kind: "index" },
      { name: "text", type: "text", kind: "plain" },
    ],
  },
  {
    id: "timetable", label: "fitness", entity: "timetable", x: 600, y: 350,
    fields: [
      { name: "id", type: "integer", kind: "pk" },
      { name: "time", type: "varchar(20)", kind: "plain" },
      { name: "day", type: "varchar(5)", kind: "plain" },
      { name: "name", type: "varchar(255)", kind: "plain" },
      { name: "trainer_id", type: "integer", kind: "fk" },
      { name: "location_id", type: "integer", kind: "fk" },
    ],
  },
  {
    id: "locations", label: "fitness", entity: "locations", x: 920, y: 430,
    fields: [
      { name: "id", type: "integer", kind: "pk" },
      { name: "name", type: "varchar(255)", kind: "plain" },
      { name: "square", type: "varchar(50)", kind: "index" },
      { name: "text", type: "text", kind: "plain" },
    ],
  },
  {
    id: "locations_pic", label: "fitness", entity: "locations_pic", x: 1200, y: 400,
    fields: [
      { name: "id", type: "integer", kind: "pk" },
      { name: "date", type: "date", kind: "plain" },
      { name: "img", type: "text", kind: "plain" },
      { name: "location_id", type: "integer", kind: "fk" },
    ],
  },
  {
    id: "admin", label: "fitness", entity: "admin", x: 1430, y: 400,
    fields: [
      { name: "login", type: "varchar(25)", kind: "plain" },
      { name: "password", type: "varchar(50)", kind: "plain" },
    ],
  },
];

const LINKS: Link[] = [
  { from: "news", fromField: "ID", to: "news_pic", toField: "newsID" },
  { from: "trainers", fromField: "id", to: "trainers_pic", toField: "trainer_id" },
  { from: "trainers", fromField: "id", to: "timetable", toField: "trainer_id" },
  { from: "locations", fromField: "id", to: "timetable", toField: "location_id" },
  { from: "locations", fromField: "id", to: "locations_pic", toField: "location_id" },
];

const TABLE_W = 230;
const HEADER_H = 34;
const ROW_H = 24;
const PAD_B = 6;

function tableH(t: Table) {
  return HEADER_H + t.fields.length * ROW_H + PAD_B;
}

function fieldCY(t: Table & { x: number; y: number }, fieldName: string) {
  const idx = t.fields.findIndex((f) => f.name === fieldName);
  return t.y + HEADER_H + idx * ROW_H + ROW_H / 2;
}

function linkAnchors(
  ft: Table & { x: number; y: number },
  ff: string,
  tt: Table & { x: number; y: number },
  tf: string
) {
  const fCX = ft.x + TABLE_W / 2;
  const tCX = tt.x + TABLE_W / 2;
  const fromSide = fCX < tCX ? "right" : "left";
  const toSide = fromSide === "right" ? "left" : "right";
  return {
    x1: fromSide === "right" ? ft.x + TABLE_W : ft.x,
    y1: fieldCY(ft, ff),
    x2: toSide === "left" ? tt.x : tt.x + TABLE_W,
    y2: fieldCY(tt, tf),
  };
}

function FieldIcon({ kind }: { kind?: FieldKind }) {
  if (kind === "pk") return <text fontSize={11} y={0} fill="#f59e0b">🔑</text>;
  if (kind === "fk") return <text fontSize={11} y={0} fill="#8b5cf6">■</text>;
  if (kind === "index") return <text fontSize={11} y={0} fill="#6366f1">◆</text>;
  return <text fontSize={11} y={0} fill="#94a3b8">○</text>;
}

function downloadSvgAsPng(svgEl: SVGSVGElement | null, filename: string) {
  if (!svgEl) return;
  const w = svgEl.width.baseVal.value || 1700;
  const h = svgEl.height.baseVal.value || 700;
  const scale = 2;
  const xml = new XMLSerializer().serializeToString(svgEl);
  const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = w * scale;
    canvas.height = h * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(scale, scale);
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    const a = document.createElement("a");
    a.download = filename;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };
  img.src = url;
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
  const CANVAS_H = 720;

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
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: FONT }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur border-gray-200">
        <div className="max-w-full px-6 h-14 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <Icon name="ArrowLeft" size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">На сайт</span>
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <span className="text-base font-semibold tracking-widest" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
            IST<span className="text-foreground"> FIT</span>
          </span>
          <span className="text-sm text-muted-foreground">/ Рис. 16 — Структура БД</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span style={{ color: "#f59e0b" }}>🔑</span> PK</span>
              <span className="flex items-center gap-1.5"><span style={{ color: "#8b5cf6", fontSize: 13 }}>■</span> FK</span>
              <span className="flex items-center gap-1.5"><span style={{ color: "#6366f1", fontSize: 13 }}>◆</span> Index</span>
              <span className="flex items-center gap-1.5"><span style={{ color: "#94a3b8", fontSize: 13 }}>○</span> Field</span>
              <span className="text-gray-300">|</span>
              <span>Перетаскивайте таблицы</span>
            </div>
            <button
              onClick={() => downloadSvgAsPng(svgRef.current, "db-schema-rис16.png")}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Download" size={13} />
              Скачать PNG
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-auto p-4" style={{ minHeight: "calc(100vh - 56px)" }}>
        <svg
          ref={svgRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ display: "block", userSelect: "none" }}
        >
          <defs>
            <marker id="arr-s" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
              <circle cx="3.5" cy="3.5" r="2.5" fill="#94a3b8" />
            </marker>
            <filter id="shadow-s" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.12)" />
            </filter>
          </defs>

          {/* Links */}
          {LINKS.map((link, i) => {
            const ft = tableMap[link.from];
            const tt = tableMap[link.to];
            if (!ft || !tt) return null;
            const { x1, y1, x2, y2 } = linkAnchors(ft, link.fromField, tt, link.toField);
            const mx = (x1 + x2) / 2;
            return (
              <g key={i}>
                <path
                  d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
                  fill="none" stroke="#a3c4e8" strokeWidth={1.5}
                />
                <circle cx={x1} cy={y1} r={3} fill={BLUE} />
                <circle cx={x2} cy={y2} r={3} fill="#f59e0b" />
              </g>
            );
          })}

          {/* Tables */}
          {tables.map((t) => {
            const h = tableH(t);
            return (
              <g key={t.id}
                transform={`translate(${t.x},${t.y})`}
                onMouseDown={(e) => onMouseDown(e, t.id)}
                style={{ cursor: "grab" }}
                filter="url(#shadow-s)"
              >
                <rect width={TABLE_W} height={h} rx={5} fill="white" stroke="#c8dff0" strokeWidth={1} />
                <rect width={TABLE_W} height={HEADER_H} rx={5} fill={HEADER_BG} />
                <rect y={HEADER_H - 5} width={TABLE_W} height={5} fill={HEADER_BG} />

                {/* Header icons */}
                <rect x={8} y={9} width={14} height={14} rx={2} fill={BLUE} />
                <text x={11} y={20} fontSize={10} fill="white" fontWeight={700} fontFamily={FONT}>v</text>
                <rect x={26} y={9} width={14} height={14} rx={2} fill={TEAL} />
                <text x={29} y={20} fontSize={10} fill="white" fontWeight={700} fontFamily={FONT}>o</text>

                {/* Label */}
                <text x={46} y={14} fontSize={10} fill="#94a3b8" fontFamily={FONT}>{t.label}.</text>
                <text x={46 + t.label.length * 6.2} y={14} fontSize={11} fontWeight={700} fill="white" fontFamily={FONT}>{t.entity}</text>

                <line x1={0} y1={HEADER_H} x2={TABLE_W} y2={HEADER_H} stroke="#c8dff0" strokeWidth={0.5} />

                {/* Fields */}
                {t.fields.map((f, fi) => {
                  const fy = HEADER_H + fi * ROW_H;
                  return (
                    <g key={f.name}>
                      {fi % 2 !== 0 && (
                        <rect x={1} y={fy} width={TABLE_W - 2} height={ROW_H} fill="#f0f6ff" />
                      )}
                      <g transform={`translate(8, ${fy + ROW_H / 2 + 4})`}>
                        <FieldIcon kind={f.kind} />
                      </g>
                      <text x={26} y={fy + ROW_H / 2 + 5} fontSize={11} fill="#1e293b" fontFamily={FONT}>{f.name}</text>
                      <text x={TABLE_W - 8} y={fy + ROW_H / 2 + 5} fontSize={10} fill="#7090b0" textAnchor="end" fontFamily={FONT}>: {f.type}</text>
                      <line x1={1} y1={fy + ROW_H} x2={TABLE_W - 1} y2={fy + ROW_H} stroke="#e8f0f8" strokeWidth={0.5} />
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