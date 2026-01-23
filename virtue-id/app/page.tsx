export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
        VIRTUE<span className="text-blue-700">.ID</span>
      </h1>
      <p className="text-gray-500 text-lg max-w-xl mb-10">
        Rumah digital untuk solusi logistik dan produk digital premium.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
        <a href="/tools" className="flex-1 p-8 bg-[#0D47A1] text-white rounded-3xl hover:scale-105 transition-transform shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Logistics Tools</h2>
          <p className="text-blue-100 text-sm">Kalkulator Muatan Kapal & Operasional</p>
        </a>
        
        <a href="/store" className="flex-1 p-8 border-2 border-[#0D47A1] rounded-3xl hover:bg-blue-50 transition-colors">
          <h2 className="text-2xl font-bold mb-2 text-[#0D47A1]">Digital Store</h2>
          <p className="text-gray-500 text-sm">Katalog Script & Produk Digital</p>
        </a>
      </div>
    </main>
  );
}
