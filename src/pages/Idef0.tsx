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
    <svg width={900} height={420} style={{ display: "block" }}>
      {/* ── A1 ── */}
      <Block x={40} y={120} w={160} h={90} label={"Авторизация\nпользователя"} code="A1" />
      <Arrow x1={0} y1={165} x2={40} y2={165} label="Данные" labelX={2} labelY={158} labelAnchor="start" />
      <Arrow x1={120} y1={50} x2={120} y2={120} />
      <Label x={120} y={44} text="Пользователь" />
      <Arrow x1={190} y1={30} x2={190} y2={120} />
      <Label x={190} y={18} text="HTTP / REST" multiline={["HTTP / REST", "протоколы"]} />
      {/* механизмы A1 */}
      <Arrow x1={70} y1={320} x2={70} y2={210} />
      <Label x={70} y={336} text="React," multiline={["React,", "Tailwind"]} />
      <Arrow x1={140} y1={320} x2={140} y2={210} />
      <Label x={140} y={336} text="Python" />

      {/* A1 → A2 */}
      <Arrow x1={200} y1={165} x2={300} y2={200} label="Данные" labelX={215} labelY={168} labelAnchor="start" />
      <Label x={215} y={178} text="пользователя" anchor="start" />

      {/* ── A2 ── */}
      <Block x={300} y={160} w={170} h={90} label={"Определение типа\nпользователя"} code="A2" />
      {/* сетевые протоколы общая линия сверху */}
      <ArrowPath d="M 190 30 L 730 30 L 730 120" label="" />
      <Arrow x1={385} y1={30} x2={385} y2={160} />
      {/* механизмы A2 */}
      <Arrow x1={330} y1={340} x2={330} y2={250} />
      <Label x={330} y={356} text="SQL" />
      <Arrow x1={385} y1={340} x2={385} y2={250} />
      <Label x={385} y={356} text="Python" />
      <Arrow x1={445} y1={340} x2={445} y2={250} />
      <Label x={445} y={350} text="React," multiline={["React,", "Tailwind"]} />

      {/* A2 → A3 */}
      <Arrow x1={470} y1={205} x2={570} y2={205} />
      <Label x={475} y={198} text="Интерфейс" anchor="start" />
      <Label x={475} y={210} text="конкретного" anchor="start" />
      <Label x={475} y={222} text="пользователя" anchor="start" />

      {/* ── A3 ── */}
      <Block x={570} y={160} w={180} h={110} label={"Взаимодействие\nпользователя\nс сайтом"} code="A3" />
      {/* Пользователь → A3 (сверху, общая линия) */}
      <Arrow x1={730} y1={120} x2={730} y2={160} />
      <Label x={740} y={145} text="Пользователь" anchor="start" />
      {/* выходы */}
      <Arrow x1={750} y1={195} x2={890} y2={195} label="Интерфейс сайта" labelX={755} labelY={188} labelAnchor="start" />
      <Arrow x1={750} y1={240} x2={890} y2={240} label="Отчётность" labelX={755} labelY={233} labelAnchor="start" />
      {/* механизмы A3 */}
      <Arrow x1={600} y1={340} x2={600} y2={270} />
      <Label x={600} y={356} text="SQL" />
      <Arrow x1={660} y1={340} x2={660} y2={270} />
      <Label x={660} y={356} text="Python" />
      <Arrow x1={720} y1={340} x2={720} y2={270} />
      <Label x={720} y={350} text="React," multiline={["React,", "Tailwind"]} />
    </svg>
  );
}

/* ════════════════════════════════
   Диаграмма A11–A13 (детализация A1)
   ════════════════════════════════ */
