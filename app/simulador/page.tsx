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
     ESTADO FINANCIERO
  ======================= */
  let estadoFinanciero = '';
  let colorEstado = '';

  if (mesesCobertura >= 12) {
    estadoFinanciero = '🟢 Salud financiera sólida';
    colorEstado = 'text-green-600';
  } else if (mesesCobertura >= 6) {
    estadoFinanciero = '🟡 Atención: situación estable pero frágil';
    colorEstado = 'text-yellow-600';
  } else {
    estadoFinanciero = '🔴 Riesgo financiero';
    colorEstado = 'text-red-600';
  }

  /* =======================
     ETAPA DE VIDA
  ======================= */
  let etapaVida = '';
  let mensajeEtapa = '';

  const edadNumero = Number(edad);

  if (edadNumero < 30) {
    etapaVida = 'Construcción';
    mensajeEtapa = 'Etapa de formación de hábitos y crecimiento.';
  } else if (edadNumero < 45) {
    etapaVida = 'Consolidación';
    mensajeEtapa = 'Momento de equilibrio entre ingresos y estabilidad.';
  } else if (edadNumero < 60) {
    etapaVida = 'Optimización';
    mensajeEtapa = 'Enfoque en proteger y optimizar recursos.';
  } else {
    etapaVida = 'Bienestar';
    mensajeEtapa = 'Prioridad en estabilidad y calidad de vida.';
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

        {paso === 0 && (
          <>
            <h1 className="text-4xl font-bold mb-4">OneLife</h1>
            <p className="text-slate-600 mb-6">
              Tu salud financiera en un solo lugar.
            </p>
            <button onClick={() => setPaso(1)} className="btn-primary">
              Comenzar
            </button>
          </>
        )}

        {paso === 1 && (
          <>
            <p className="step">Paso 1</p>
            <h2 className="title">¿Cuál es tu edad?</h2>
            <input className="input" value={edad} onChange={e => setEdad(e.target.value)} />
            <button onClick={() => setPaso(2)} className="btn-primary">Siguiente</button>
          </>
        )}

        {paso === 2 && (
          <>
            <p className="step">Paso 2</p>
            <h2 className="title">Ingresos mensuales</h2>
            <input className="input" value={ingresos} onChange={e => setIngresos(e.target.value)} />
            <button onClick={() => setPaso(3)} className="btn-primary">Siguiente</button>
          </>
        )}

        {paso === 3 && (
          <>
            <p className="step">Paso 3</p>
            <h2 className="title">Gastos mensuales</h2>
            <input className="input" value={gastosFijos} onChange={e => setGastosFijos(e.target.value)} />
            <button onClick={() => setPaso(4)} className="btn-primary">Siguiente</button>
          </>
        )}

        {paso === 4 && (
          <>
            <p className="step">Paso 4</p>
            <h2 className="title">Ahorro mensual</h2>
            <input className="input" value={ahorro} onChange={e => setAhorro(e.target.value)} />
            <button onClick={() => setPaso(5)} className="btn-primary">Ver resultado</button>
          </>
        )}

        {paso === 5 && (
          <>
            <h2 className={`text-2xl font-bold mb-2 ${colorEstado}`}>
              {estadoFinanciero}
            </h2>

            <p className="mb-2">Meses cubiertos: {Math.round(mesesCobertura)}</p>
            <p className="mb-2"><strong>Etapa:</strong> {etapaVida}</p>

            <button
              onClick={() => setPaso(0)}
              className="text-sm text-indigo-600 underline mt-4"
            >
              Volver a empezar
            </button>
          </>
        )}
      </div>
    </main>
  );
}
















