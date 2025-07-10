"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Star, Play, Lock, BookOpen, CheckCircle, Users } from "lucide-react"

const mentores = [
  {
    id: 1,
    nome: "Bruna Legnaioli",
    area: "Autoestima",
    tempo: "35 min",
    avaliacao: 4.9,
    participantes: 156,
    foto: "/angela-mezzetti.png", // Trocada: agora Bruna usa a foto da Angela
    cor: "#D95E28",
    palavraChave: "AUTOESTIMA",
    liberada: true,
    descricao: "Desenvolva uma autoestima sólida e aprenda a valorizar suas qualidades únicas",
  },
  {
    id: 2,
    nome: "Angela Mezzetti",
    area: "Sabotadores",
    tempo: "40 min",
    avaliacao: 4.8,
    participantes: 203,
    foto: "/bruna-legnaioli.png", // Trocada: agora Angela usa a foto da Bruna
    cor: "#A837A8",
    palavraChave: "SABOTADORES",
    liberada: false,
    descricao: "Identifique e supere os padrões mentais que limitam seu potencial",
  },
  {
    id: 3,
    nome: "Angela Mezzetti",
    area: "Autoconhecimento",
    tempo: "45 min",
    avaliacao: 4.9,
    participantes: 189,
    foto: "/bruna-legnaioli.png", // Mantém a mesma foto da Angela (que agora é a da Bruna)
    cor: "#203A54",
    palavraChave: "AUTOCONHECIMENTO",
    liberada: false,
    descricao: "Descubra quem você realmente é e qual seu propósito de vida",
  },
]

export default function MentoriasPage({ user, onAssistirMentoria }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-darkBlue mb-4">Mentorias</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Jornada de desenvolvimento pessoal com especialistas renomadas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {mentores.map((mentor, index) => {
          const isLiberada = mentor.liberada || user?.mentoriasLiberadas?.includes(mentor.id - 1)
          const jaAssistida = user?.mentoriasAssistidas >= mentor.id

          return (
            <Card
              key={mentor.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden rounded-2xl"
            >
              <div className="h-1" style={{ backgroundColor: mentor.cor }} />
              <CardContent className="p-6">
                {/* Header com foto e info básica */}
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-12 w-12 ring-2 ring-gray-100 flex-shrink-0">
                    <AvatarImage src={mentor.foto || "/placeholder.svg"} alt={mentor.nome} className="object-cover" />
                    <AvatarFallback
                      style={{ backgroundColor: mentor.cor, color: "white" }}
                      className="text-sm font-semibold"
                    >
                      {mentor.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-darkBlue mb-1 truncate">{mentor.nome}</h3>
                    <Badge
                      style={{ backgroundColor: mentor.cor, color: "white" }}
                      className="mb-2 rounded-full text-xs font-medium"
                    >
                      {mentor.area}
                    </Badge>

                    {jaAssistida && (
                      <div className="flex items-center text-green-600 text-xs font-medium">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Concluída
                      </div>
                    )}
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{mentor.descricao}</p>

                {/* Métricas */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {mentor.tempo}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {mentor.avaliacao}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {mentor.participantes}
                  </div>
                </div>

                {/* Status de bloqueio */}
                {!isLiberada && (
                  <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl mb-4">
                    <p className="text-xs text-orange-700 font-medium flex items-center">
                      <Lock className="h-3 w-3 mr-2" />
                      Complete a mentoria anterior para desbloquear
                    </p>
                  </div>
                )}

                {/* Botão de ação */}
                <Button
                  onClick={() => onAssistirMentoria(mentor.id)}
                  disabled={!isLiberada}
                  className={`w-full rounded-xl font-medium transition-all duration-300 ${
                    !isLiberada
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200"
                      : jaAssistida
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "text-white hover:scale-[1.02]"
                  }`}
                  style={isLiberada && !jaAssistida ? { backgroundColor: mentor.cor } : {}}
                >
                  {!isLiberada ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Bloqueada
                    </>
                  ) : jaAssistida ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Assistir Novamente
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Assistir Mentoria
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="bg-orange-50 p-6 rounded-2xl max-w-2xl mx-auto border border-orange-100">
        <h3 className="font-bold text-darkBlue mb-4 text-center flex items-center justify-center">
          <BookOpen className="h-5 w-5 mr-2 text-primaryOrange" />
          Sequência de Aprendizado
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primaryOrange rounded-full flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <div>
              <p className="font-semibold text-darkBlue text-sm">Autoestima</p>
              <p className="text-xs text-gray-600">Base fundamental para o desenvolvimento pessoal</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondaryPurple rounded-full flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <div>
              <p className="font-semibold text-darkBlue text-sm">Sabotadores</p>
              <p className="text-xs text-gray-600">Identifique e supere limitações internas</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-darkBlue rounded-full flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
            <div>
              <p className="font-semibold text-darkBlue text-sm">Autoconhecimento</p>
              <p className="text-xs text-gray-600">Descubra seu verdadeiro potencial</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Complete as mentorias em sequência para desbloquear o Teste DISC
        </p>
      </div>
    </div>
  )
}
