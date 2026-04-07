import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  Headphones,
  PenSquare,
  RotateCcw,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type LearningKey = "visual" | "auditory" | "reading" | "kinesthetic";
type Screen = "welcome" | "quiz" | "result";

type CategoryInfo = {
  label: string;
  short: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  summary: string;
  tactics: string[];
  hacks: string[];
};

type Question = {
  id: number;
  prompt: string;
  options: { text: string; category: LearningKey }[];
};

const author = {
  name: "Isa Dev",
  email: "icapla.92@gmail.com",
  github: "https://github.com/isa-capa",
  linkedin: "www.linkedin.com/in/isadev",
};

const categories: Record<LearningKey, CategoryInfo> = {
  visual: {
    label: "Visual",
    short: "Aprendes mejor viendo patrones, esquemas y procesos.",
    icon: Eye,
    colorClass: "bg-cyan-100 text-cyan-700 border-cyan-200",
    summary: "Tu memoria mejora cuando conviertes ideas en estructura visual.",
    tactics: ["Mapa mental por tema", "Diagramas de flujo", "Resumen visual de 1 pagina", "Codigo con colores"],
    hacks: [
      "Antes de estudiar detalle, dibuja el mapa general del tema en 3 bloques.",
      "Explica una arquitectura en una sola imagen para detectar huecos rapido.",
      "Transforma cada modulo tecnico en una ficha visual reutilizable.",
    ],
  },
  auditory: {
    label: "Auditivo",
    short: "Retienes mas cuando escuchas y verbalizas.",
    icon: Headphones,
    colorClass: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
    summary: "Tu comprension sube cuando explicas ideas en voz alta.",
    tactics: ["Tecnica Feynman", "Notas de voz", "Debate en pareja", "Resumen oral al cierre"],
    hacks: [
      "Despues de cada bloque, graba 60 segundos explicando lo clave.",
      "Si te atoras, cambia a explicacion hablada en vez de releer.",
      "Usa preguntas tipo entrevista para practicar conceptos tecnicos.",
    ],
  },
  reading: {
    label: "Lectura / Escritura",
    short: "Procesas mejor al leer, ordenar y escribir con precision.",
    icon: PenSquare,
    colorClass: "bg-amber-100 text-amber-700 border-amber-200",
    summary: "Tu aprendizaje se consolida al convertir informacion en texto propio.",
    tactics: ["Notas Cornell", "Flashcards", "Checklist de errores", "Resumen tecnico de 10 lineas"],
    hacks: [
      "Cierra la fuente y reescribe lo aprendido con tus palabras en 5 lineas.",
      "Convierte cada tema en preguntas cortas para active recall.",
      "Documenta errores reales: causa, arreglo y leccion aprendida.",
    ],
  },
  kinesthetic: {
    label: "Practico / Kinestesico",
    short: "Aprendes mas rapido cuando haces y corriges en accion.",
    icon: Wrench,
    colorClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
    summary: "Tu retencion mejora cuando pasas pronto de teoria a ejecucion.",
    tactics: ["Tutorial + 1 mejora", "Mini proyecto diario", "Laboratorio rapido", "Registro de experimentos"],
    hacks: [
      "Aplica la regla 20/80: 20% teoria y 80% practica guiada.",
      "En cada tutorial agrega una mejora no explicada para fijar aprendizaje.",
      "Mide avance por problemas resueltos, no por videos vistos.",
    ],
  },
};

