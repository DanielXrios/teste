"use client"

export default function PupilaComponent() {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-bounce">
      <div className="relative">
        <div className="bg-white p-3 rounded-full shadow-2xl border-4 border-primaryOrange">
          <img src="/cachorro-mascote.png" alt="Cachorro Mascote Alicerce" className="w-12 h-12 object-contain" />
        </div>
      </div>
    </div>
  )
}
