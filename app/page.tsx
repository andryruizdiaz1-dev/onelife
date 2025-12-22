'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        ¿Estás bien parado para los próximos 10 años?
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
        Simulá tu futuro financiero y de vida en 2 minutos.  
        Sin bancos. Sin vendedores. Sin vueltas.
      </p>

      <Link
        href="/simulador"
        className="bg-black text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition"
      >
        Simular mi futuro
      </Link>

      <div className="flex gap-6 mt-8 text-sm text-gray-500">
        <span>⏱ 2 minutos</span>
        <span>🔒 Datos privados</span>
        <span>📊 3 escenarios</span>
      </div>
    </main>
  );
}
