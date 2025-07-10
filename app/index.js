"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import DashboardCards from "@/components/DashboardCards"
import { Sparkles, Target, Users, Zap } from "lucide-react"

const IndexPage = ({ user, onPageChange }) => {
  return (
    <div className="space-y-6">
      {/* Header com boas-vindas */}
      <Card className="border-0 shadow-lg bg-primaryOrange text-white rounded-3xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-4 md:mb-0 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                <img
                  src="/logo-alicerce-round.png"
                  alt="Logo Alicerce"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Olá, {user?.nome}!</h1>
                <p className="text-xl opacity-90">Continue sua jornada de crescimento</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-300" />
                <span className="font-bold">Nível {user?.nivel}</span>
              </div>
              <div className="w-32">
                <Progress value={((user?.xp || 0) / (user?.xpProximoNivel || 1)) * 100} className="h-2 bg-white/20" />
                <p className="text-xs mt-1 opacity-75">
                  {user?.xp}/{user?.xpProximoNivel} XP
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de estatísticas */}
      <DashboardCards user={user} />

      {/* Ações rápidas */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-darkBlue flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primaryOrange" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => onPageChange("missoes")}
              className="bg-primaryOrange hover:bg-orange-600 text-white p-4 h-auto rounded-2xl group transition-all duration-300"
            >
              <div className="text-center">
                <Target className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-semibold">Continuar Missão</p>
                <p className="text-xs opacity-75">Estratégia E-Sports</p>
              </div>
            </Button>

            <Button
              onClick={() => onPageChange("mentorias")}
              className="bg-secondaryPurple hover:bg-purple-700 text-white p-4 h-auto rounded-2xl group transition-all duration-300"
            >
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-semibold">Assistir Mentoria</p>
                <p className="text-xs opacity-75">Próxima disponível</p>
              </div>
            </Button>

            <Button
              onClick={() => onPageChange("bia")}
              className="bg-gradient-to-r from-primaryOrange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 h-auto rounded-2xl group transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-6 h-6 mx-auto mb-2 rounded-full overflow-hidden bg-white/20 group-hover:scale-110 transition-transform">
                  <img
                    src="/bia-avatar.png"
                    alt="BIA"
                    className="w-full h-full object-cover"
                    style={{ backgroundColor: "#D95E28" }}
                  />
                </div>
                <p className="font-semibold">Conversar com BIA</p>
                <p className="text-xs opacity-75">Sua companheira</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default IndexPage
