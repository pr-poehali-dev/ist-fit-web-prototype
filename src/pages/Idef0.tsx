import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const FONT = "'Golos Text', sans-serif";
const BLOCK_FILL = "#ffffff";
const BLOCK_STROKE = "#1a1a1a";
const ARROW_COLOR = "#1a1a1a";

/* ── helpers ── */
function Block({ x, y, w, h, label, code }: { x: number; y: number; w: number; h: number; label: string; code: string }) {
  const lines = label.split("\n");
  const lineH = 16;
  const totalH = lines.length * lineH;
  const startY = y + (h - totalH) / 2 - 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={BLOCK_FILL} stroke={BLOCK_STROKE} strokeWidth={1.5} />
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={startY + i * lineH + lineH} textAnchor="middle" fontSize={12} fontFamily={FONT} fill="#111">{l}</text>
      ))}
      <text x={x + w - 4} y={y + h - 4} textAnchor="end" fontSize={11} fontFamily={FONT} fill="#444">{code}</text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, label, labelX, labelY, labelAnchor = "middle" }: {
  x1: number; y1: number; x2: number; y2: number;
  label?: string; labelX?: number; labelY?: number; labelAnchor?: string;
}) {
  return (
    <g>
      <defs>
        <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={ARROW_COLOR} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      {label && <text x={labelX ?? (x1 + x2) / 2} y={labelY ?? (y1 + y2) / 2 - 6} textAnchor={labelAnchor as never} fontSize={11} fontFamily={FONT} fill="#222">{label}</text>}
    </g>
  );
}

