'use client';

import { useState, useEffect } from 'react';

/* =======================
   UTILIDADES
======================= */
function formatMoney(value: number) {
  return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
  const [gastos, setGastos] = useState('');
  const [ahorro, setAhorro] = useState('');

  const [anios, setAnios] = useState(10);

  const [historial, setHistorial] = useState<any[]>([]);
  const [salud, setSalud] = useState('');

  const ingreso = cleanNumber(ingresos);
  const gasto = cleanNumber(gastos);
  const ahorroNum = cleanNumber(ahorro);

  const mesesCobertura =
    gasto > 0 ? (ahorroNum * 12) / gasto : 0;

  /* =======================
     EFECTO: GUARDAR HISTORIAL
  ======================= */
  useEffect(() => {
    if (!ingresos || !gastos) return;

    const registro = {
      fecha: new Date().toLocaleDateString(),
      meses: Math.round(mesesCobertura),
    };

    const historialPrevio = JSON.parse(
      localStorage.getItem('historial') || '[]'
    );

    localStorage.setItem(
      'historial',
      JSON.stringify([...historialPrevio, registro])
    );

    setHistorial([...historialPrevio, registro]);
  }, [mesesCobertura]);

  /* =======================
     SALUD FINANCIERA
  ======================= */
  useEffect(() => {
    let score = 0;

    if (mesesCobertura >= 12) score += 2;
    else if (mesesCobertura >= 6) score += 1;

    if (edad && Number(edad) < 35) score += 1;

    if (score >= 3) setSalud('🟢 Salud financiera sólida');
    else if (score === 2) setSalud('🟡 Situación estable, con margen de mejora');
    else setSalud('🔴 Riesgo financiero');
  }, [mesesCobertura, edad]);

  /* =======================
     UI
  ======================= */
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-4">OneLife</h1>

        <input className="input" placeholder="Edad" value={edad} onChange={e => setEdad(e.target.value)} />
        <input className="input" placeholder="Ingresos mensuales" value={ingresos} onChange={e => setIngresos(e.target.value)} />
        <input className="input" placeholder="Gastos mensuales" value={gastos} onChange={e => setGastos(e.target.value)} />
        <input className="input" placeholder="Ahorro mensual" value={ahorro} onChange={e => setAhorro(e.target.value)} />

        <div className="mt-4 p-4 bg-slate-100 rounded">
          <p className="font-semibold">Estado actual</p>
          <p>{salud}</p>
          <p>Meses cubiertos: {Math.round(mesesCobertura)}</p>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded">
          <p className="font-semibold">Historial</p>
          {historial.map((h, i) => (
            <p key={i}>{h.fecha}: {h.meses} meses</p>
          ))}
        </div>
      </div>
    </main>
  );
}















