"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Send, TrendingUp, Briefcase, Sparkles } from "lucide-react"

const BIAPage = ({ user }) => {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bia",
      message:
        "Oi, aqui é a Bia, sua amiga aqui na plataforma! Estou sempre aqui para te apoiar, dar dicas de estudo, te motivar e conversar sobre seus sonhos profissionais. Conte comigo para tudo! Mas me fala, como você está se sentindo hoje?",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: "user", message: newMessage },
        { sender: "bia", message: getBIAResponse(newMessage) },
      ])
      setNewMessage("")
    }
  }

  const getBIAResponse = (message) => {
    const contextualResponses = [
      `Que orgulho! Você já concluiu ${user?.mentoriasAssistidas || 0} mentorias! Vamos para a próxima juntos?`,
      "Lembre-se: revisar é a chave do sucesso! Que tal darmos uma olhadinha na sua última mentoria?",
      "Dica da Bia: técnica Pomodoro funciona mesmo! 25min focado + 5min de pausa. Vamos tentar?",
      `Olha só que incrível! Você já tem ${user?.xp || 0} XP! Continue assim que logo você sobe de nível!`,
      "Hora do alongamento! Seu corpo e mente merecem esse carinho. Vamos cuidar de você!",
      "Organização é tudo! Que tal criarmos juntos uma agenda de estudos que funcione para você?",
      "Sabia que estudar em grupo pode aumentar sua retenção em até 90%? Que tal encontrar uns colegas?",
      "Pequenas vitórias, grandes conquistas! Cada passo conta na sua jornada. Estou orgulhosa de você!",
      "Hidratação é fundamental! Beba água e mantenha-se saudável enquanto estuda!",
      "Conte para a Bia: qual área profissional mais te emociona? Posso te dar dicas especiais!",
      "Você é incrível e eu acredito muito no seu potencial! Vamos conquistar seus sonhos juntos!",
      "Lembra: eu estou sempre aqui para você! Seja para estudar, desabafar ou comemorar suas conquistas!",
    ]
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)]
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-darkBlue mb-4">
          BIA - Sua Companheira em sua Jornada de Desenvolvimento
        </h1>
        <p className="text-gray-600">Sua parceira para estudos, motivação e crescimento pessoal</p>
      </div>

      <Card className="border-0 shadow-xl max-w-4xl mx-auto rounded-2xl">
        <CardContent className="p-0 h-[500px] flex flex-col">
          <div className="bg-primaryOrange p-6 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primaryOrange border-3 border-white/30 shadow-lg">
                <img
                  src="/bia-avatar.png"
                  alt="BIA - Sua companheira de desenvolvimento"
                  className="w-full h-full object-cover"
                  style={{ backgroundColor: "#D95E28" }}
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">BIA</h3>
                <p className="text-sm opacity-75">Sua companheira de desenvolvimento</p>
              </div>
              <div className="ml-auto">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-primaryOrange text-white"
                      : "bg-orange-50 text-darkBlue border border-orange-200"
                  }`}
                >
                  {msg.sender === "bia" && (
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-primaryOrange border border-white/30 mr-2">
                        <img
                          src="/bia-avatar.png"
                          alt="BIA"
                          className="w-full h-full object-cover"
                          style={{ backgroundColor: "#D95E28" }}
                        />
                      </div>
                      <span className="font-semibold text-sm">BIA</span>
                      <Heart className="h-3 w-3 ml-1 text-primaryOrange" />
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Conte tudo para a Bia..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 rounded-2xl border-gray-300 focus:border-primaryOrange"
              />
              <Button
                onClick={sendMessage}
                className="bg-primaryOrange hover:bg-orange-600 text-white rounded-2xl px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg bg-orange-50 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-primaryOrange w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-bold text-darkBlue text-sm">Dicas de Estudo</h3>
            </div>
            <p className="text-xs text-gray-700">
              "Bia, como melhorar minha concentração?" ou "Me ajuda a criar um cronograma?"
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-blue-50 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-darkBlue w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-bold text-darkBlue text-sm">Orientação Profissional</h3>
            </div>
            <p className="text-xs text-gray-700">
              "Que carreira combina comigo?" ou "Bia, como me preparar para o mercado?"
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-orange-50 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-primaryOrange w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-bold text-darkBlue text-sm">Apoio e Motivação</h3>
            </div>
            <p className="text-xs text-gray-700">"Estou desmotivado, Bia" ou "Preciso de uma palavra amiga"</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl max-w-2xl mx-auto border border-orange-200">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-primaryOrange border-4 border-white shadow-lg mx-auto mb-4">
            <img
              src="/bia-avatar.png"
              alt="BIA"
              className="w-full h-full object-cover"
              style={{ backgroundColor: "#D95E28" }}
            />
          </div>
          <h3 className="font-bold text-darkBlue mb-2 flex items-center justify-center">
            <Heart className="h-5 w-5 mr-2 text-primaryOrange" />
            Sua Companheira BIA Está Sempre Aqui!
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            "Oi! Sou a Bia e estou aqui para ser sua companheira nesta jornada incrível de desenvolvimento! Pode contar
            comigo para tudo: estudos, motivação, desabafos ou só para bater um papo. Juntos, vamos conquistar todos os
            seus objetivos!"
          </p>
        </div>
      </div>
    </div>
  )
}

export default BIAPage
