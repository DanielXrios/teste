"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Target,
  Zap,
  CheckCircle,
  Play,
  Lock,
  MonitorIcon as Mirror,
  FileText,
  User,
  BookOpen,
} from "lucide-react"

const missoes = [
  {
    id: 1,
    titulo: "Missão de Autoestima",
    descricao: "Fale na frente do espelho durante uma semana: 'Eu sou incrível e eu confio em mim'",
    prazo: "7 dias",
    progresso: 0,
    status: "Bloqueada",
    mentorArea: "Autoestima",
    xpRecompensa: 150,
    mentoriaId: 1,
    icon: Mirror,
    detalhes: "Pratique diariamente por 7 dias consecutivos, de preferência pela manhã",
  },
  {
    id: 2,
    titulo: "Missão de Sabotadores",
    descricao: "Faça o teste de sabotadores proposto na mentoria e escreva sobre como pretende lidar com eles",
    prazo: "5 dias",
    progresso: 0,
    status: "Bloqueada",
    mentorArea: "Sabotadores",
    xpRecompensa: 200,
    mentoriaId: 2,
    icon: FileText,
    detalhes: "Complete o teste e elabore um plano de ação personalizado",
  },
  {
    id: 3,
    titulo: "Missão 'Quem eu sou?'",
    descricao: "Faça o teste presente na plataforma para descobrir mais sobre você",
    prazo: "3 dias",
    progresso: 0,
    status: "Bloqueada",
    mentorArea: "Autoconhecimento",
    xpRecompensa: 250,
    mentoriaId: 3,
    icon: User,
    detalhes: "Complete o teste de autoconhecimento disponível na plataforma",
  },
]

export default function MissoesPage({ user, onIniciarMissao }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-darkBlue mb-4">Missões de Desenvolvimento</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Coloque em prática o que aprendeu nas mentorias e acelere seu crescimento pessoal
        </p>
      </div>

      <div className="space-y-4">
        {missoes.map((missao) => {
          const isLiberada = user?.mentoriasAssistidas >= missao.mentoriaId
          const status = isLiberada ? (missao.status === "Bloqueada" ? "Disponível" : missao.status) : "Bloqueada"
          const Icon = missao.icon

          return (
            <Card
              key={missao.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3 mb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isLiberada ? "bg-primaryOrange" : "bg-gray-400"
                          }`}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-darkBlue">{missao.titulo}</h3>
                      </div>
                      <Badge
                        className={`rounded-full text-xs w-fit ${
                          status === "Concluído"
                            ? "bg-green-500 text-white"
                            : status === "Em andamento"
                              ? "bg-primaryOrange text-white"
                              : status === "Disponível"
                                ? "bg-secondaryPurple text-white"
                                : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3 leading-relaxed">{missao.descricao}</p>
                    <p className="text-sm text-gray-500 mb-4 italic">{missao.detalhes}</p>
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Prazo: {missao.prazo}
                      </div>
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        {missao.mentorArea}
                      </div>
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-primaryOrange" />+{missao.xpRecompensa} XP
                      </div>
                    </div>
                  </div>
                </div>

                {isLiberada && (
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Progresso</span>
                      <span className="font-bold text-darkBlue">{missao.progresso}%</span>
                    </div>
                    <Progress value={missao.progresso} className="h-3" />
                  </div>
                )}

                {!isLiberada && (
                  <div className="bg-orange-50 p-4 rounded-xl mb-4">
                    <p className="text-sm text-orange-700 font-medium flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Complete a mentoria "{missao.mentorArea}" para desbloquear esta missão
                    </p>
                  </div>
                )}

                <Button
                  disabled={!isLiberada}
                  onClick={() => {
                    if (status === "Disponível") {
                      onIniciarMissao(missao.id)
                    }
                  }}
                  className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 ${
                    !isLiberada
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : status === "Concluído"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : status === "Em andamento"
                          ? "bg-primaryOrange hover:bg-orange-600 text-white"
                          : "bg-secondaryPurple hover:bg-purple-700 text-white"
                  }`}
                >
                  {!isLiberada ? (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Assista a mentoria "{missao.mentorArea}" primeiro
                    </>
                  ) : status === "Concluído" ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Missão Concluída
                    </>
                  ) : status === "Em andamento" ? (
                    <>
                      <Target className="h-5 w-5 mr-2" />
                      Continuar Missão
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Iniciar Missão
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-purple-50 p-6 rounded-2xl max-w-2xl mx-auto">
        <h3 className="font-bold text-darkBlue mb-3 text-center flex items-center justify-center">
          <Target className="h-5 w-5 mr-2 text-primaryOrange" />
          Jornada de Transformação
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primaryOrange rounded-full flex items-center justify-center">
              <Mirror className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">Autoestima: Fortaleça sua confiança</p>
              <p className="text-xs text-gray-500">Pratique afirmações positivas diariamente</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondaryPurple rounded-full flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">Sabotadores: Identifique limitações</p>
              <p className="text-xs text-gray-500">Conheça e supere seus padrões limitantes</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-darkBlue rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">Autoconhecimento: Descubra seu potencial</p>
              <p className="text-xs text-gray-500">Entenda profundamente quem você é</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
