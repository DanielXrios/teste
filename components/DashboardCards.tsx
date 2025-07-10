"use client"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Target, Zap, Trophy } from "lucide-react"

interface DashboardCardsProps {
  user: any
}

export default function DashboardCards({ user }: DashboardCardsProps) {
  const cards = [
    {
      title: "Mentorias",
      value: user?.mentoriasAssistidas || 0,
      icon: BookOpen,
      bgColor: "bg-orange-100",
      iconColor: "bg-primaryOrange",
    },
    {
      title: "Missões",
      value: user?.missoesCompletas || 0,
      icon: Target,
      bgColor: "bg-purple-100",
      iconColor: "bg-secondaryPurple",
    },
    {
      title: "XP Total",
      value: user?.xp || 0,
      icon: Zap,
      bgColor: "bg-yellow-100",
      iconColor: "bg-yellow-500",
    },
    {
      title: "Nível",
      value: user?.nivel || 1,
      icon: Trophy,
      bgColor: "bg-green-100",
      iconColor: "bg-green-500",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card
            key={index}
            className={`border-0 shadow-lg ${card.bgColor} hover:shadow-xl transition-all duration-300 rounded-2xl`}
          >
            <CardContent className="p-4 text-center">
              <div className={`${card.iconColor} w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-darkBlue mb-1">{card.value}</p>
              <p className="text-sm text-gray-600">{card.title}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
