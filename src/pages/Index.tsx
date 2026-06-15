import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/files/32451844-e9fb-4c86-ab75-580ff12cbef9.jpg";
const TRAINER1_IMG = "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/files/b265f983-b890-4a62-a6f5-8659494513c3.jpg";
const TRAINER2_IMG = "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/files/bc180fed-e45c-4061-be08-e3b2de5a27d7.jpg";
const GALLERY_IMG = "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/files/67b70010-bf81-4d87-9637-37c9579bc9fd.jpg";
const MY_TRAINER_IMG = "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/bucket/b98a2540-c29e-49a7-b943-f2d18682ad14.jpg";
const MY_TRAINER_IMG_HQ = "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/bucket/31db9559-282d-4d0d-8faf-979896808042.jpg";

const TEAL = "#0EA5A0";

const trainers = [
  {
    id: 1,
    name: "Александр Морозов",
    role: "Тренер по силовым тренировкам",
    experience: "8 лет опыта",
    specialization: ["Пауэрлифтинг", "Функциональный тренинг", "Реабилитация"],
    bio: "Мастер спорта по пауэрлифтингу. Специализируется на работе с новичками и спортсменами среднего уровня. Разрабатывает индивидуальные программы под цели каждого клиента.",
    img: MY_TRAINER_IMG_HQ,
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
    img: "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/bucket/de043472-c6be-4259-b6dc-d1182340b81d.jpg",
    reviews: [
      { author: "Анна В.", text: "Занимаюсь у Елены уже год. Спина болеть перестала, настроение всегда отличное!", stars: 5 },
      { author: "Светлана М.", text: "Атмосфера на занятиях просто волшебная. Лена очень вдохновляет.", stars: 5 },
      { author: "Ольга Т.", text: "Отличный тренер, всегда объясняет технику и следит за правильностью выполнения.", stars: 5 },
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

const gymRooms = [
  {
    id: 1,
    label: "Тренажёрный зал",
    src: "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/bucket/f9c10069-59b0-46a2-915c-261d0506f15d.jpg",
    desc: "Просторный зал с профессиональным оборудованием для силовых тренировок любого уровня. Свободные веса, силовые рамы, тренажёры для всех групп мышц.",
    features: ["Силовые рамы и стойки", "Свободные веса до 50 кг", "Профессиональные тренажёры", "Зеркала по всему периметру", "Резиновое покрытие пола"],
  },
  {
    id: 2,
    label: "Персональные тренировки",
    src: MY_TRAINER_IMG,
    desc: "Отдельная зона для занятий с персональным тренером. Индивидуальный подход, персональная программа и максимальное внимание к технике выполнения упражнений.",
    features: ["Персональный тренер", "Индивидуальная программа", "Контроль техники", "Видеоанализ движений", "Гибкое расписание"],
  },
  {
    id: 3,
    label: "Кардио-зона",
    src: "https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/bucket/fcceda2b-01c6-44ca-829f-f2504141df8b.jpg",
    desc: "Современная кардио-зона с широким выбором беговых дорожек, велотренажёров, гребных тренажёров и эллипсов. Идеально для разминки, похудения и развития выносливости.",
    features: ["Беговые дорожки Pro Fitness", "Гребные тренажёры", "Велотренажёры", "Эллипсоиды", "Встроенные мониторы пульса"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function SectionReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
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
        <span key={i} style={{ color: i < stars ? TEAL : "#d1d5db" }}>★</span>
      ))}
    </div>
  );
}

type Trainer = (typeof trainers)[0];
type GymRoom = (typeof gymRooms)[0];

export default function Index() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedGym, setSelectedGym] = useState<GymRoom | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
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
    const ids = navLinks.map((l) => l.id);
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollY) { setActiveSection(ids[i]); break; }
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
    const stored = localStorage.getItem("ist_leads");
    const leads = stored ? JSON.parse(stored) : [];
    leads.unshift({
      id: `lead-${Date.now()}`,
      date: new Date().toISOString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      status: "new",
    });
    localStorage.setItem("ist_leads", JSON.stringify(leads));
    setFormSent(true);
  };

  /* ── Trainer detail page ── */
  if (selectedTrainer) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button
            onClick={() => setSelectedTrainer(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          >
            <Icon name="ArrowLeft" size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Назад к тренерам</span>
          </button>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "3/4", border: "1px solid #e5e7eb" }}>
              <img src={selectedTrainer.img} alt={selectedTrainer.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
                {selectedTrainer.experience}
              </p>
              <h1 className="text-4xl font-semibold mb-2 text-foreground" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {selectedTrainer.name}
              </h1>
              <p className="text-muted-foreground mb-6">{selectedTrainer.role}</p>
              <p className="text-foreground/80 leading-relaxed mb-8">{selectedTrainer.bio}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedTrainer.specialization.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-sm"
                    style={{ background: `rgba(14,165,160,0.1)`, color: TEAL, border: `1px solid rgba(14,165,160,0.2)` }}>
                    {s}
                  </span>
                ))}
              </div>
              <button
                className="text-sm tracking-wider uppercase px-6 py-3 rounded-lg font-semibold w-fit transition-all hover:scale-105 text-white"
                style={{ background: TEAL, fontFamily: "'Oswald', sans-serif" }}
                onClick={() => { setSelectedTrainer(null); setTimeout(() => scrollTo("contacts"), 100); }}
              >
                Записаться на тренировку
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-8" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Отзывы клиентов
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {selectedTrainer.reviews.map((r, i) => (
                <div key={i} className="p-6 rounded-xl shadow-sm" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
                  <StarRating stars={r.stars} />
                  <p className="text-foreground/75 text-sm leading-relaxed mt-3 mb-4">"{r.text}"</p>
                  <p className="text-muted-foreground text-sm font-medium">{r.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Gym detail page ── */
  if (selectedGym) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button
            onClick={() => setSelectedGym(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          >
            <Icon name="ArrowLeft" size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Назад к галерее</span>
          </button>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "4/3", border: "1px solid #e5e7eb" }}>
              <img src={selectedGym.src} alt={selectedGym.label} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
                IST FIT
              </p>
              <h1 className="text-4xl font-semibold mb-6 text-foreground" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {selectedGym.label.toUpperCase()}
              </h1>
              <div className="w-12 mb-6" style={{ height: "2px", background: TEAL }} />
              <p className="text-foreground/70 leading-relaxed mb-8">{selectedGym.desc}</p>
              <div className="flex flex-col gap-3 mb-8">
                {selectedGym.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(14,165,160,0.1)` }}>
                      <Icon name="Check" size={13} style={{ color: TEAL }} />
                    </div>
                    <span className="text-sm text-foreground/80">{f}</span>
                  </div>
                ))}
              </div>
              <button
                className="text-sm tracking-wider uppercase px-6 py-3 rounded-lg font-semibold w-fit transition-all hover:scale-105 text-white"
                style={{ background: TEAL, fontFamily: "'Oswald', sans-serif" }}
                onClick={() => { setSelectedGym(null); setTimeout(() => scrollTo("contacts"), 100); }}
              >
                Записаться на тренировку
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main page ── */
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid #e5e7eb" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-widest" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
            IST<span className="text-foreground"> FIT</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="nav-link text-sm transition-colors"
                style={{ color: activeSection === link.id ? TEAL : "#6b7280", fontFamily: "'Golos Text', sans-serif" }}>
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              className="text-xs tracking-widest uppercase px-4 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 border"
              style={{ borderColor: TEAL, color: TEAL, background: "transparent", fontFamily: "'Oswald', sans-serif" }}
              onClick={() => navigate("/admin")}>
              ЛК
            </button>
            <button
              className="text-xs tracking-widest uppercase px-5 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 text-white"
              style={{ background: TEAL, fontFamily: "'Oswald', sans-serif" }}
              onClick={() => scrollTo("contacts")}>
              Записаться
            </button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-white" style={{ borderTop: "1px solid #e5e7eb" }}>
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="text-left text-base py-1"
                style={{ color: activeSection === link.id ? TEAL : "#374151" }}>
                {link.label}
              </button>
            ))}
            <button className="text-xs tracking-widest uppercase px-5 py-3 rounded-lg font-semibold mt-2 text-white"
              style={{ background: TEAL, fontFamily: "'Oswald', sans-serif" }}
              onClick={() => scrollTo("contacts")}>
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background — trainer photo, desaturated and light-overlaid */}
        <div className="absolute inset-0">
          <img
            src={MY_TRAINER_IMG_HQ}
            alt="IST FIT"
            className="w-full h-full object-cover object-center"
            style={{ filter: "saturate(0.55) brightness(1.05)" }}
          />
          {/* Strong left-side whitewash so text reads clean, gentle fade to right */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(100deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 38%, rgba(255,255,255,0.45) 65%, rgba(255,255,255,0.08) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 w-full">
          <div className="max-w-lg">
            <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
              Фитнес-центр в Брянске
            </p>
            <h1 className="font-bold leading-none mb-6 text-foreground"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.0, fontFamily: "'Oswald', sans-serif" }}>
              СДЕЛАЙ <br />
              <span style={{ color: TEAL }}>ПЕРВЫЙ</span>
              <br /> ШАГ
            </h1>
            <p className="text-lg mb-10 text-foreground/60" style={{ lineHeight: 1.7 }}>
              Профессиональные тренеры, современное оборудование и атмосфера, которая заряжает с первого дня.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => scrollTo("plans")}
                className="text-sm tracking-widest uppercase px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 text-white"
                style={{ background: TEAL, fontFamily: "'Oswald', sans-serif" }}>
                Выбрать абонемент
              </button>
              <button onClick={() => scrollTo("trainers")}
                className="text-sm tracking-widest uppercase px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 text-foreground"
                style={{ border: "1.5px solid #d1d5db", background: "rgba(255,255,255,0.6)", fontFamily: "'Oswald', sans-serif" }}>
                Наши тренеры
              </button>
            </div>
          </div>
        </div>


      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <SectionReveal>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
              О нас
            </p>
            <h2 className="text-5xl font-semibold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
              МЫ СТРОИМ <br />РЕЗУЛЬТАТ
            </h2>
            <div className="w-12 mb-8" style={{ height: "2px", background: TEAL }} />
            <p className="text-foreground/70 leading-relaxed mb-6">
              IST FIT — это не просто фитнес-центр. Это место, где каждый клиент получает персональный подход, профессиональное сопровождение и реальный результат.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-10">
              Мы открылись совсем недавно, но уже помогаем людям двигаться к своим целям. Наши тренеры — практики, которые сами живут спортом и передают этот заряд каждому клиенту.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "Dumbbell", text: "Современное оборудование" },
                { icon: "Users", text: "Групповые программы" },
                { icon: "Award", text: "Сертифицированные тренеры" },
                { icon: "Clock", text: "Работаем 7 дней в неделю" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `rgba(14,165,160,0.1)` }}>
                    <Icon name={item.icon} fallback="Star" size={16} style={{ color: TEAL }} />
                  </div>
                  <span className="text-sm text-foreground/80 leading-snug pt-1">{item.text}</span>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={150}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "4/5", border: "1px solid #e5e7eb" }}>
                <img src="https://cdn.poehali.dev/projects/180daee3-014f-4c83-b93c-226a90ab52f5/bucket/1c8b736b-c07f-4dda-b2b3-7c5359357a71.jpg" alt="Команда IST FIT" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl p-6 shadow-lg"
                style={{ background: "#fff", border: "1px solid #e5e7eb", minWidth: 180 }}>
                <div className="text-3xl font-semibold" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>06:00</div>
                <div className="text-xs text-muted-foreground mt-1">Открываемся каждый день</div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="py-28" style={{ background: "#f8fafa" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
                  Команда
                </p>
                <h2 className="text-5xl font-semibold text-foreground leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  НАШИ<br />ТРЕНЕРЫ
                </h2>
              </div>
              <div className="hidden md:block text-sm text-muted-foreground max-w-xs text-right">
                Профессионалы своего дела, которые помогут достичь твоих целей
              </div>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {trainers.map((trainer, i) => (
              <SectionReveal key={trainer.id} delay={i * 100}>
                <div
                  className="rounded-2xl overflow-hidden group cursor-pointer card-hover bg-white"
                  style={{ border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  onClick={() => setSelectedTrainer(trainer)}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <img src={trainer.img} alt={trainer.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }}>
                      <div className="flex gap-2 flex-wrap">
                        {trainer.specialization.map((s) => (
                          <span key={s} className="px-2 py-1 rounded text-xs text-white"
                            style={{ background: "rgba(14,165,160,0.75)" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs tracking-widest uppercase mb-2" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
                      {trainer.experience}
                    </p>
                    <h3 className="text-xl font-semibold text-foreground mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                      {trainer.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{trainer.role}</p>
                    <div className="flex items-center gap-1 text-sm" style={{ color: TEAL }}>
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
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
            Галерея
          </p>
          <h2 className="text-5xl font-semibold text-foreground mb-16 leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
            НАШ<br />ЗАЛ
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gymRooms.map((room, i) => (
            <SectionReveal key={room.id} delay={i * 70}>
              <div
                className="relative overflow-hidden rounded-xl cursor-pointer group shadow-sm"
                style={{ aspectRatio: "4/3" }}
                onClick={() => setSelectedGym(room)}
              >
                <img src={room.src} alt={room.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div
                  className="absolute inset-0 transition-opacity duration-300 flex flex-col items-start justify-end p-5"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)" }}>
                  <span className="text-base font-semibold text-white mb-2">{room.label}</span>
                  <div className="flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "rgba(14,165,160,0.9)" }}>
                    <span>Подробнее</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-28" style={{ background: "#f8fafa" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
              Абонементы
            </p>
            <h2 className="text-5xl font-semibold text-foreground mb-4 leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
              ВЫБЕРИ<br />СВОЙ ПЛАН
            </h2>
            <p className="text-foreground/60 mb-16 max-w-md">
              Прозрачные условия без скрытых платежей. Все абонементы включают доступ к базовой инфраструктуре.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <SectionReveal key={plan.name} delay={i * 100}>
                <div
                  className="rounded-2xl p-8 flex flex-col h-full card-hover"
                  style={{
                    background: plan.accent ? `rgba(14,165,160,0.06)` : "#fff",
                    border: plan.accent ? `1.5px solid rgba(14,165,160,0.4)` : "1px solid #e5e7eb",
                    boxShadow: plan.accent ? "0 8px 30px rgba(14,165,160,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
                    position: "relative",
                  }}
                >
                  {plan.accent && (
                    <div className="absolute top-6 right-6 text-xs tracking-widest uppercase px-3 py-1 rounded-full font-semibold text-white"
                      style={{ background: TEAL, fontFamily: "'Oswald', sans-serif" }}>
                      Популярный
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold" style={{ color: plan.accent ? TEAL : "#111827", fontFamily: "'Oswald', sans-serif" }}>
                        {plan.price}₽
                      </span>
                      <span className="text-muted-foreground text-sm">/ {plan.period}</span>
                    </div>
                  </div>
                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: plan.accent ? `rgba(14,165,160,0.15)` : "#f3f4f6" }}>
                          <Icon name="Check" size={11} style={{ color: TEAL }} />
                        </div>
                        <span className="text-sm text-foreground/75">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full text-sm tracking-widest uppercase py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={
                      plan.accent
                        ? { background: TEAL, color: "#fff", fontFamily: "'Oswald', sans-serif" }
                        : { border: "1.5px solid #d1d5db", color: "#374151", background: "transparent", fontFamily: "'Oswald', sans-serif" }
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
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
              Контакты
            </p>
            <h2 className="text-5xl font-semibold text-foreground mb-8 leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
              СВЯЖИТЕСЬ<br />С НАМИ
            </h2>
            <div className="space-y-6 mb-10">
              {[
                { icon: "MapPin", label: "Адрес", value: "г. Брянск" },
                { icon: "Phone", label: "Телефон", value: "+7 (___) ___-__-__" },
                { icon: "Mail", label: "Email", value: "info@istfit.ru" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 06:00–23:00 / Сб–Вс: 08:00–22:00" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `rgba(14,165,160,0.1)` }}>
                    <Icon name={item.icon} fallback="Star" size={16} style={{ color: TEAL }} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                    <div className="text-sm text-foreground">{item.value}</div>
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
                <a key={s.label} href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ border: "1px solid #d1d5db", color: "#9ca3af" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = TEAL; (e.currentTarget as HTMLElement).style.color = TEAL; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db"; (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}>
                  <Icon name={s.icon} fallback="Star" size={16} />
                </a>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={150}>
            {formSent ? (
              <div className="rounded-2xl flex flex-col items-center justify-center p-12 text-center shadow-sm"
                style={{ background: "#fff", border: `1px solid rgba(14,165,160,0.25)`, minHeight: 400 }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: `rgba(14,165,160,0.12)` }}>
                  <Icon name="CheckCircle" size={32} style={{ color: TEAL }} />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Заявка отправлена!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Мы свяжемся с вами в ближайшее время и ответим на все вопросы.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="rounded-2xl p-8 shadow-sm"
                style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
                <h3 className="text-2xl font-semibold text-foreground mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Оставьте заявку
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Ваше имя", key: "name", type: "text", ph: "Александр" },
                    { label: "Телефон", key: "phone", type: "tel", ph: "+7 (___) ___-__-__" },
                    { label: "Email", key: "email", type: "email", ph: "example@mail.ru" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        required={field.key === "name" || field.key === "phone"}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-sm text-foreground outline-none transition-all"
                        style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
                        onFocus={(e) => (e.target.style.borderColor = TEAL)}
                        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                        placeholder={field.ph}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Сообщение</label>
                    <textarea rows={4} value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-sm text-foreground outline-none transition-all resize-none"
                      style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
                      onFocus={(e) => (e.target.style.borderColor = TEAL)}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                      placeholder="Расскажите о своих целях..." />
                  </div>
                  <button type="submit"
                    className="w-full text-sm tracking-widest uppercase py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] text-white mt-2"
                    style={{ background: TEAL, fontFamily: "'Oswald', sans-serif" }}>
                    Отправить заявку
                  </button>
                </div>
              </form>
            )}
          </SectionReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e5e7eb", background: "#f9fafb" }}>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg font-semibold tracking-widest" style={{ color: TEAL, fontFamily: "'Oswald', sans-serif" }}>
            IST<span className="text-foreground"> FIT</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 IST FIT. Все права защищены.</p>
          <div className="flex gap-6">
            {[
              { label: "Главная", id: "home" },
              { label: "Тренеры", id: "trainers" },
              { label: "Абонементы", id: "plans" },
            ].map((l) => (
              <button key={l.label} className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}