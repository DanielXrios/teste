"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Clock, CheckCircle, Sparkles, Lock, BookOpen } from "lucide-react"

const TesteDISCPage = ({ user, onIniciarTeste }) => {
  const mentoriasNecessarias = 3
  const mentoriasCompletas = user?.mentoriasAssistidas || 0
  const isBlocked = mentoriasCompletas < mentoriasNecessarias

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-darkBlue mb-4">Teste DISC</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubra seu perfil comportamental através de um teste profissional e preciso
        </p>
      </div>

      <Card className="border-0 shadow-xl max-w-2xl mx-auto rounded-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div
              className={`${isBlocked ? "bg-gray-400" : "bg-primaryOrange"} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              {isBlocked ? <Lock className="h-10 w-10 text-white" /> : <BarChart3 className="h-10 w-10 text-white" />}
            </div>

            {isBlocked && (
              <Badge className="bg-red-100 text-red-700 mb-4 px-4 py-2 rounded-full">
                <Lock className="h-4 w-4 mr-2" />
                Bloqueado - Complete as 3 mentorias primeiro
              </Badge>
            )}

            <h2 className="text-2xl font-bold text-darkBlue mb-4">
              {isBlocked ? "Teste Bloqueado" : "Teste DISC Profissional"}
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {isBlocked
                ? `Você precisa completar as 3 mentorias de desenvolvimento pessoal antes de acessar o teste DISC. Progresso atual: ${mentoriasCompletas}/3 mentorias.`
                : "Descubra seu perfil comportamental através de 30 perguntas estratégicas divididas em 3 etapas."}
            </p>
          </div>

          {isBlocked ? (
            <div className="bg-orange-50 p-6 rounded-2xl mb-6">
              <h3 className="font-bold text-primaryOrange mb-3 flex items-center justify-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Mentorias Necessárias:
              </h3>
              <div className="space-y-3">
                <div
                  className={`flex items-center p-3 rounded-xl ${mentoriasCompletas >= 1 ? "bg-green-100" : "bg-gray-100"}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${mentoriasCompletas >= 1 ? "bg-green-500" : "bg-gray-400"}`}
                  >
                    {mentoriasCompletas >= 1 ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-white text-xs">1</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Autoestima - Bruna Legnaioli</p>
                    <p className="text-xs text-gray-600">Base fundamental para o desenvolvimento</p>
                  </div>
                </div>

                <div
                  className={`flex items-center p-3 rounded-xl ${mentoriasCompletas >= 2 ? "bg-green-100" : "bg-gray-100"}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${mentoriasCompletas >= 2 ? "bg-green-500" : "bg-gray-400"}`}
                  >
                    {mentoriasCompletas >= 2 ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-white text-xs">2</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sabotadores - Angela Mezzetti</p>
                    <p className="text-xs text-gray-600">Supere limitações internas</p>
                  </div>
                </div>

                <div
                  className={`flex items-center p-3 rounded-xl ${mentoriasCompletas >= 3 ? "bg-green-100" : "bg-gray-100"}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${mentoriasCompletas >= 3 ? "bg-green-500" : "bg-gray-400"}`}
                  >
                    {mentoriasCompletas >= 3 ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-white text-xs">3</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Autoconhecimento - Angela Mezzetti</p>
                    <p className="text-xs text-gray-600">Descubra seu verdadeiro potencial</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 p-6 rounded-2xl mb-6">
              <h3 className="font-bold text-darkBlue mb-3 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primaryOrange" />
                Instruções Importantes
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Responda com base no seu comportamento natural no trabalho</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Seja honesto - não há respostas certas ou erradas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Confie na sua primeira impressão ao escolher</span>
                </li>
              </ul>
            </div>
          )}

          <div className="text-center">
            {!isBlocked && (
              <p className="text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 inline mr-1" />
                Tempo estimado: 8-12 minutos • 30 perguntas
              </p>
            )}

            <Button
              onClick={isBlocked ? undefined : onIniciarTeste}
              disabled={isBlocked}
              className={`${
                isBlocked
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primaryOrange hover:bg-orange-600 text-white"
              } px-8 py-3 rounded-2xl text-lg font-semibold`}
            >
              {isBlocked ? (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  Complete as Mentorias Primeiro
                </>
              ) : (
                <>
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Iniciar Teste DISC
                </>
              )}
            </Button>

            {isBlocked && (
              <p className="text-xs text-gray-500 mt-4">
                Faltam {mentoriasNecessarias - mentoriasCompletas} mentorias para desbloquear este teste
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TesteDISCPage