const questions: Question[] = [
  {
    id: 1,
    prompt: "Cuando empiezas un tema nuevo, que te ayuda mas primero?",
    options: [
      { text: "Ver una vista general con esquema o diagrama", category: "visual" },
      { text: "Escuchar una explicacion paso a paso", category: "auditory" },
      { text: "Leer una guia clara y tomar notas", category: "reading" },
      { text: "Probar directo con un ejercicio", category: "kinesthetic" },
    ],
  },
  {
    id: 2,
    prompt: "Si un concepto tecnico se complica, que haces de forma natural?",
    options: [
      { text: "Lo convierto en bloques visuales", category: "visual" },
      { text: "Lo explico en voz alta", category: "auditory" },
      { text: "Lo reescribo en un resumen", category: "reading" },
      { text: "Lo llevo a codigo y lo pruebo", category: "kinesthetic" },
    ],
  },
  {
    id: 3,
    prompt: "Que formato te deja aprendizaje mas duradero en bootcamp?",
    options: [
      { text: "Ruta visual del tema de inicio a fin", category: "visual" },
      { text: "Mentoria con preguntas y respuestas", category: "auditory" },
      { text: "Documentacion y apuntes propios", category: "reading" },
      { text: "Retos practicos con feedback", category: "kinesthetic" },
    ],
  },
  {
    id: 4,
    prompt: "Para repasar antes de una evaluacion, que te funciona mejor?",
    options: [
      { text: "Diagramas, flujos o pantallas clave", category: "visual" },
      { text: "Explicarlo sin ver notas", category: "auditory" },
      { text: "Preguntas escritas y respuestas", category: "reading" },
      { text: "Resolver casos y bugs similares", category: "kinesthetic" },
    ],
  },
  {
    id: 5,
    prompt: "Cuando estudias solo, que actividad te da mas claridad?",
    options: [
      { text: "Ordenar el contenido en mapa", category: "visual" },
      { text: "Hablarlo como mini clase", category: "auditory" },
      { text: "Crear notas cortas por tema", category: "reading" },
      { text: "Construir algo pequeno funcional", category: "kinesthetic" },
    ],
  },
  {
    id: 6,
    prompt: "Que te destraba mas rapido cuando te sientes atorado?",
    options: [
      { text: "Ver otra representacion visual del proceso", category: "visual" },
      { text: "Escuchar otra forma de explicarlo", category: "auditory" },
      { text: "Leer la doc y resumirla", category: "reading" },
      { text: "Experimentar hasta aislar el error", category: "kinesthetic" },
    ],
  },
  {
    id: 7,
    prompt: "Que describe mejor tu mejor sesion de estudio?",
    options: [
      { text: "Vi patrones claros y conecte ideas", category: "visual" },
      { text: "Hable, escuche, aclare dudas", category: "auditory" },
      { text: "Lei, escribi y sintetice", category: "reading" },
      { text: "Practique, falle, ajuste", category: "kinesthetic" },
    ],
  },
  {
    id: 8,
    prompt: "Que te da mas confianza al cerrar el dia?",
    options: [
      { text: "Un esquema final de lo aprendido", category: "visual" },
      { text: "Poder explicarlo de memoria", category: "auditory" },
      { text: "Un resumen escrito accionable", category: "reading" },
      { text: "Un ejercicio real terminado", category: "kinesthetic" },
    ],
  },
];

const universalHabits = [
  "Active recall diario: intenta recordar sin mirar apuntes.",
  "Repeticion espaciada: repasa en 1 dia, 3 dias, 7 dias y 30 dias.",
  "Bloques de enfoque 45/10 para mantener energia y atencion.",
  "Proyecto pequeno semanal para convertir teoria en evidencia.",
];

function scoreAnswers(answers: (LearningKey | null)[]) {
  const base: Record<LearningKey, number> = {
    visual: 0,
    auditory: 0,
    reading: 0,
    kinesthetic: 0,
  };

  for (const answer of answers) {
    if (answer) base[answer] += 1;
  }
  return base;
}

function rankedProfiles(scores: Record<LearningKey, number>) {
  return (Object.keys(scores) as LearningKey[])
    .map((key) => ({
      key,
      score: scores[key],
      percent: Math.round((scores[key] / questions.length) * 100),
      ...categories[key],
    }))
    .sort((a, b) => b.score - a.score);
}

function blendedMessage(primary: string, secondary: string) {
  return `Tu perfil es mixto: predomina ${primary} y se complementa con ${secondary}. Esto no te encasilla; te ayuda a elegir una estrategia flexible y mas efectiva para aprender.`;
}

