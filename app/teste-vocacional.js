"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Clock, Lock, Zap } from "lucide-react"

const TesteVocacionalPage = ({ user, onIniciarTeste }) => {
  const isBlocked = (user?.nivel || 0) < 20

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-darkBlue mb-4">Teste Vocacional</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubra sua área de interesse e receba uma trilha personalizada
        </p>
      </div>

      <Card className="border-0 shadow-xl max-w-2xl mx-auto rounded-2xl">
        <CardContent className="p-8 text-center">
          <div
            className={`${isBlocked ? "bg-gray-400" : "bg-secondaryPurple"} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}
          >
            {isBlocked ? <Lock className="h-10 w-10 text-white" /> : <Award className="h-10 w-10 text-white" />}
          </div>

          {isBlocked && (
            <Badge className="bg-red-100 text-red-700 mb-4 px-4 py-2 rounded-full">
              <Lock className="h-4 w-4 mr-2" />
              Bloqueado - Nível 20 necessário
            </Badge>
          )}

          <h2 className="text-2xl font-bold text-darkBlue mb-4">
            {isBlocked ? "Teste Bloqueado" : "Descubra Sua Vocação"}
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {isBlocked
              ? `Você precisa atingir o nível 20 para desbloquear este teste. Atualmente você está no nível ${user?.nivel || 0}.`
              : "Responda 5 perguntas sobre seus interesses e objetivos para descobrir qual área profissional combina mais com seu perfil."}
          </p>

          {!isBlocked && (
            <div className="bg-blue-50 p-6 rounded-2xl mb-6">
              <h3 className="font-bold text-darkBlue mb-3">O que você descobrirá:</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Sua área de maior afinidade profissional</li>
                <li>• Trilha de aprendizado personalizada</li>
                <li>• Mentorias recomendadas para seu perfil</li>
                <li>• Missões específicas da sua área</li>
              </ul>
            </div>
          )}

          {isBlocked ? (
            <div className="bg-orange-50 p-6 rounded-2xl mb-6">
              <h3 className="font-bold text-primaryOrange mb-3 flex items-center justify-center">
                <Zap className="h-5 w-5 mr-2" />
                Como desbloquear:
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Complete mais mentorias para ganhar XP</li>
                <li>• Finalize missões em andamento</li>
                <li>• Participe ativamente da plataforma</li>
                <li>• Converse com a BIA para dicas de estudo</li>
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-4">
              <Clock className="h-4 w-4 inline mr-1" />
              Tempo estimado: 3-5 minutos • 5 perguntas
            </p>
          )}

          <Button
            onClick={isBlocked ? undefined : onIniciarTeste}
            disabled={isBlocked}
            className={`${
              isBlocked
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-secondaryPurple hover:bg-purple-700 text-white"
            } px-8 py-3 rounded-2xl text-lg font-semibold`}
          >
            {isBlocked ? (
              <>
                <Lock className="h-5 w-5 mr-2" />
                Nível 20 Necessário
              </>
            ) : (
              <>
                <Award className="h-5 w-5 mr-2" />
                Iniciar Teste Vocacional
              </>
            )}
          </Button>

          {isBlocked && (
            <p className="text-xs text-gray-500 mt-4">
              Faltam {20 - (user?.nivel || 0)} níveis para desbloquear este teste
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TesteVocacionalPage
