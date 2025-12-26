'use client';

import { useState } from 'react';

/* =======================
   UTILIDADES NUMÉRICAS
======================= */
function formatMoney(value: number) {
  return value
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatInput(value: string) {
  const onlyNumbers = value.replace(/\D/g, '');
  if (!onlyNumbers) return '';
  return formatMoney(Number(onlyNumbers));
}

function cleanNumber(value: string) {
  return Number(value.replace(/\./g, ''));
}

export default function Simulador() {
  const [paso, setPaso] = useState(0);

  const [moneda, setMoneda] = useState<'$' | 'USD'>('$');
  const [edad, setEdad] = useState('');

  const [ingresos, setIngresos] = useState('');
  const [gastosFijos, setGastosFijos] = useState('');
  const [ahorro, setAhorro] = useState('');

  const [anios, setAnios] = useState(10);

  /* =======================
     CÁLCULOS
  ======================= */
  const ingresoMensual = cleanNumber(ingresos);
  const ahorroMensual = cleanNumber(ahorro);
  const gastoTotal = ingresoMensual - ahorroMensual;

  const ahorroProyectado = ahorroMensual * 12 * anios;
  const mesesCobertura =
    gastoTotal > 0 ? ahorroProyectado / gastoTotal : 0;

  /* =======================
     ESCENARIOS
  ======================= */
  const escenarios = [
    {
      nombre: '😐 Actual',
      descripcion: 'Si seguís exactamente como hoy.',
      ahorro: ahorroMensual,
    },
    {
      nombre: '😊 Optimista',
      descripcion: 'Si lográs ahorrar un 20% más por mes.',
      ahorro: ahorroMensual * 1.2,
    },
    {
      nombre: '😬 Pesimista',
      descripcion: 'Si terminás ahorrando un 20% menos por mes.',
      ahorro: ahorroMensual * 0.8,
    },
  ];

  /* =======================
     ESTADO
  ======================= */
  let estado = '';
  let mensaje = '';
  let colorEstado = '';

  if (mesesCobertura >= 12) {
    estado = 'Bien';
    mensaje = 'Tenés un buen margen de estabilidad financiera.';
    colorEstado = 'text-green-600';
  } else if (mesesCobertura >= 6) {
    estado = 'Justo';
    mensaje = 'Vas bien, pero con poco margen.';
    colorEstado = 'text-yellow-600';
  } else {
    estado = 'Riesgo';
    mensaje = 'Tu situación es frágil ante imprevistos.';
    colorEstado = 'text-red-600';
  }

  /* =======================
     RECOMENDACIÓN
  ======================= */
  let recomendacion = '';

  if (mesesCobertura < 12 && gastoTotal > 0) {
    const ahorroObjetivo = gastoTotal / anios;
    const extra = ahorroObjetivo - ahorroMensual;

    if (extra > 0) {
      const nuevaCobertura =
        ((ahorroMensual + extra) * 12 * anios) / gastoTotal;
      const mesesExtra = nuevaCobertura - mesesCobertura;

      recomendacion = `Ahorrar ${moneda} ${formatMoney(
        Math.ceil(extra)
      )} más por mes te daría ${formatMoney(
        mesesExtra
      )} meses más de cobertura sin recibir ingresos.`;
    } else {
      recomendacion =
        'Reduciendo un poco tus gastos podrías mejorar tu estabilidad.';
    }
  } else {
    recomendacion =
      'Tu situación es sólida. Podrías evaluar invertir o diversificar.';
  }

  /* =======================
     ETAPA DE VIDA (NUEVO)
  ======================= */
  let etapaVida = '';
  let mensajeEtapa = '';

  const edadNumero = Number(edad);

  if (edadNumero < 30) {
    etapaVida = 'Construcción';
    mensajeEtapa =
      'Etapa asociada al desarrollo de hábitos y bases financieras de largo plazo.';
  } else if (edadNumero < 45) {
    etapaVida = 'Consolidación';
    mensajeEtapa =
      'Momento en el que suele buscarse equilibrio entre crecimiento y estabilidad.';
  } else if (edadNumero < 60) {
    etapaVida = 'Optimización';
    mensajeEtapa =
      'Etapa enfocada en optimizar recursos y prevenir desequilibrios futuros.';
  } else {
    etapaVida = 'Bienestar';
    mensajeEtapa =
      'Fase en la que el foco suele estar en bienestar general y calidad de vida.';
  }

  const BotonAtras = () =>
    paso > 0 ? (
      <button
        onClick={() => setPaso(paso - 1)}
        className="text-sm text-slate-500 underline mt-3"
      >
        Atrás
      </button>
    ) : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">

        {/* =======================
           INTRO
        ======================= */}
        {paso === 0 && (
          <>
            <h1 className="text-4xl font-bold mb-4">OneLife</h1>

            <p className="text-slate-600 mb-6">
              OneLife es una herramienta de análisis personal que
              traduce tus hábitos financieros actuales en una proyección
              clara de tu futuro económico.
            </p>

            <div className="space-y-3 text-left mb-6">
              <div className="flex gap-3">🔒 <span>No te pide datos sensibles</span></div>
              <div className="flex gap-3">🛒 <span>No vende productos</span></div>
              <div className="flex gap-3">🧭 <span>Diagnóstico claro y honesto</span></div>
            </div>

            <button onClick={() => setPaso(1)} className="btn-primary">
              Empezar simulación
            </button>
          </>
        )}

        {/* =======================
           PASO 1 – MONEDA
        ======================= */}
        {paso === 1 && (
          <>
            <p className="step">Paso 1 de 6</p>
            <h2 className="title">Moneda</h2>

            <select
              value={moneda}
              onChange={(e) => setMoneda(e.target.value as '$' | 'USD')}
              className="input"
            >
              <option value="$">Pesos</option>
              <option value="USD">Dólares</option>
            </select>

            <button onClick={() => setPaso(2)} className="btn-primary">
              Siguiente
            </button>
          </>
        )}

        {/* =======================
           PASO 2 – EDAD
        ======================= */}
        {paso === 2 && (
          <>
            <p className="step">Paso 2 de 6</p>
            <h2 className="title">¿Qué edad tenés?</h2>

            <input
              type="number"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="input"
            />

            <button disabled={!edad} onClick={() => setPaso(3)} className="btn-primary">
              Siguiente
            </button>

            <BotonAtras />
          </>
        )}

        {/* =======================
           PASO 3 – INGRESOS
        ======================= */}
        {paso === 3 && (
          <>
            <p className="step">Paso 3 de 6</p>
            <h2 className="title">Ingresos mensuales</h2>

            <input
              type="text"
              inputMode="numeric"
              value={ingresos}
              onChange={(e) => setIngresos(formatInput(e.target.value))}
              className="input"
              placeholder="Ej: 64.400"
            />

            <button disabled={!ingresos} onClick={() => setPaso(4)} className="btn-primary">
              Siguiente
            </button>

            <BotonAtras />
          </>
        )}

        {/* =======================
           PASO 4 – GASTOS
        ======================= */}
        {paso === 4 && (
          <>
            <p className="step">Paso 4 de 6</p>
            <h2 className="title">¿Cuánto gastás por mes?</h2>

            <input
              type="text"
              inputMode="numeric"
              value={gastosFijos}
              onChange={(e) => setGastosFijos(formatInput(e.target.value))}
              className="input"
              placeholder="Ej: 40.000"
            />

            <button disabled={!gastosFijos} onClick={() => setPaso(5)} className="btn-primary">
              Siguiente
            </button>

            <BotonAtras />
          </>
        )}

        {/* =======================
           PASO 5 – AHORRO
        ======================= */}
        {paso === 5 && (
          <>
            <p className="step">Paso 5 de 6</p>
            <h2 className="title">¿Cuánto ahorrás por mes?</h2>

            <input
              type="text"
              inputMode="numeric"
              value={ahorro}
              onChange={(e) => setAhorro(formatInput(e.target.value))}
              className="input"
              placeholder="Ej: 10.000"
            />

            <button disabled={!ahorro} onClick={() => setPaso(6)} className="btn-primary">
              Siguiente
            </button>

            <BotonAtras />
          </>
        )}

        {/* =======================
           PASO 6 – HORIZONTE
        ======================= */}
        {paso === 6 && (
          <>
            <p className="step">Paso 6 de 6</p>
            <h2 className="title">Horizonte de tiempo</h2>

            <select
              value={anios}
              onChange={(e) => setAnios(Number(e.target.value))}
              className="input"
            >
              <option value={5}>5 años</option>
              <option value={10}>10 años</option>
              <option value={15}>15 años</option>
            </select>

            <button onClick={() => setPaso(7)} className="btn-primary">
              Ver resultado
            </button>

            <BotonAtras />
          </>
        )}

        {/* =======================
           RESULTADO
        ======================= */}
        {paso === 7 && (
          <>
            <h2 className={`text-3xl font-bold mb-2 ${colorEstado}`}>
              {estado}
            </h2>

            <p className="mb-4">{mensaje}</p>

            <p className="text-sm mb-4">
              <strong>{formatMoney(mesesCobertura)}</strong> meses de cobertura sin recibir ingresos
            </p>

            {/* ETAPA DE VIDA – NUEVO */}
            <div className="mb-4 text-sm text-slate-600">
              <p>
                <strong>Etapa de vida:</strong> {etapaVida}
              </p>
              <p>{mensajeEtapa}</p>
            </div>

            <div className="card">
              <p className="font-semibold mb-1">Recomendación</p>
              <p className="text-sm">{recomendacion}</p>
            </div>

            <div className="card text-left">
              <p className="font-semibold mb-2 text-center">Escenarios</p>
              {escenarios.map((e) => {
                const meses =
                  ((e.ahorro * 12 * anios) / gastoTotal) || 0;
                return (
                  <div key={e.nombre} className="mb-2">
                    <p className="font-medium">{e.nombre}</p>
                    <p className="text-xs text-slate-500">{e.descripcion}</p>
                    <p className="text-sm">
                      {formatMoney(meses)} meses de cobertura sin recibir ingresos
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setPaso(0)}
              className="text-sm text-indigo-600 underline"
            >
              Volver al inicio
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .btn-primary {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: linear-gradient(to right, #6366f1, #3b82f6);
          color: white;
          font-weight: 600;
          margin-top: 8px;
        }
        .input {
          width: 100%;
          border: 2px solid #c7d2fe;
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 12px;
          text-align: center;
          font-size: 1.1rem;
        }
        .title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .step {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-bottom: 6px;
        }
        .card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
        }
      `}</style>
    </main>
  );
}

















