import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

function downloadSvgAsPng(svgEl: SVGSVGElement | null, filename: string) {
  if (!svgEl) return;
  const w = svgEl.width.baseVal.value || 1300;
  const h = svgEl.height.baseVal.value || 680;
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
    ctx.fillStyle = "#f3f4f6";
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

const TEAL = "#0ea5a0";
const BLUE = "#4a90d9";
const HEADER_BG = "#1a3a5c";

type FieldKind = "pk" | "fk" | "index" | "plain";
type Field = { name: string; type: string; kind?: FieldKind };
type Table = { id: string; label: string; entity: string; fields: Field[]; x: number; y: number };
type Link = { from: string; fromField: string; to: string; toField: string };

const TABLES: Table[] = [
  {
    id: "timetable", label: "fitness", entity: "timetable", x: 520, y: 20,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "time", type: "varchar(25)", kind: "plain" },
      { name: "day", type: "char(2)", kind: "plain" },
      { name: "name", type: "varchar(25)", kind: "plain" },
      { name: "trainerID", type: "int(11)", kind: "fk" },
      { name: "locationID", type: "int(11)", kind: "fk" },
    ],
  },
  {
    id: "trainers", label: "fitness", entity: "trainers", x: 240, y: 240,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "name", type: "varchar(50)", kind: "plain" },
      { name: "experience", type: "int(11)", kind: "index" },
      { name: "text", type: "varchar(1000)", kind: "plain" },
    ],
  },
  {
    id: "locations", label: "fitness", entity: "locations", x: 800, y: 240,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "name", type: "varchar(50)", kind: "plain" },
      { name: "square", type: "int(11)", kind: "index" },
      { name: "text", type: "varchar(1000)", kind: "plain" },
    ],
  },
  {
    id: "trainers_pic", label: "fitness", entity: "trainers_pic", x: 20, y: 420,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "date", type: "datetime", kind: "plain" },
      { name: "img", type: "varchar(1000)", kind: "plain" },
      { name: "trainerID", type: "int(11)", kind: "fk" },
    ],
  },
  {
    id: "locations_pic", label: "fitness", entity: "locations_pic", x: 1020, y: 420,
    fields: [
      { name: "ID", type: "int(11)", kind: "pk" },
      { name: "date", type: "datetime", kind: "plain" },
      { name: "img", type: "varchar(1000)", kind: "plain" },
      { name: "locationID", type: "int(11)", kind: "fk" },
    ],
  },
];

const LINKS: Link[] = [
  { from: "timetable", fromField: "trainerID", to: "trainers", toField: "ID" },
  { from: "timetable", fromField: "locationID", to: "locations", toField: "ID" },
  { from: "trainers", fromField: "ID", to: "trainers_pic", toField: "trainerID" },
  { from: "locations", fromField: "ID", to: "locations_pic", toField: "locationID" },
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

// Определяем, с какой стороны выходит/входит стрелка
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

export default function DbSchemaSchedule() {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() =>
    Object.fromEntries(TABLES.map((t) => [t.id, { x: t.x, y: t.y }]))
  );
  const dragging = useRef<{ id: string; ox: number; oy: number } | null>(null);

  const tables = TABLES.map((t) => ({ ...t, ...positions[t.id] }));
  const tableMap = Object.fromEntries(tables.map((t) => [t.id, t]));

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
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: "'Golos Text', sans-serif" }}>
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
          <span className="text-sm text-muted-foreground">/ Рис. 18 — Схема БД расписания</span>
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
              onClick={() => downloadSvgAsPng(svgRef.current, "db-schema-рис18.png")}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Download" size={13} />
              Скачать PNG
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-auto p-8" style={{ minHeight: "calc(100vh - 56px)" }}>
        <svg
          ref={svgRef}
          width={1300}
          height={680}
          style={{ display: "block", userSelect: "none" }}
        >
          <defs>
            <marker id="arr" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
              <circle cx="3.5" cy="3.5" r="2.5" fill="#94a3b8" />
            </marker>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
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
                  strokeDasharray="0"
                />
                <circle cx={x1} cy={y1} r={3} fill="#4a90d9" />
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
                filter="url(#shadow)"
              >
                {/* Card bg */}
                <rect width={TABLE_W} height={h} rx={5} fill="white" stroke="#c8dff0" strokeWidth={1} />

                {/* Header bg */}
                <rect width={TABLE_W} height={HEADER_H} rx={5} fill={HEADER_BG} />
                <rect y={HEADER_H - 5} width={TABLE_W} height={5} fill={HEADER_BG} />

                {/* Header icons */}
                <rect x={8} y={9} width={14} height={14} rx={2} fill={BLUE} />
                <text x={11} y={20} fontSize={10} fill="white" fontWeight={700}>v</text>
                <rect x={26} y={9} width={14} height={14} rx={2} fill={TEAL} />
                <text x={29} y={20} fontSize={10} fill="white" fontWeight={700}>o</text>

                {/* Label */}
                <text x={46} y={14} fontSize={10} fill="#94a3b8" fontFamily="'Golos Text', sans-serif">{t.label}.</text>
                <text x={46 + t.label.length * 6.2} y={14} fontSize={11} fontWeight={700} fill="white" fontFamily="'Golos Text', sans-serif">{t.entity}</text>

                {/* Divider */}
                <line x1={0} y1={HEADER_H} x2={TABLE_W} y2={HEADER_H} stroke="#c8dff0" strokeWidth={0.5} />

                {/* Fields */}
                {t.fields.map((f, fi) => {
                  const fy = HEADER_H + fi * ROW_H;
                  const isEven = fi % 2 === 0;
                  return (
                    <g key={f.name}>
                      {!isEven && (
                        <rect x={1} y={fy} width={TABLE_W - 2} height={ROW_H} fill="#f0f6ff" />
                      )}
                      {/* Icon */}
                      <g transform={`translate(8, ${fy + ROW_H / 2 + 4})`}>
                        <FieldIcon kind={f.kind} />
                      </g>
                      {/* Name */}
                      <text x={26} y={fy + ROW_H / 2 + 5}
                        fontSize={11} fill="#1e293b"
                        fontFamily="'Golos Text', sans-serif">
                        {f.name}
                      </text>
                      {/* Type */}
                      <text x={TABLE_W - 8} y={fy + ROW_H / 2 + 5}
                        fontSize={10} fill="#7090b0" textAnchor="end"
                        fontFamily="'Golos Text', sans-serif">
                        : {f.type}
                      </text>
                      {/* Row border */}
                      <line x1={1} y1={fy + ROW_H} x2={TABLE_W - 1} y2={fy + ROW_H}
                        stroke="#e8f0f8" strokeWidth={0.5} />
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