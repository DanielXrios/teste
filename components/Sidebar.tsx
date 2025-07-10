"use client"
import { Button } from "@/components/ui/button"
import { Home, Users, Target, BarChart3, Award, User } from "lucide-react"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

const menuItems = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "mentorias", label: "Mentorias", icon: Users },
  { id: "missoes", label: "Missões", icon: Target },
  { id: "teste-disc", label: "Teste DISC", icon: BarChart3 },
  { id: "teste-vocacional", label: "Teste Vocacional", icon: Award },
  { id: "perfil", label: "Perfil", icon: User },
  { id: "bia", label: "BIA", icon: null, isSpecial: true },
]

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div className="w-64 lg:w-72 bg-primaryOrange text-white shadow-2xl fixed left-0 top-0 h-full z-40">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white/10">
              <img src="/logo-alicerce-round.png" alt="Logo Alicerce" className="w-10 h-10 object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: "Fredoka, sans-serif" }}>
                Alicerce to School
              </h1>
              <p className="text-xs text-white/75">Sua jornada de crescimento</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-white hover:bg-white/10 rounded-xl h-12 transition-all duration-300 ${
                      currentPage === item.id ? "bg-white/20 shadow-lg" : ""
                    }`}
                    onClick={() => onPageChange(item.id)}
                  >
                    {item.isSpecial ? (
                      <div className="w-5 h-5 mr-3 rounded-full overflow-hidden bg-primaryOrange border-2 border-white/30">
                        <img
                          src="/bia-avatar.png"
                          alt="BIA"
                          className="w-full h-full object-cover"
                          style={{ backgroundColor: "#D95E28" }}
                        />
                      </div>
                    ) : (
                      <Icon className="h-5 w-5 mr-3" />
                    )}
                    <span className="font-medium">{item.label}</span>
                  </Button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
