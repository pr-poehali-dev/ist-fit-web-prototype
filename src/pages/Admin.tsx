import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const TEAL = "#0ea5a0";

export type LeadStatus = "new" | "processing" | "done";

export type Lead = {
  id: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: LeadStatus;
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Новая",
  processing: "В работе",
  done: "Обработана",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "#ef4444",
  processing: "#f59e0b",
  done: "#22c55e",
};

const DEMO_LEADS: Lead[] = [
  {
    id: "demo-1",
    date: "2026-06-14T09:12:00",
    name: "Алексей Смирнов",
    phone: "+7 (900) 123-45-67",
    email: "smirnov@mail.ru",
    message: "Хочу записаться на персональную тренировку. Интересует снижение веса и набор мышечной массы.",
    status: "new",
  },
  {
    id: "demo-2",
    date: "2026-06-13T15:44:00",
    name: "Марина Козлова",
    phone: "+7 (910) 987-65-43",
    email: "marina.kozlova@gmail.com",
    message: "Хочу узнать подробности об абонементе «Прогресс». Можно ли попробовать пробное занятие?",
    status: "processing",
  },
  {
    id: "demo-3",
    date: "2026-06-12T11:05:00",
    name: "Дмитрий Волков",
    phone: "+7 (930) 555-22-11",
    email: "d.volkov@yandex.ru",
    message: "Оформить абонемент «Максимум» на 3 месяца. Нужна консультация по составу тела.",
    status: "done",
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function Admin() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");

  useEffect(() => {
    const stored = localStorage.getItem("ist_leads");
    const userLeads: Lead[] = stored ? JSON.parse(stored) : [];
    const ids = new Set(userLeads.map((l) => l.id));
    const merged = [...userLeads, ...DEMO_LEADS.filter((d) => !ids.has(d.id))];
    merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setLeads(merged);
  }, []);

  const updateStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === id ? { ...l, status } : l));
      const userLeads = updated.filter((l) => !l.id.startsWith("demo-"));
      localStorage.setItem("ist_leads", JSON.stringify(userLeads));
      return updated;
    });
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);
  };

  const filtered = filterStatus === "all" ? leads : leads.filter((l) => l.status === filterStatus);
  const counts = { all: leads.length, new: leads.filter((l) => l.status === "new").length, processing: leads.filter((l) => l.status === "processing").length, done: leads.filter((l) => l.status === "done").length };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderColor: "#e5e7eb" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <Icon name="ArrowLeft" size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">На сайт</span>
            </button>
            <div className="w-px h-5 bg-gray-200" />
            <span className="text-lg font-semibold tracking-widest" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
              IST<span className="text-foreground"> FIT</span>
            </span>
            <span className="text-sm text-muted-foreground">/ Личный кабинет</span>
          </div>
          {counts.new > 0 && (
            <div className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full" style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {counts.new} новых заявок
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {([["all", "Всего", "#6b7280"], ["new", "Новые", "#ef4444"], ["processing", "В работе", "#f59e0b"], ["done", "Обработаны", "#22c55e"]] as const).map(([key, label, color]) => (
            <button key={key} onClick={() => setFilterStatus(key)}
              className="text-left p-5 rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: "#fff", border: `1.5px solid ${filterStatus === key ? color : "#e5e7eb"}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div className="text-3xl font-semibold mb-1" style={{ color, fontFamily: "'Oswald', sans-serif" }}>{counts[key]}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Table */}
          <div className="flex-1 rounded-xl overflow-hidden" style={{ border: "1px solid #e5e7eb", background: "#fff" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
                  {["Дата", "Имя", "Телефон", "Email", "Статус", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center text-muted-foreground py-12 text-sm">Заявок нет</td></tr>
                )}
                {filtered.map((lead) => (
                  <tr key={lead.id}
                    className="transition-colors cursor-pointer"
                    style={{ borderBottom: "1px solid #f3f4f6", background: selected?.id === lead.id ? `rgba(14,165,160,0.04)` : "transparent" }}
                    onMouseEnter={(e) => { if (selected?.id !== lead.id) (e.currentTarget as HTMLElement).style.background = "#f9fafb"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = selected?.id === lead.id ? `rgba(14,165,160,0.04)` : "transparent"; }}
                    onClick={() => setSelected(lead.id === selected?.id ? null : lead)}>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{formatDate(lead.date)}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{lead.name}</td>
                    <td className="px-4 py-3 text-foreground">{lead.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: `${STATUS_COLORS[lead.status]}18`, color: STATUS_COLORS[lead.status] }}>
                        {STATUS_LABELS[lead.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Icon name="ChevronRight" size={14} style={{ color: "#9ca3af" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-80 flex-shrink-0 rounded-xl p-6" style={{ border: "1px solid #e5e7eb", background: "#fff", alignSelf: "flex-start" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Oswald', sans-serif" }}>Заявка</h3>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="X" size={16} />
                </button>
              </div>
              <div className="space-y-4 mb-6">
                {[
                  { icon: "Calendar", label: "Дата", value: formatDate(selected.date) },
                  { icon: "User", label: "Имя", value: selected.name },
                  { icon: "Phone", label: "Телефон", value: selected.phone },
                  { icon: "Mail", label: "Email", value: selected.email },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                      <Icon name={row.icon} fallback="Star" size={11} />
                      {row.label}
                    </div>
                    <div className="text-sm text-foreground">{row.value}</div>
                  </div>
                ))}
                <div>
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                    <Icon name="MessageSquare" size={11} />
                    Сообщение
                  </div>
                  <div className="text-sm text-foreground leading-relaxed p-3 rounded-lg" style={{ background: "#f9fafb" }}>
                    {selected.message}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Статус обработки</div>
                <div className="flex flex-col gap-2">
                  {(["new", "processing", "done"] as LeadStatus[]).map((s) => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: selected.status === s ? `${STATUS_COLORS[s]}12` : "transparent",
                        border: `1.5px solid ${selected.status === s ? STATUS_COLORS[s] : "#e5e7eb"}`,
                        color: selected.status === s ? STATUS_COLORS[s] : "#6b7280",
                      }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: STATUS_COLORS[s] }} />
                      {STATUS_LABELS[s]}
                      {selected.status === s && <Icon name="Check" size={13} className="ml-auto" style={{ color: STATUS_COLORS[s] }} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