function DiagramA11A13() {
  return (
    <svg width={860} height={320} style={{ display: "block" }}>
      {/* A11 */}
      <Block x={40} y={100} w={160} h={90} label={"Ввод логина\nи пароля"} code="A11" />
      <Arrow x1={0} y1={145} x2={40} y2={145} label="Данные" labelX={2} labelY={138} labelAnchor="start" />
      <Arrow x1={120} y1={30} x2={120} y2={100} />
      <Label x={120} y={24} text="Пользователь" />
      {/* механизм A11 */}
      <Arrow x1={100} y1={280} x2={100} y2={190} />
      <Label x={100} y={296} text="React," multiline={["React,", "Tailwind"]} />

      {/* A11 → A12 */}
      <Arrow x1={200} y1={145} x2={300} y2={145} />
      <Label x={210} y={138} text="Данные" anchor="start" />
      <Label x={210} y={150} text="пользователя" anchor="start" />

      {/* A12 */}
      <Block x={300} y={100} w={180} h={90} label={"Проверка\nкорректности\nданных"} code="A12" />
      {/* механизм A12 */}
      <Arrow x1={390} y1={280} x2={390} y2={190} />
      <Label x={390} y={296} text="Python" />

      {/* A12 → A13 */}
      <Arrow x1={480} y1={145} x2={570} y2={145} />
      <Label x={490} y={138} text="Данные" anchor="start" />
      <Label x={490} y={150} text="пользователя" anchor="start" />

      {/* A13 */}
      <Block x={570} y={100} w={200} h={90} label={"Отправка данных\nпользователя\nна сервер"} code="A13" />
      {/* Сетевые протоколы */}
      <Arrow x1={670} y1={30} x2={670} y2={100} />
      <Label x={670} y={18} text="HTTP / REST" multiline={["HTTP / REST", "протоколы"]} />
      {/* механизм A13 */}
      <Arrow x1={650} y1={280} x2={650} y2={190} />
      <Label x={650} y={296} text="Python" />
      {/* выход */}
      <Arrow x1={770} y1={145} x2={860} y2={145} />
      <Label x={775} y={138} text="Данные" anchor="start" />
      <Label x={775} y={150} text="пользователя" anchor="start" />
    </svg>
  );
}

/* ════════════════════════════════
   Диаграмма A21–A23 (детализация A2)
   ════════════════════════════════ */
function DiagramA21A23() {
  return (
    <svg width={900} height={320} style={{ display: "block" }}>
      {/* A21 */}
      <Block x={40} y={100} w={185} h={90} label={"Поиск пользователя\nв БД по логину\nи паролю"} code="A21" />
      <Arrow x1={0} y1={145} x2={40} y2={145} />
      <Label x={2} y={138} text="Данные" anchor="start" />
      <Label x={2} y={150} text="пользователя" anchor="start" />
      {/* механизм A21 */}
      <Arrow x1={120} y1={280} x2={120} y2={190} />
      <Label x={120} y={296} text="SQL /" multiline={["SQL /", "psycopg2"]} />

      {/* A21 → A22 */}
      <Arrow x1={225} y1={145} x2={320} y2={145} />
      <Label x={230} y={138} text="Данные о" anchor="start" />
      <Label x={230} y={150} text="пользователе" anchor="start" />

      {/* A22 */}
      <Block x={320} y={100} w={185} h={90} label={"Определение типа\nнайденного\nпользователя"} code="A22" />
      {/* Сетевые протоколы → A22 */}
      <Arrow x1={412} y1={30} x2={412} y2={100} />
      <Label x={412} y={18} text="HTTP / REST" multiline={["HTTP / REST", "протоколы"]} />
      {/* механизм A22 */}
      <Arrow x1={412} y1={280} x2={412} y2={190} />
      <Label x={412} y={296} text="SQL /" multiline={["SQL /", "psycopg2"]} />

      {/* A22 → A23 */}
      <Arrow x1={505} y1={145} x2={590} y2={145} />
      <Label x={510} y={138} text="Тип" anchor="start" />
      <Label x={510} y={150} text="пользователя" anchor="start" />

      {/* A23 */}
      <Block x={590} y={100} w={200} h={90} label={"Формирование\nинтерфейса для\nтипа пользователя"} code="A23" />
      {/* Сетевые протоколы → A23 */}
      <Arrow x1={720} y1={30} x2={720} y2={100} />
      <Label x={720} y={18} text="HTTP / REST" multiline={["HTTP / REST", "протоколы"]} />
      {/* механизмы A23 */}
      <Arrow x1={620} y1={280} x2={620} y2={190} />
      <Label x={620} y={296} text="SQL" />
      <Arrow x1={690} y1={280} x2={690} y2={190} />
      <Label x={690} y={296} text="Python" />
      <Arrow x1={760} y1={280} x2={760} y2={190} />
      <Label x={760} y={290} text="React," multiline={["React,", "Tailwind"]} />
      {/* выход */}
      <Arrow x1={790} y1={145} x2={900} y2={145} />
      <Label x={795} y={134} text="Интерфейс" anchor="start" />
      <Label x={795} y={146} text="конкретного" anchor="start" />
      <Label x={795} y={158} text="пользователя" anchor="start" />
    </svg>
  );
}

