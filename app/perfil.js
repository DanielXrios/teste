"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Target, Zap, BarChart3, Award, Lock } from "lucide-react"

const PerfilPage = ({ user, onPageChange }) => {
  const isTesteVocacionalBlocked = (user?.nivel || 0) < 20

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-darkBlue mb-4">Meu Perfil</h1>
        <p className="text-gray-600">Acompanhe seu progresso e conquistas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg lg:col-span-1 rounded-2xl">
          <CardContent className="p-6 text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-orange-200">
              <AvatarImage src="/visitante-avatar.png" alt="Visitante" className="object-cover" />
              <AvatarFallback className="bg-primaryOrange text-white text-2xl">V</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-darkBlue mb-2">Visitante</h2>
            <p className="text-gray-600 mb-4">visitante@alicerce.com</p>

            <div className="bg-orange-50 p-4 rounded-2xl mb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-primaryOrange" />
                <span className="font-bold text-darkBlue">Nível {user?.nivel}</span>
              </div>
              <Progress value={((user?.xp || 0) / (user?.xpProximoNivel || 1)) * 100} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">
                {user?.xp}/{user?.xpProximoNivel} XP
              </p>
            </div>

            <div className="space-y-2">
              {user?.perfilDISC && (
                <Badge className="bg-primaryOrange text-white px-3 py-1 w-full rounded-full">
                  DISC: {user.perfilDISC}
                </Badge>
              )}
              {user?.resultadoVocacional ? (
                <Badge className="bg-secondaryPurple text-white px-3 py-1 w-full rounded-full">
                  Vocação: {user.resultadoVocacional}
                </Badge>
              ) : (
                <Badge className="bg-gray-300 text-gray-600 px-3 py-1 w-full rounded-full">
                  <Lock className="h-3 w-3 mr-1" />
                  Vocação: Nível 20 necessário
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg lg:col-span-2 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-darkBlue text-xl">Estatísticas de Progresso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-2xl">
                <div className="bg-primaryOrange w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-darkBlue mb-1">{user?.mentoriasAssistidas}</p>
                <p className="text-sm text-gray-600">Mentorias Assistidas</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-2xl">
                <div className="bg-secondaryPurple w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-darkBlue mb-1">{user?.missoesCompletas}</p>
                <p className="text-sm text-gray-600">Missões Concluídas</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-darkBlue">Testes Realizados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  onClick={() => onPageChange("teste-disc")}
                  variant="outline"
                  className="border-primaryOrange text-primaryOrange hover:bg-orange-50 p-3 h-auto rounded-xl"
                >
                  <div className="text-center">
                    <BarChart3 className="h-5 w-5 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Teste DISC</p>
                    <p className="text-xs opacity-75">
                      {user?.perfilDISC ? `Resultado: ${user.perfilDISC}` : "Não realizado"}
                    </p>
                  </div>
                </Button>

                <Button
                  onClick={() => onPageChange("teste-vocacional")}
                  variant="outline"
                  disabled={isTesteVocacionalBlocked}
                  className={`${
                    isTesteVocacionalBlocked
                      ? "border-gray-300 text-gray-400 cursor-not-allowed"
                      : "border-secondaryPurple text-secondaryPurple hover:bg-purple-50"
                  } p-3 h-auto rounded-xl`}
                >
                  <div className="text-center">
                    {isTesteVocacionalBlocked ? (
                      <Lock className="h-5 w-5 mx-auto mb-2" />
                    ) : (
                      <Award className="h-5 w-5 mx-auto mb-2" />
                    )}
                    <p className="font-semibold text-sm">Teste Vocacional</p>
                    <p className="text-xs opacity-75">
                      {isTesteVocacionalBlocked
                        ? `Nível 20 necessário (atual: ${user?.nivel || 0})`
                        : user?.resultadoVocacional
                          ? `Resultado: ${user.resultadoVocacional}`
                          : "Não realizado"}
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PerfilPage