export default function EncuestaAprendizajeInteractiva() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(LearningKey | null)[]>(Array(questions.length).fill(null));

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const scores = useMemo(() => scoreAnswers(answers), [answers]);
  const ranking = useMemo(() => rankedProfiles(scores), [scores]);
  const topOne = ranking[0];
  const topTwo = ranking.slice(0, 2);

  const selected = answers[step];
  const isLast = step === questions.length - 1;

  const personalizedHacks = useMemo(() => {
    if (topTwo.length < 2) return [];
    return [
      ...topTwo[0].hacks.slice(0, 2),
      ...topTwo[1].hacks.slice(0, 2),
      "Regla de oro bootcamp: consume menos contenido y produce mas evidencia (codigo, notas, explicacion).",
    ];
  }, [topTwo]);

  function startQuiz() {
    setScreen("quiz");
  }

  function chooseAnswer(choice: LearningKey) {
    const next = [...answers];
    next[step] = choice;
    setAnswers(next);
  }

  function goNext() {
    if (!selected) return;
    if (isLast) {
      setScreen("result");
      return;
    }
    setStep((prev) => prev + 1);
  }

  function goBack() {
    setStep((prev) => Math.max(0, prev - 1));
  }

  function restartAll() {
    setAnswers(Array(questions.length).fill(null));
    setStep(0);
    setScreen("welcome");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-cyan-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Autor</p>
              <p className="text-base font-semibold text-slate-900">{author.name}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-slate-600">
              <Badge variant="outline" className="rounded-full px-3 py-1">
                {author.email}
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                {author.github}
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                {author.linkedin}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {screen === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="rounded-3xl border-0 shadow-xl">
                <CardHeader className="space-y-5 p-6 md:p-10">
                  <Badge className="w-fit rounded-full bg-slate-900 px-4 py-1 text-white">Diagnostico de aprendizaje</Badge>
                  <CardTitle className="text-3xl leading-tight md:text-5xl">
                    Descubre como aprendes mejor y acelera tu estudio tecnico
                  </CardTitle>
                  <CardDescription className="max-w-3xl text-base md:text-lg">
                    Este cuestionario detecta tu combinacion dominante sin encasillarte. Al final tendras tu forma
                    preferente, una forma complementaria, hacks personalizados y habitos universales que si funcionan.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 p-6 pt-0 md:grid-cols-3 md:p-10 md:pt-0">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-500">Paso 1</p>
                    <p className="mt-2 font-semibold text-slate-900">Bienvenida tipo onboarding</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-500">Paso 2</p>
                    <p className="mt-2 font-semibold text-slate-900">Encuesta diagnostica en 8 preguntas</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-500">Paso 3</p>
                    <p className="mt-2 font-semibold text-slate-900">Resultados con barras y hacks de estudio</p>
                  </div>
                  <div className="md:col-span-3">
                    <Button onClick={startQuiz} className="rounded-2xl px-6 py-6 text-base">
                      Iniciar cuestionario
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {screen === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="rounded-3xl border-0 shadow-xl">
                <CardHeader className="space-y-4 p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge className="rounded-full px-4 py-1">Encuesta</Badge>
                    <p className="text-sm text-slate-500">
                      Pregunta {step + 1} de {questions.length}
                    </p>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <CardTitle className="text-2xl md:text-3xl">{currentQuestion.prompt}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0 md:p-8 md:pt-0">
                  {currentQuestion.options.map((option) => {
                    const active = selected === option.category;
                    return (
                      <button
                        key={option.text}
                        onClick={() => chooseAnswer(option.category)}
                        className={`w-full rounded-2xl border p-4 text-left transition ${
                          active
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-base font-medium">{option.text}</span>
                          {active ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : null}
                        </div>
                      </button>
                    );
                  })}
                  <div className="flex items-center justify-between pt-2">
                    <Button variant="outline" onClick={goBack} disabled={step === 0} className="rounded-2xl">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button onClick={goNext} disabled={!selected} className="rounded-2xl">
                      {isLast ? "Ver resultados" : "Siguiente"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {screen === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <Card className="rounded-3xl border-0 shadow-xl">
                <CardHeader className="space-y-4 p-6 md:p-8">
                  <Badge className="w-fit rounded-full bg-slate-900 px-4 py-1 text-white">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Resultado final
                  </Badge>
                  <CardTitle className="text-3xl leading-tight md:text-4xl">
                    Tu forma preferente es {topOne.label}
                  </CardTitle>
                  <CardDescription className="max-w-3xl text-base md:text-lg">
                    {blendedMessage(topTwo[0].label, topTwo[1].label)}
                  </CardDescription>
                  <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-cyan-900">
                    Forma complementaria recomendada: <strong>{topTwo[1].label}</strong>
                  </div>
                </CardHeader>
              </Card>

              <Card className="rounded-3xl border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Barras de perfil</CardTitle>
                  <CardDescription>Distribucion de tus preferencias de aprendizaje.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ranking.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.key} className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div className={`rounded-xl border p-2 ${item.colorClass}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="font-medium text-slate-900">{item.label}</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-600">{item.percent}%</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-slate-900 transition-all duration-700"
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                        <p className="text-sm text-slate-600">{item.short}</p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-3xl border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Hacks segun tu perfil</CardTitle>
                    <CardDescription>Acciones directas para aprender mas rapido.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {personalizedHacks.map((hack) => (
                      <div key={hack} className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
                        {hack}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-0 bg-slate-900 text-white shadow-xl">
                  <CardHeader>
                    <CardTitle>Habitos universales</CardTitle>
                    <CardDescription className="text-slate-300">
                      Funcionan sin importar tu combinacion principal.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {universalHabits.map((habit) => (
                      <div key={habit} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                        {habit}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-3xl border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Plan sugerido para tus proximas 2 semanas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-slate-700">
                  <p>
                    1) Usa <strong>{topTwo[0].label}</strong> para entrar rapido al tema.
                  </p>
                  <p>
                    2) Refuerza con <strong>{topTwo[1].label}</strong> para mejorar retencion.
                  </p>
                  <p>3) Cierra cada sesion con evidencia: codigo, resumen o explicacion en 1 minuto.</p>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-3">
                <Button onClick={restartAll} variant="outline" className="rounded-2xl">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Repetir cuestionario
                </Button>
                <Button onClick={() => setScreen("welcome")} className="rounded-2xl">
                  Volver al inicio
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="space-y-3 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-500">Contacto</p>
            <p className="text-base font-semibold text-slate-900">{author.name}</p>
            <div className="grid gap-2 text-sm text-slate-600 md:grid-cols-3">
              <p>Email: {author.email}</p>
              <p>GitHub: {author.github}</p>
              <p>LinkedIn: {author.linkedin}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
