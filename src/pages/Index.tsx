import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/files/32451844-e9fb-4c86-ab75-580ff12cbef9.jpg";
const TRAINER1_IMG = "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/files/b265f983-b890-4a62-a6f5-8659494513c3.jpg";
const TRAINER2_IMG = "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/files/bc180fed-e45c-4061-be08-e3b2de5a27d7.jpg";
const GALLERY_IMG = "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/files/67b70010-bf81-4d87-9637-37c9579bc9fd.jpg";

const trainers = [
  {
    id: 1,
    name: "Александр Морозов",
    role: "Тренер по силовым тренировкам",
    experience: "8 лет опыта",
    specialization: ["Пауэрлифтинг", "Функциональный тренинг", "Реабилитация"],
    bio: "Мастер спорта по пауэрлифтингу. Специализируется на работе с новичками и спортсменами среднего уровня. Разрабатывает индивидуальные программы под цели каждого клиента.",
    img: TRAINER1_IMG,
    reviews: [
      { author: "Михаил К.", text: "За 4 месяца увеличил жим лёжа со 80 до 120 кг. Александр знает своё дело!", stars: 5 },
      { author: "Дарья П.", text: "Помог восстановиться после травмы спины. Очень внимательный и профессиональный.", stars: 5 },
      { author: "Игорь Н.", text: "Грамотно выстраивает нагрузку, следит за техникой. Рекомендую всем новичкам.", stars: 4 },
    ],
  },
  {
    id: 2,
    name: "Елена Сафонова",
    role: "Тренер по фитнесу и йоге",
    experience: "6 лет опыта",
    specialization: ["Йога", "Пилатес", "Групповые занятия"],
    bio: "Сертифицированный инструктор по хатха-йоге и пилатесу. Помогает улучшить гибкость, осанку и внутренний баланс. Ведёт утренние и вечерние групповые занятия.",
    img: TRAINER2_IMG,
    reviews: [
      { author: "Анна В.", text: "Занимаюсь у Елены уже год. Спина болеть перестала, настроение всегда отличное!", stars: 5 },
      { author: "Светлана М.", text: "Атмосфера на занятиях просто волшебная. Лена очень вдохновляет.", stars: 5 },
      { author: "Ольга Т.", text: "Отличный тренер, всегда объясняет технику и следит за правильностью выполнения.", stars: 5 },
    ],
  },
  {
    id: 3,
    name: "Денис Ковалёв",
    role: "Тренер по кардио и HIIT",
    experience: "5 лет опыта",
    specialization: ["HIIT", "Кардио", "Похудение"],
    bio: "Бывший профессиональный легкоатлет. Специализируется на высокоинтенсивных тренировках для сжигания жира и улучшения выносливости. Результаты клиентов говорят сами за себя.",
    img: HERO_IMG,
    reviews: [
      { author: "Роман С.", text: "Минус 12 кг за 3 месяца! Тренировки тяжёлые, но эффект реальный.", stars: 5 },
      { author: "Валерия Ю.", text: "Денис умеет мотивировать даже когда совсем нет сил. Топовый тренер.", stars: 5 },
      { author: "Кирилл Б.", text: "После его курса пробежал свой первый полумарафон. Спасибо!", stars: 5 },
    ],
  },
];

const plans = [
  {
    name: "Старт",
    price: "2 900",
    period: "месяц",
    desc: "Для тех, кто только начинает",
    features: ["8 посещений в месяц", "Доступ к тренажёрному залу", "Раздевалки и душевые", "Вводная консультация тренера"],
    accent: false,
  },
  {
    name: "Прогресс",
    price: "4 900",
    period: "месяц",
    desc: "Самый популярный выбор",
    features: ["Безлимитное посещение", "Все групповые занятия", "1 персональная тренировка", "Фитнес-тестирование", "Приоритетная запись"],
    accent: true,
  },
  {
    name: "Максимум",
    price: "8 900",
    period: "месяц",
    desc: "Для максимального результата",
    features: ["Всё из «Прогресс»", "4 персональные тренировки", "Индивидуальный план питания", "Анализ состава тела", "Персональный куратор"],
    accent: false,
  },
];

const galleryImages = [
  { src: HERO_IMG, label: "Тренажёрный зал" },
  { src: TRAINER1_IMG, label: "Персональные тренировки" },
  { src: GALLERY_IMG, label: "Групповые занятия" },
  { src: TRAINER2_IMG, label: "Йога и пилатес" },
  { src: GALLERY_IMG, label: "Кардио-зона" },
  { src: HERO_IMG, label: "Силовая зона" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < stars ? "#00E676" : "#333" }}>
          ★
        </span>
      ))}
    </div>
  );
}