/* ════════════════════════════════
   Диаграмма A31–A34 (детализация A3)
   ════════════════════════════════ */
function DiagramA31A34() {
  return (
    <svg width={1060} height={360} style={{ display: "block" }}>
      {/* A31 */}
      <Block x={20} y={110} w={175} h={100} label={"Инициализация\nизменений\nданных"} code="A31" />
      <Arrow x1={0} y1={160} x2={20} y2={160} />
      <Label x={0} y={140} text="Интерфейс" anchor="start" />
      <Label x={0} y={152} text="конкретного" anchor="start" />
      <Label x={0} y={164} text="пользователя" anchor="start" />
      <Arrow x1={108} y1={40} x2={108} y2={110} />
      <Label x={108} y={28} text="Пользователь" />
      {/* механизм A31 */}
      <Arrow x1={80} y1={310} x2={80} y2={210} />
      <Label x={80} y={322} text="React," multiline={["React,", "Tailwind"]} />

      {/* A31 → A32 */}
      <Arrow x1={195} y1={160} x2={280} y2={160} />
      <Label x={200} y={152} text="Данные" anchor="start" />
      <Label x={200} y={164} text="пользователя" anchor="start" />

      {/* A32 */}
      <Block x={280} y={110} w={170} h={100} label={"Проверка\nкорректности\nданных"} code="A32" />
      {/* механизмы A32 */}
      <Arrow x1={320} y1={310} x2={320} y2={210} />
      <Label x={320} y={322} text="Python" />
      <Arrow x1={390} y1={310} x2={390} y2={210} />
      <Label x={390} y={322} text="SQL" />

      {/* A32 → A33 */}
      <Arrow x1={450} y1={160} x2={540} y2={160} />
      <Label x={455} y={150} text="Корректные" anchor="start" />
      <Label x={455} y={162} text="данные" anchor="start" />
      {/* Сетевые протоколы → A33 */}
      <Arrow x1={610} y1={40} x2={610} y2={110} />
      <Label x={610} y={28} text="HTTP / REST" multiline={["HTTP / REST", "протоколы"]} />

      {/* A33 */}
      <Block x={540} y={110} w={175} h={100} label={"Внесение\nизменений в БД"} code="A33" />
      {/* механизмы A33 */}
      <Arrow x1={575} y1={310} x2={575} y2={210} />
      <Label x={575} y={322} text="Python" />
      <Arrow x1={645} y1={310} x2={645} y2={210} />
      <Label x={645} y={322} text="SQL" />

      {/* A33 → A34 */}
      <Arrow x1={715} y1={160} x2={800} y2={160} />
      <Label x={720} y={150} text="Обновлённая" anchor="start" />
      <Label x={720} y={162} text="БД" anchor="start" />
      {/* Сетевые протоколы → A34 */}
      <Arrow x1={880} y1={40} x2={880} y2={110} />
      <Label x={880} y={28} text="HTTP / REST" multiline={["HTTP / REST", "протоколы"]} />

      {/* A34 */}
      <Block x={800} y={110} w={185} h={100} label={"Обновление\nинтерфейса\nи отчётности"} code="A34" />
      {/* механизмы A34 */}
      <Arrow x1={840} y1={310} x2={840} y2={210} />
      <Label x={840} y={322} text="Python" />
      <Arrow x1={910} y1={310} x2={910} y2={210} />
      <Label x={910} y={322} text="React" />
      {/* выходы */}
      <Arrow x1={985} y1={145} x2={1060} y2={145} />
      <Label x={988} y={138} text="Отчётность" anchor="start" />
      <Arrow x1={985} y1={185} x2={1060} y2={185} />
      <Label x={988} y={178} text="Интерфейс" anchor="start" />
      <Label x={988} y={190} text="сайта" anchor="start" />
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