function ArrowPath({ d, label, labelX, labelY }: { d: string; label?: string; labelX?: number; labelY?: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      {label && <text x={labelX} y={labelY} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">{label}</text>}
    </g>
  );
}

function Label({ x, y, text, anchor = "middle", multiline }: { x: number; y: number; text: string; anchor?: string; multiline?: string[] }) {
  if (multiline) {
    return (
      <g>
        {multiline.map((l, i) => (
          <text key={i} x={x} y={y + i * 14} textAnchor={anchor as never} fontSize={11} fontFamily={FONT} fill="#222">{l}</text>
        ))}
      </g>
    );
  }
  return <text x={x} y={y} textAnchor={anchor as never} fontSize={11} fontFamily={FONT} fill="#222">{text}</text>;
}

/* ════════════════════════════════
   Диаграмма A0 — первый уровень
   ════════════════════════════════ */
function DiagramA0() {
  return (
    <svg width={620} height={340} style={{ display: "block" }}>
      {/* Блок */}
      <Block x={170} y={110} w={240} h={110} label={"Сайт\nфитнес-центра"} code="A0" />

      {/* Вход: Данные → */}
      <Arrow x1={20} y1={165} x2={170} y2={165} label="Данные" labelX={30} labelY={158} labelAnchor="start" />

      {/* Сверху: Пользователь */}
      <Arrow x1={230} y1={30} x2={230} y2={110} />
      <Label x={230} y={24} text="Пользователь" />

      {/* Сверху: HTTP / REST */}
      <Arrow x1={330} y1={30} x2={330} y2={110} />
      <Label x={330} y={18} text="HTTP / REST" multiline={["HTTP / REST", "протоколы"]} />

      {/* Выходы */}
      <Arrow x1={410} y1={145} x2={590} y2={145} label="Интерфейс сайта" labelX={415} labelY={138} labelAnchor="start" />
      <Arrow x1={410} y1={195} x2={590} y2={195} label="Отчётность" labelX={415} labelY={188} labelAnchor="start" />

      {/* Снизу: механизмы */}
      <Arrow x1={210} y1={300} x2={210} y2={220} />
      <Label x={210} y={316} text="SQL" anchor="middle" />

      <Arrow x1={290} y1={300} x2={290} y2={220} />
      <Label x={290} y={316} text="Python" anchor="middle" />

      <Arrow x1={370} y1={300} x2={370} y2={220} />
      <Label x={370} y={310} text="React," anchor="middle" multiline={["React,", "Tailwind CSS"]} />
    </svg>
  );
}

/* ════════════════════════════════
   Диаграмма A1–A3 — второй уровень
   ════════════════════════════════ */
function DiagramA1A3() {
  return (
    <svg width={980} height={460} style={{ display: "block" }}>
      {/* ── Общая шина сверху: HTTP/REST ── */}
      <line x1={160} y1={40} x2={800} y2={40} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={460} y={32} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">HTTP / REST протоколы</text>
      {/* ответвления вниз */}
      <line x1={160} y1={40} x2={160} y2={140} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <line x1={420} y1={40} x2={420} y2={175} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <line x1={800} y1={40} x2={800} y2={175} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />

      {/* ── Пользователь → A1 ── */}
      <text x={100} y={58} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Пользователь</text>
      <line x1={100} y1={62} x2={100} y2={140} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />

      {/* ── A1 ── */}
      <Block x={30} y={140} w={180} h={90} label={"Авторизация\nпользователя"} code="A1" />
      {/* Вход: Данные */}
      <line x1={0} y1={185} x2={30} y2={185} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={2} y={178} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Данные</text>
      {/* Механизмы A1 */}
      <line x1={80} y1={390} x2={80} y2={230} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={80} y={406} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">React /</text>
      <text x={80} y={420} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Tailwind</text>
      <line x1={150} y1={390} x2={150} y2={230} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={150} y={406} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Python</text>

      {/* A1 → A2: Данные пользователя */}
      <line x1={210} y1={185} x2={310} y2={210} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={215} y={185} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Данные</text>
      <text x={215} y={198} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">пользователя</text>

      {/* ── A2 ── */}
      <Block x={310} y={175} w={190} h={90} label={"Определение типа\nпользователя"} code="A2" />
      {/* Механизмы A2 */}
      <line x1={355} y1={390} x2={355} y2={265} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={355} y={406} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">SQL</text>
      <line x1={405} y1={390} x2={405} y2={265} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={405} y={406} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Python</text>
      <line x1={460} y1={390} x2={460} y2={265} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={460} y={406} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">React /</text>
      <text x={460} y={420} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Tailwind</text>

      {/* A2 → A3: Интерфейс конкретного пользователя */}
      <line x1={500} y1={220} x2={590} y2={220} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={504} y={212} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Интерфейс</text>
      <text x={504} y={224} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">конкретного</text>
      <text x={504} y={236} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">пользователя</text>

      {/* ── Пользователь → A3 ── */}
      <text x={800} y={160} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Пользователь</text>

      {/* ── A3 ── */}
      <Block x={590} y={175} w={200} h={110} label={"Взаимодействие\nпользователя\nс сайтом"} code="A3" />
      {/* Выходы */}
      <line x1={790} y1={210} x2={960} y2={210} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={795} y={203} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Интерфейс сайта</text>
      <line x1={790} y1={255} x2={960} y2={255} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={795} y={248} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Отчётность</text>
      {/* Механизмы A3 */}
      <line x1={640} y1={390} x2={640} y2={285} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={640} y={406} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">SQL</text>
      <line x1={690} y1={390} x2={690} y2={285} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={690} y={406} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Python</text>
      <line x1={750} y1={390} x2={750} y2={285} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={750} y={406} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">React /</text>
      <text x={750} y={420} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Tailwind</text>
    </svg>
  );
}

/* ════════════════════════════════
   Диаграмма A11–A13 (детализация A1)
   ════════════════════════════════ */
function DiagramA11A13() {
  return (
    <svg width={920} height={370} style={{ display: "block" }}>
      {/* ── A11 ── */}
      <Block x={30} y={110} w={175} h={90} label={"Ввод логина\nи пароля"} code="A11" />
      {/* Вход: Данные */}
      <line x1={0} y1={155} x2={30} y2={155} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={2} y={148} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Данные</text>
      {/* Пользователь сверху */}
      <text x={117} y={70} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Пользователь</text>
      <line x1={117} y1={74} x2={117} y2={110} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      {/* Механизм A11 */}
      <line x1={100} y1={320} x2={100} y2={200} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={100} y={336} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">React /</text>
      <text x={100} y={350} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Tailwind</text>

      {/* A11 → A12 */}
      <line x1={205} y1={155} x2={310} y2={155} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={212} y={148} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Данные</text>
      <text x={212} y={161} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">пользователя</text>

      {/* ── A12 ── */}
      <Block x={310} y={110} w={185} h={90} label={"Проверка\nкорректности\nданных"} code="A12" />
      {/* Механизм A12 */}
      <line x1={402} y1={320} x2={402} y2={200} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={402} y={336} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Python</text>

      {/* A12 → A13 */}
      <line x1={495} y1={155} x2={590} y2={155} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={500} y={148} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Данные</text>
      <text x={500} y={161} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">пользователя</text>

      {/* ── A13 ── */}
      <Block x={590} y={110} w={200} h={90} label={"Отправка данных\nпользователя\nна сервер"} code="A13" />
      {/* HTTP/REST сверху */}
      <text x={690} y={68} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">HTTP / REST</text>
      <text x={690} y={82} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">протоколы</text>
      <line x1={690} y1={86} x2={690} y2={110} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      {/* Механизм A13 */}
      <line x1={670} y1={320} x2={670} y2={200} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={670} y={336} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Python</text>
      {/* Выход */}
      <line x1={790} y1={155} x2={920} y2={155} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={795} y={148} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Данные</text>
      <text x={795} y={161} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">пользователя</text>
    </svg>
  );
}

/* ════════════════════════════════
   Диаграмма A21–A23 (детализация A2)
   ════════════════════════════════ */
function DiagramA21A23() {
  return (
    <svg width={980} height={390} style={{ display: "block" }}>
      {/* ── A21 ── */}
      <Block x={30} y={120} w={185} h={90} label={"Поиск пользователя\nв БД по логину\nи паролю"} code="A21" />
      {/* Вход */}
      <line x1={0} y1={165} x2={30} y2={165} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={2} y={158} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Данные</text>
      <text x={2} y={171} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">пользователя</text>
      {/* Механизм A21 */}
      <line x1={122} y1={340} x2={122} y2={210} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={122} y={356} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">SQL /</text>
      <text x={122} y={370} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">psycopg2</text>

      {/* A21 → A22 */}
      <line x1={215} y1={165} x2={320} y2={165} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={220} y={158} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Данные о</text>
      <text x={220} y={171} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">пользователе</text>

      {/* ── A22 ── */}
      <Block x={320} y={120} w={185} h={90} label={"Определение типа\nнайденного\nпользователя"} code="A22" />
      {/* HTTP/REST → A22 */}
      <text x={412} y={72} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">HTTP / REST</text>
      <text x={412} y={86} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">протоколы</text>
      <line x1={412} y1={90} x2={412} y2={120} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      {/* Механизм A22 */}
      <line x1={412} y1={340} x2={412} y2={210} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={412} y={356} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">SQL /</text>
      <text x={412} y={370} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">psycopg2</text>

      {/* A22 → A23 */}
      <line x1={505} y1={165} x2={600} y2={165} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={510} y={158} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Тип</text>
      <text x={510} y={171} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">пользователя</text>

      {/* ── A23 ── */}
      <Block x={600} y={120} w={200} h={90} label={"Формирование\nинтерфейса для\nтипа пользователя"} code="A23" />
      {/* HTTP/REST → A23 */}
      <text x={740} y={72} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">HTTP / REST</text>
      <text x={740} y={86} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">протоколы</text>
      <line x1={740} y1={90} x2={740} y2={120} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      {/* Механизмы A23 */}
      <line x1={630} y1={340} x2={630} y2={210} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={630} y={356} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">SQL</text>
      <line x1={700} y1={340} x2={700} y2={210} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={700} y={356} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Python</text>
      <line x1={768} y1={340} x2={768} y2={210} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={768} y={356} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">React /</text>
      <text x={768} y={370} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Tailwind</text>
      {/* Выход */}
      <line x1={800} y1={165} x2={980} y2={165} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={806} y={155} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Интерфейс</text>
      <text x={806} y={168} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">конкретного</text>
      <text x={806} y={181} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">пользователя</text>
    </svg>
  );
}

/* ════════════════════════════════
   Диаграмма A31–A34 (детализация A3)
   ════════════════════════════════ */
function DiagramA31A34() {
  return (
    <svg width={1120} height={420} style={{ display: "block" }}>
      {/* ── A31 ── */}
      <Block x={20} y={130} w={185} h={100} label={"Инициализация\nизменений\nданных"} code="A31" />
      {/* Вход: Интерфейс конкретного пользователя */}
      <line x1={0} y1={180} x2={20} y2={180} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={0} y={158} textAnchor="start" fontSize={10} fontFamily={FONT} fill="#222">Интерфейс</text>
      <text x={0} y={170} textAnchor="start" fontSize={10} fontFamily={FONT} fill="#222">конкретного</text>
      <text x={0} y={182} textAnchor="start" fontSize={10} fontFamily={FONT} fill="#222">пользователя</text>
      {/* Пользователь сверху */}
      <text x={112} y={88} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Пользователь</text>
      <line x1={112} y1={92} x2={112} y2={130} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      {/* Механизм A31 */}
      <line x1={90} y1={360} x2={90} y2={230} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={90} y={376} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">React /</text>
      <text x={90} y={390} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Tailwind</text>

      {/* A31 → A32 */}
      <line x1={205} y1={180} x2={295} y2={180} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={210} y={172} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Данные</text>
      <text x={210} y={185} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">пользователя</text>

      {/* ── A32 ── */}
      <Block x={295} y={130} w={180} h={100} label={"Проверка\nкорректности\nданных"} code="A32" />
      {/* Механизмы A32 */}
      <line x1={340} y1={360} x2={340} y2={230} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={340} y={376} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Python</text>
      <line x1={410} y1={360} x2={410} y2={230} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={410} y={376} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">SQL</text>

      {/* A32 → A33 */}
      <line x1={475} y1={180} x2={565} y2={180} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={480} y={172} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Корректные</text>
      <text x={480} y={185} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">данные</text>

      {/* ── A33 ── */}
      <Block x={565} y={130} w={185} h={100} label={"Внесение\nизменений в БД"} code="A33" />
      {/* HTTP/REST → A33 */}
      <text x={657} y={82} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">HTTP / REST</text>
      <text x={657} y={96} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">протоколы</text>
      <line x1={657} y1={100} x2={657} y2={130} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      {/* Механизмы A33 */}
      <line x1={600} y1={360} x2={600} y2={230} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={600} y={376} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Python</text>
      <line x1={670} y1={360} x2={670} y2={230} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={670} y={376} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">SQL</text>

      {/* A33 → A34 */}
      <line x1={750} y1={180} x2={835} y2={180} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={755} y={172} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Обновлённая</text>
      <text x={755} y={185} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">БД</text>

      {/* ── A34 ── */}
      <Block x={835} y={130} w={195} h={100} label={"Обновление\nинтерфейса\nи отчётности"} code="A34" />
      {/* HTTP/REST → A34 */}
      <text x={932} y={82} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">HTTP / REST</text>
      <text x={932} y={96} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">протоколы</text>
      <line x1={932} y1={100} x2={932} y2={130} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      {/* Механизмы A34 */}
      <line x1={875} y1={360} x2={875} y2={230} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={875} y={376} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Python</text>
      <line x1={960} y1={360} x2={960} y2={230} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={960} y={376} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">React</text>
      {/* Выходы */}
      <line x1={1030} y1={158} x2={1120} y2={158} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={1034} y={150} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Отчётность</text>
      <line x1={1030} y1={202} x2={1120} y2={202} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#ah)" />
      <text x={1034} y={194} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">Интерфейс</text>
      <text x={1034} y={207} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222">сайта</text>
    </svg>
  );
}

/* ════════════════════════════════
   DFD — Рис. 15
   ════════════════════════════════ */
function DiagramDFD() {
  // Элементы:
  // Внешние сущности (прямоугольники): Клиент, Администратор сайта
  // Процессы (скруглённые прямоугольники): "Вызов наполнения раздела сайта", "Изменение наполнения раздела сайта"
  // Хранилище (две горизонтальные линии): "База данных сайта (PostgreSQL)"

  const EXT_W = 150, EXT_H = 70;
  const PROC_W = 200, PROC_H = 70;
  const STORE_W = 300, STORE_H = 44;

  // координаты
  const clientX = 40, clientY = 60;
  const procTopX = 360, procTopY = 40;
  const storeX = 310, storeY = 230;
  const adminX = 40, adminY = 420;
  const procBotX = 360, procBotY = 400;

  return (
    <svg width={660} height={540} style={{ display: "block" }}>
      <defs>
        <marker id="dfd-arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={ARROW_COLOR} />
        </marker>
      </defs>

      {/* ── Внешняя сущность: Клиент ── */}
      <rect x={clientX} y={clientY} width={EXT_W} height={EXT_H} fill={BLOCK_FILL} stroke={BLOCK_STROKE} strokeWidth={1.5} />
      <text x={clientX + EXT_W / 2} y={clientY + EXT_H / 2 + 5} textAnchor="middle" fontSize={13} fontFamily={FONT} fill="#111">Клиент</text>

      {/* ── Процесс верхний: Вызов наполнения ── */}
      <rect x={procTopX} y={procTopY} width={PROC_W} height={PROC_H} rx={14} fill={BLOCK_FILL} stroke={BLOCK_STROKE} strokeWidth={1.5} />
      <text x={procTopX + PROC_W / 2} y={procTopY + 24} textAnchor="middle" fontSize={12} fontFamily={FONT} fill="#111">Вызов наполнения</text>
      <text x={procTopX + PROC_W / 2} y={procTopY + 40} textAnchor="middle" fontSize={12} fontFamily={FONT} fill="#111">раздела сайта</text>
      <text x={procTopX + PROC_W / 2} y={procTopY + 56} textAnchor="middle" fontSize={10} fontFamily={FONT} fill="#555">(React → Python-функция)</text>

      {/* ── Хранилище: БД ── */}
      <line x1={storeX} y1={storeY} x2={storeX + STORE_W} y2={storeY} stroke={BLOCK_STROKE} strokeWidth={1.5} />
      <line x1={storeX} y1={storeY + STORE_H} x2={storeX + STORE_W} y2={storeY + STORE_H} stroke={BLOCK_STROKE} strokeWidth={1.5} />
      <text x={storeX + STORE_W / 2} y={storeY + 18} textAnchor="middle" fontSize={12} fontFamily={FONT} fill="#111">База данных сайта</text>
      <text x={storeX + STORE_W / 2} y={storeY + 34} textAnchor="middle" fontSize={10} fontFamily={FONT} fill="#555">(PostgreSQL)</text>

      {/* ── Процесс нижний: Изменение наполнения ── */}
      <rect x={procBotX} y={procBotY} width={PROC_W} height={PROC_H} rx={14} fill={BLOCK_FILL} stroke={BLOCK_STROKE} strokeWidth={1.5} />
      <text x={procBotX + PROC_W / 2} y={procBotY + 24} textAnchor="middle" fontSize={12} fontFamily={FONT} fill="#111">Изменение наполнения</text>
      <text x={procBotX + PROC_W / 2} y={procBotY + 40} textAnchor="middle" fontSize={12} fontFamily={FONT} fill="#111">раздела сайта</text>
      <text x={procBotX + PROC_W / 2} y={procBotY + 56} textAnchor="middle" fontSize={10} fontFamily={FONT} fill="#555">(Python-функция → PostgreSQL)</text>

      {/* ── Внешняя сущность: Администратор ── */}
      <rect x={adminX} y={adminY} width={EXT_W} height={EXT_H} fill={BLOCK_FILL} stroke={BLOCK_STROKE} strokeWidth={1.5} />
      <text x={adminX + EXT_W / 2} y={adminY + 28} textAnchor="middle" fontSize={13} fontFamily={FONT} fill="#111">Администратор</text>
      <text x={adminX + EXT_W / 2} y={adminY + 46} textAnchor="middle" fontSize={13} fontFamily={FONT} fill="#111">сайта</text>

      {/* ═══ СТРЕЛКИ ═══ */}

      {/* Клиент → Вызов наполнения */}
      <line x1={clientX + EXT_W} y1={clientY + EXT_H / 2} x2={procTopX} y2={procTopY + PROC_H / 2} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#dfd-arr)" />
      <text x={220} y={68} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Интересующий</text>
      <text x={220} y={82} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">раздел сайта</text>

      {/* Вызов наполнения ↓ → БД (запрос данных) */}
      <line x1={procTopX + 60} y1={procTopY + PROC_H} x2={storeX + 60} y2={storeY} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#dfd-arr)" />
      {/* подпись слева от стрелки */}
      <text x={398} y={155} textAnchor="end" fontSize={11} fontFamily={FONT} fill="#222" transform="rotate(-90,398,155)">Данные о необходимой</text>
      <text x={398} y={170} textAnchor="end" fontSize={11} fontFamily={FONT} fill="#222" transform="rotate(-90,398,170)">информации</text>

      {/* БД ↑ → Вызов наполнения (ответ) */}
      <line x1={storeX + 110} y1={storeY} x2={procTopX + 110} y2={procTopY + PROC_H} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#dfd-arr)" />
      <text x={480} y={145} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222" transform="rotate(90,480,145)">Данные для</text>
      <text x={480} y={160} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222" transform="rotate(90,480,160)">наполнения раздела</text>

      {/* Администратор → Изменение наполнения */}
      <line x1={adminX + EXT_W} y1={adminY + EXT_H / 2} x2={procBotX} y2={procBotY + PROC_H / 2} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#dfd-arr)" />
      <text x={255} y={428} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">Новые или изменённые</text>
      <text x={255} y={442} textAnchor="middle" fontSize={11} fontFamily={FONT} fill="#222">данные</text>

      {/* Изменение наполнения ↑ → БД (запись) */}
      <line x1={storeX + 180} y1={storeY + STORE_H} x2={procBotX + 120} y2={procBotY} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#dfd-arr)" />
      <text x={462} y={340} textAnchor="end" fontSize={11} fontFamily={FONT} fill="#222" transform="rotate(-90,462,340)">Новые или изменённые</text>
      <text x={462} y={356} textAnchor="end" fontSize={11} fontFamily={FONT} fill="#222" transform="rotate(-90,462,356)">данные</text>

      {/* БД ↓ → Изменение наполнения (подтверждение) */}
      <line x1={storeX + 230} y1={storeY + STORE_H} x2={procBotX + 170} y2={procBotY} stroke={ARROW_COLOR} strokeWidth={1.5} markerEnd="url(#dfd-arr)" />
      <text x={538} y={330} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222" transform="rotate(90,538,330)">Сообщение об</text>
      <text x={538} y={346} textAnchor="start" fontSize={11} fontFamily={FONT} fill="#222" transform="rotate(90,538,346)">успешном изменении</text>
    </svg>
  );
}

/* ════════════════════════════════
   Главная страница
   ════════════════════════════════ */
const DIAGRAMS = [
  {
    num: "Рис. 10",
    title: "Диаграмма первого уровня (A0)",
    desc: "На сайт поступают данные от пользователя. Обработчики: React + Tailwind CSS на стороне клиента, Python — на стороне сервера, SQL — при работе с PostgreSQL. Результат — интерфейс сайта и отчётность.",
    component: <DiagramA0 />,
    w: 620,
  },
  {
    num: "Рис. 11",
    title: "Диаграмма второго уровня (A1–A3)",
    desc: "A1 — авторизация, A2 — определение типа пользователя, A3 — взаимодействие с сайтом.",
    component: <DiagramA1A3 />,
    w: 900,
  },
  {
    num: "Рис. 12",
    title: "Диаграмма третьего уровня. Детализация блока A1",
    desc: "A11 — ввод логина и пароля в форму React, A12 — проверка корректности Python-функцией, A13 — отправка HTTP-запроса на сервер.",
    component: <DiagramA11A13 />,
    w: 860,
  },
  {
    num: "Рис. 13",
    title: "Диаграмма третьего уровня. Детализация блока A2",
    desc: "A21 — поиск пользователя в PostgreSQL через psycopg2, A22 — определение роли, A23 — формирование интерфейса React.",
    component: <DiagramA21A23 />,
    w: 900,
  },
  {
    num: "Рис. 14",
    title: "Диаграмма третьего уровня. Детализация блока A3",
    desc: "A31 — инициализация изменений, A32 — валидация Python, A33 — обновление PostgreSQL, A34 — обновление интерфейса React.",
    component: <DiagramA31A34 />,
    w: 1060,
    section: "",
  },
];

export default function Idef0() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: FONT }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur border-gray-200">
        <div className="px-6 h-14 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <Icon name="ArrowLeft" size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">На сайт</span>
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <span className="text-base font-semibold tracking-widest" style={{ color: "#0ea5a0", fontFamily: "'Oswald', sans-serif" }}>
            IST<span className="text-foreground"> FIT</span>
          </span>
          <span className="text-sm text-muted-foreground">/ Диаграммы IDEF0</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-14">
        <div>
          <h1 className="text-2xl font-bold mb-1">2.2. Диаграмма IDEF0</h1>
          <p className="text-sm text-muted-foreground">Функциональная модель SADT. Технологии: React + Tailwind CSS, Python 3.11, PostgreSQL, HTTP/REST.</p>
        </div>

        {DIAGRAMS.map((d) => (
          <div key={d.num} className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{d.num}</p>
              <h2 className="text-lg font-semibold">{d.title}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{d.desc}</p>
            </div>
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg p-6">
              {d.component}
            </div>
          </div>
        ))}

        {/* 2.3 DFD */}
        <div>
          <h1 className="text-2xl font-bold mb-1">2.3. Модель информационных потоков</h1>
          <p className="text-sm text-muted-foreground">Диаграмма потоков данных (DFD). Внешние сущности: Клиент и Администратор сайта. Хранилище: PostgreSQL. Процессы реализованы через Python-функции.</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Рис. 15</p>
            <h2 className="text-lg font-semibold">Модель информационных потоков разрабатываемой ИС</h2>
          </div>
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg p-6">
            <DiagramDFD />
          </div>
        </div>
      </div>
    </div>
  );
}