type Trainer = (typeof trainers)[0];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const navLinks = [
    { id: "home", label: "Главная" },
    { id: "about", label: "О нас" },
    { id: "trainers", label: "Тренеры" },
    { id: "gallery", label: "Галерея" },
    { id: "plans", label: "Абонементы" },
    { id: "contacts", label: "Контакты" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  if (selectedTrainer) {
    return (
      <div
        className="min-h-screen bg-background text-foreground"
        style={{ fontFamily: "'Golos Text', sans-serif" }}
      >
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button
            onClick={() => setSelectedTrainer(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          >
            <Icon
              name="ArrowLeft"
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span style={{ fontFamily: "'Golos Text', sans-serif" }}>Назад к тренерам</span>
          </button>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ aspectRatio: "3/4", border: "1px solid #1f1f1f" }}
            >
              <img
                src={selectedTrainer.img}
                alt={selectedTrainer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p
                className="text-sm tracking-widest uppercase mb-3"
                style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
              >
                {selectedTrainer.experience}
              </p>
              <h1
                className="text-4xl font-semibold mb-2 text-white"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {selectedTrainer.name}
              </h1>
              <p className="text-muted-foreground mb-6">{selectedTrainer.role}</p>
              <p
                className="text-foreground/80 leading-relaxed mb-8"
                style={{ fontFamily: "'Golos Text', sans-serif" }}
              >
                {selectedTrainer.bio}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedTrainer.specialization.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full text-sm"
                    style={{
                      background: "rgba(0,230,118,0.1)",
                      color: "#00E676",
                      border: "1px solid rgba(0,230,118,0.2)",
                      fontFamily: "'Golos Text', sans-serif",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <button
                className="text-sm tracking-wider uppercase px-6 py-3 rounded-lg font-semibold w-fit transition-all hover:scale-105"
                style={{
                  background: "#00E676",
                  color: "#0a0a0a",
                  fontFamily: "'Oswald', sans-serif",
                }}
                onClick={() => {
                  setSelectedTrainer(null);
                  setTimeout(() => scrollTo("contacts"), 100);
                }}
              >
                Записаться на тренировку
              </button>
            </div>
          </div>
          <div>
            <h2
              className="text-2xl font-semibold text-white mb-8 tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Отзывы клиентов
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {selectedTrainer.reviews.map((r, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl"
                  style={{ background: "#141414", border: "1px solid #1f1f1f" }}
                >
                  <StarRating stars={r.stars} />
                  <p
                    className="text-foreground/80 text-sm leading-relaxed mt-3 mb-4"
                    style={{ fontFamily: "'Golos Text', sans-serif" }}
                  >
                    "{r.text}"
                  </p>
                  <p
                    className="text-muted-foreground text-sm font-medium"
                    style={{ fontFamily: "'Golos Text', sans-serif" }}
                  >
                    {r.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Golos Text', sans-serif" }}
    >
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          background: "rgba(18,18,18,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-xl font-semibold tracking-widest"
            style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
          >
            IST<span className="text-white"> FIT</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="nav-link text-sm transition-colors"
                style={{
                  color: activeSection === link.id ? "#00E676" : "#aaa",
                  fontFamily: "'Golos Text', sans-serif",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            className="hidden md:block text-xs tracking-widest uppercase px-5 py-2.5 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              background: "#00E676",
              color: "#0a0a0a",
              fontFamily: "'Oswald', sans-serif",
            }}
            onClick={() => scrollTo("contacts")}
          >
            Записаться
          </button>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 flex flex-col gap-4"
            style={{ borderTop: "1px solid #1a1a1a" }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-base py-1"
                style={{
                  color: activeSection === link.id ? "#00E676" : "#ccc",
                  fontFamily: "'Golos Text', sans-serif",
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              className="text-xs tracking-widest uppercase px-5 py-3 rounded-lg font-semibold mt-2"
              style={{
                background: "#00E676",
                color: "#0a0a0a",
                fontFamily: "'Oswald', sans-serif",
              }}
              onClick={() => scrollTo("contacts")}
            >
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="IST FIT" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(12,12,12,0.95) 40%, rgba(12,12,12,0.5) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-28">
          <div className="max-w-xl">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
            >
              Фитнес-центр в Москве
            </p>
            <h1
              className="font-bold leading-none mb-6 text-white"
              style={{
                fontSize: "clamp(3rem, 8vw, 6rem)",
                lineHeight: 1.0,
                fontFamily: "'Oswald', sans-serif",
              }}
            >
              СДЕЛАЙ <br />
              <span style={{ color: "#00E676" }}>ПЕРВЫЙ</span>
              <br /> ШАГ
            </h1>
            <p
              className="text-lg mb-10"
              style={{
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                fontFamily: "'Golos Text', sans-serif",
              }}
            >
              Профессиональные тренеры, современное оборудование и атмосфера, которая заряжает с
              первого дня.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => scrollTo("plans")}
                className="text-sm tracking-widest uppercase px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "#00E676",
                  color: "#0a0a0a",
                  fontFamily: "'Oswald', sans-serif",
                }}
              >
                Выбрать абонемент
              </button>
              <button
                onClick={() => scrollTo("trainers")}
                className="text-sm tracking-widest uppercase px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  background: "transparent",
                  fontFamily: "'Oswald', sans-serif",
                }}
              >
                Наши тренеры
              </button>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            background: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid #1f1f1f",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-3">
            {[
              { val: "500+", label: "Клиентов" },
              { val: "12", label: "Тренеров" },
              { val: "7 лет", label: "На рынке" },
            ].map((s, i) => (
              <div
                key={i}
                className="text-center"
                style={{
                  borderLeft: i > 0 ? "1px solid #1f1f1f" : "none",
                }}
              >
                <div
                  className="text-2xl font-semibold"
                  style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-xs text-muted-foreground mt-0.5"
                  style={{ fontFamily: "'Golos Text', sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <SectionReveal>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
            >
              О нас
            </p>
            <h2
              className="text-5xl font-semibold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              МЫ СТРОИМ <br />
              РЕЗУЛЬТАТ
            </h2>
            <div className="w-12 mb-8" style={{ height: "2px", background: "#00E676" }} />
            <p
              className="text-foreground/70 leading-relaxed mb-6"
              style={{ fontFamily: "'Golos Text', sans-serif" }}
            >
              IST FIT — это не просто фитнес-центр. Это место, где каждый клиент получает
              персональный подход, профессиональное сопровождение и реальный результат.
            </p>
            <p
              className="text-foreground/70 leading-relaxed mb-10"
              style={{ fontFamily: "'Golos Text', sans-serif" }}
            >
              Мы работаем с 2017 года и за это время помогли сотням людей изменить своё тело и образ
              жизни. Наши тренеры — практики, которые сами живут спортом.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "Dumbbell", text: "Современное оборудование" },
                { icon: "Users", text: "Групповые программы" },
                { icon: "Award", text: "Сертифицированные тренеры" },
                { icon: "Clock", text: "Работаем 7 дней в неделю" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(0,230,118,0.1)" }}
                  >
                    <Icon name={item.icon} fallback="Star" size={16} style={{ color: "#00E676" }} />
                  </div>
                  <span
                    className="text-sm text-foreground/80 leading-snug pt-1"
                    style={{ fontFamily: "'Golos Text', sans-serif" }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={150}>
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ aspectRatio: "4/5", border: "1px solid #1f1f1f" }}
              >
                <img src={GALLERY_IMG} alt="Зал" className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 rounded-xl p-6"
                style={{
                  background: "#141414",
                  border: "1px solid #1f1f1f",
                  minWidth: 180,
                }}
              >
                <div
                  className="text-3xl font-semibold"
                  style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
                >
                  06:00
                </div>
                <div
                  className="text-xs text-muted-foreground mt-1"
                  style={{ fontFamily: "'Golos Text', sans-serif" }}
                >
                  Открываемся каждый день
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="py-28" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
                >
                  Команда
                </p>
                <h2
                  className="text-5xl font-semibold text-white leading-tight"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  НАШИ
                  <br />
                  ТРЕНЕРЫ
                </h2>
              </div>
              <div
                className="hidden md:block text-sm text-muted-foreground max-w-xs text-right"
                style={{ fontFamily: "'Golos Text', sans-serif" }}
              >
                Профессионалы своего дела, которые помогут достичь твоих целей
              </div>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {trainers.map((trainer, i) => (
              <SectionReveal key={trainer.id} delay={i * 100}>
                <div
                  className="rounded-2xl overflow-hidden group cursor-pointer card-hover"
                  style={{ background: "#141414", border: "1px solid #1f1f1f" }}
                  onClick={() => setSelectedTrainer(trainer)}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={trainer.img}
                      alt={trainer.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                      }}
                    >
                      <div className="flex gap-2 flex-wrap">
                        {trainer.specialization.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-1 rounded text-xs"
                            style={{
                              background: "rgba(0,230,118,0.2)",
                              color: "#00E676",
                              fontFamily: "'Golos Text', sans-serif",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p
                      className="text-xs tracking-widest uppercase mb-2"
                      style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
                    >
                      {trainer.experience}
                    </p>
                    <h3
                      className="text-xl font-semibold text-white mb-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {trainer.name}
                    </h3>
                    <p
                      className="text-sm text-muted-foreground mb-4"
                      style={{ fontFamily: "'Golos Text', sans-serif" }}
                    >
                      {trainer.role}
                    </p>
                    <div
                      className="flex items-center gap-1 text-sm"
                      style={{ color: "#00E676", fontFamily: "'Golos Text', sans-serif" }}
                    >
                      <span>Подробнее</span>
                      <Icon name="ArrowRight" size={14} />
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 max-w-7xl mx-auto px-6">
        <SectionReveal>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
          >
            Галерея
          </p>
          <h2
            className="text-5xl font-semibold text-white mb-16 leading-tight"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            НАШ
            <br />
            ЗАЛ
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <SectionReveal key={i} delay={i * 80}>
              <div
                className="relative overflow-hidden rounded-xl cursor-pointer group"
                style={{ aspectRatio: i === 0 || i === 5 ? "4/5" : "1/1" }}
                onClick={() => setLightboxImg(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                  }}
                >
                  <span
                    className="text-sm text-white"
                    style={{ fontFamily: "'Golos Text', sans-serif" }}
                  >
                    {img.label}
                  </span>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {lightboxImg && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.95)" }}
            onClick={() => setLightboxImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              <Icon name="X" size={28} />
            </button>
            <img
              src={lightboxImg}
              alt=""
              className="max-w-full max-h-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: "85vh" }}
            />
          </div>
        )}
      </section>

      {/* PLANS */}
      <section id="plans" className="py-28" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
            >
              Абонементы
            </p>
            <h2
              className="text-5xl font-semibold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              ВЫБЕРИ
              <br />
              СВОЙ ПЛАН
            </h2>
            <p
              className="text-foreground/60 mb-16 max-w-md"
              style={{ fontFamily: "'Golos Text', sans-serif" }}
            >
              Прозрачные условия без скрытых платежей. Все абонементы включают доступ к базовой
              инфраструктуре.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <SectionReveal key={plan.name} delay={i * 100}>
                <div
                  className="rounded-2xl p-8 flex flex-col h-full card-hover relative overflow-hidden"
                  style={{
                    background: plan.accent ? "rgba(0,230,118,0.06)" : "#141414",
                    border: plan.accent
                      ? "1px solid rgba(0,230,118,0.3)"
                      : "1px solid #1f1f1f",
                  }}
                >
                  {plan.accent && (
                    <div
                      className="absolute top-6 right-6 text-xs tracking-widest uppercase px-3 py-1 rounded-full font-semibold"
                      style={{
                        background: "#00E676",
                        color: "#0a0a0a",
                        fontFamily: "'Oswald', sans-serif",
                      }}
                    >
                      Популярный
                    </div>
                  )}
                  <div className="mb-8">
                    <h3
                      className="text-2xl font-semibold text-white mb-2"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className="text-sm text-muted-foreground mb-6"
                      style={{ fontFamily: "'Golos Text', sans-serif" }}
                    >
                      {plan.desc}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-4xl font-bold"
                        style={{
                          color: plan.accent ? "#00E676" : "#fff",
                          fontFamily: "'Oswald', sans-serif",
                        }}
                      >
                        {plan.price}₽
                      </span>
                      <span
                        className="text-muted-foreground text-sm"
                        style={{ fontFamily: "'Golos Text', sans-serif" }}
                      >
                        / {plan.period}
                      </span>
                    </div>
                  </div>
                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: plan.accent
                              ? "rgba(0,230,118,0.2)"
                              : "rgba(255,255,255,0.08)",
                          }}
                        >
                          <Icon name="Check" size={11} style={{ color: "#00E676" }} />
                        </div>
                        <span
                          className="text-sm"
                          style={{
                            color: "rgba(255,255,255,0.75)",
                            fontFamily: "'Golos Text', sans-serif",
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full text-sm tracking-widest uppercase py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={
                      plan.accent
                        ? {
                            background: "#00E676",
                            color: "#0a0a0a",
                            fontFamily: "'Oswald', sans-serif",
                          }
                        : {
                            border: "1px solid #2a2a2a",
                            color: "#fff",
                            background: "transparent",
                            fontFamily: "'Oswald', sans-serif",
                          }
                    }
                    onClick={() => scrollTo("contacts")}
                  >
                    Оформить
                  </button>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          <SectionReveal>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
            >
              Контакты
            </p>
            <h2
              className="text-5xl font-semibold text-white mb-8 leading-tight"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              СВЯЖИТЕСЬ
              <br />С НАМИ
            </h2>
            <div className="space-y-6 mb-10">
              {[
                { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Спортивная, 14" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "Email", value: "info@istfit.ru" },
                {
                  icon: "Clock",
                  label: "Режим работы",
                  value: "Пн–Пт: 06:00–23:00 / Сб–Вс: 08:00–22:00",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,230,118,0.1)" }}
                  >
                    <Icon name={item.icon} fallback="Star" size={16} style={{ color: "#00E676" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs text-muted-foreground mb-0.5"
                      style={{ fontFamily: "'Golos Text', sans-serif" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-sm text-white"
                      style={{ fontFamily: "'Golos Text', sans-serif" }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {[
                { icon: "Instagram", label: "Instagram" },
                { icon: "MessageCircle", label: "Telegram" },
                { icon: "Youtube", label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ border: "1px solid #2a2a2a", color: "#666" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#00E676";
                    (e.currentTarget as HTMLElement).style.color = "#00E676";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
                    (e.currentTarget as HTMLElement).style.color = "#666";
                  }}
                >
                  <Icon name={s.icon} fallback="Star" size={16} />
                </a>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={150}>
            {formSent ? (
              <div
                className="rounded-2xl flex flex-col items-center justify-center p-12 text-center"
                style={{
                  background: "#141414",
                  border: "1px solid rgba(0,230,118,0.2)",
                  minHeight: 400,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "rgba(0,230,118,0.15)" }}
                >
                  <Icon name="CheckCircle" size={32} style={{ color: "#00E676" }} />
                </div>
                <h3
                  className="text-2xl font-semibold text-white mb-3"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Заявка отправлена!
                </h3>
                <p
                  className="text-muted-foreground text-sm"
                  style={{ fontFamily: "'Golos Text', sans-serif" }}
                >
                  Мы свяжемся с вами в ближайшее время и ответим на все вопросы.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                className="rounded-2xl p-8"
                style={{ background: "#141414", border: "1px solid #1f1f1f" }}
              >
                <h3
                  className="text-2xl font-semibold text-white mb-6"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Оставьте заявку
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      className="text-xs text-muted-foreground uppercase tracking-wider block mb-2"
                      style={{ fontFamily: "'Golos Text', sans-serif" }}
                    >
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-sm text-white outline-none transition-all"
                      style={{
                        background: "#0d0d0d",
                        border: "1px solid #2a2a2a",
                        fontFamily: "'Golos Text', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#00E676")}
                      onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
                      placeholder="Александр"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs text-muted-foreground uppercase tracking-wider block mb-2"
                      style={{ fontFamily: "'Golos Text', sans-serif" }}
                    >
                      Телефон
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-sm text-white outline-none transition-all"
                      style={{
                        background: "#0d0d0d",
                        border: "1px solid #2a2a2a",
                        fontFamily: "'Golos Text', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#00E676")}
                      onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs text-muted-foreground uppercase tracking-wider block mb-2"
                      style={{ fontFamily: "'Golos Text', sans-serif" }}
                    >
                      Сообщение
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-sm text-white outline-none transition-all resize-none"
                      style={{
                        background: "#0d0d0d",
                        border: "1px solid #2a2a2a",
                        fontFamily: "'Golos Text', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#00E676")}
                      onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
                      placeholder="Расскажите о своих целях..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-sm tracking-widest uppercase py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
                    style={{
                      background: "#00E676",
                      color: "#0a0a0a",
                      fontFamily: "'Oswald', sans-serif",
                    }}
                  >
                    Отправить заявку
                  </button>
                </div>
              </form>
            )}
          </SectionReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1a1a1a", background: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            className="text-lg font-semibold tracking-widest"
            style={{ color: "#00E676", fontFamily: "'Oswald', sans-serif" }}
          >
            IST<span className="text-white"> FIT</span>
          </div>
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "'Golos Text', sans-serif" }}
          >
            © 2024 IST FIT. Все права защищены.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Главная", id: "home" },
              { label: "Тренеры", id: "trainers" },
              { label: "Абонементы", id: "plans" },
            ].map((l) => (
              <button
                key={l.label}
                className="text-xs text-muted-foreground hover:text-white transition-colors"
                style={{ fontFamily: "'Golos Text', sans-serif" }}
                onClick={() => scrollTo(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}