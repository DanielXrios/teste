"use client"
import { useState, useEffect } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import PupilaComponent from "@/components/PupilaComponent"
import React from "react"

// Importar páginas
import IndexPage from "./index.js"
import MentoriasPage from "./mentorias.js"
import MissoesPage from "./missoes.js"
import TesteDISCPage from "./teste-disc.js"
import TesteVocacionalPage from "./teste-vocacional.js"
import PerfilPage from "./perfil.js"
import BIAPage from "./bia.js"

type Page = "inicio" | "mentorias" | "missoes" | "teste-disc" | "teste-vocacional" | "perfil" | "bia"

interface UserType {
  id: string
  nome: string
  email: string
  nivel: number
  xp: number
  xpProximoNivel: number
  mentoriasAssistidas: number
  missoesCompletas: number
  perfilDISC?: string
  resultadoVocacional?: string
  mentoriasLiberadas: number[]
}

interface Mentor {
  id: number
  nome: string
  area: string
  tempo: string
  avaliacao: number
  participantes: number
  foto: string
  cor: string
  empresa?: string
  palavraChave: string
  liberada: boolean
}

interface Missao {
  id: number
  titulo: string
  descricao: string
  prazo: string
  progresso: number
  status: "Bloqueada" | "Em andamento" | "Concluído" | "Disponível"
  mentorArea: string
  xpRecompensa: number
  mentoriaId: number
}

const mentores: Mentor[] = [
  {
    id: 1,
    nome: "Equipe AMD E-Sports",
    area: "E-Sports",
    empresa: "AMD",
    tempo: "45 min",
    avaliacao: 4.9,
    participantes: 234,
    foto: "/placeholder.svg?height=80&width=80",
    cor: "#8B5CF6",
    palavraChave: "ESTRATEGIA",
    liberada: true,
  },
  {
    id: 2,
    nome: "Vanessa Braga",
    area: "Contabilidade",
    tempo: "50 min",
    avaliacao: 4.8,
    participantes: 189,
    foto: "/placeholder.svg?height=80&width=80",
    cor: "#F97316",
    palavraChave: "BALANCO",
    liberada: false,
  },
  {
    id: 3,
    nome: "Stefanie Shimoze",
    area: "Empreendedorismo Feminino",
    tempo: "40 min",
    avaliacao: 4.9,
    participantes: 156,
    foto: "/placeholder.svg?height=80&width=80",
    cor: "#EC4899",
    palavraChave: "LIDERANCA",
    liberada: false,
  },
  {
    id: 4,
    nome: "Renan Oliveira",
    area: "Design",
    tempo: "60 min",
    avaliacao: 4.8,
    participantes: 203,
    foto: "/placeholder.svg?height=80&width=80",
    cor: "#06B6D4",
    palavraChave: "CRIATIVIDADE",
    liberada: false,
  },
]

const missoes: Missao[] = [
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
  },
]

const testeDISCCompleto = {
  rodadas: [
    {
      rodada: 1,
      titulo: "Rodada 1 - O que MAIS representa você",
      tipoEscolha: "Mais",
      instrucao: "Para cada pergunta, escolha a alternativa que MAIS se parece com você:",
      perguntas: [
        {
          index: 1,
          texto: "De um modo geral as pessoas me acham:",
          opcoes: [
            { id: "a", texto: "Muito prático e objetivo", perfil: "D" },
            { id: "b", texto: "Sentimental e apoiador", perfil: "S" },
            { id: "c", texto: "Racionalizador e sistemático", perfil: "C" },
            { id: "d", texto: "Diferente, com dificuldade de ser entendido", perfil: "I" },
          ],
        },
        {
          index: 2,
          texto: "Num confronto de opiniões, eu:",
          opcoes: [
            { id: "a", texto: "Consigo empatizar", perfil: "S" },
            { id: "b", texto: "Consigo pequenos acordos rápidos, antes das grandes objeções", perfil: "I" },
            { id: "c", texto: "Encadeio ideias, estabelecendo talvez um novo conceito", perfil: "I" },
            { id: "d", texto: "Mantenho a minha, fazendo com que os argumentos sejam lógicos", perfil: "C" },
          ],
        },
        {
          index: 3,
          texto: "Satisfação pessoal para mim é:",
          opcoes: [
            { id: "a", texto: "Desenvolver alternativas inovadoras que possam ser aplicadas", perfil: "I" },
            { id: "b", texto: "Atingir resultados acima do esperado", perfil: "D" },
            { id: "c", texto: "Fazer com que o sentimento de todos seja de harmonia e de construção", perfil: "S" },
            { id: "d", texto: "Solucionar problemas de formas organizadas e planejadas", perfil: "C" },
          ],
        },
        {
          index: 4,
          texto: "Num trabalho em equipe, o importante para mim é:",
          opcoes: [
            { id: "a", texto: "Motivar e estimular a interação", perfil: "I" },
            { id: "b", texto: "A sistemática do processo e a função de cada um", perfil: "C" },
            { id: "c", texto: "Que o resultado seja positivo", perfil: "D" },
            { id: "d", texto: "Que haja criatividade e busca de novas formas de fazer as atividades", perfil: "I" },
          ],
        },
        {
          index: 5,
          texto: "Influencio pessoas quando:",
          opcoes: [
            { id: "a", texto: "Faço os outros agirem estabelecendo uma visão compartilhada", perfil: "I" },
            {
              id: "b",
              texto: "Ofereço planos lógicos, detalhados sobre uma tarefa que precisa ser feita",
              perfil: "C",
            },
            { id: "c", texto: "Uso metáforas e imagens de um futuro melhor", perfil: "I" },
            { id: "d", texto: "Sou objetivo e vou direto ao assunto", perfil: "D" },
          ],
        },
        {
          index: 6,
          texto: "Ao comunicar-me com outras pessoas, é provável que eu:",
          opcoes: [
            { id: "a", texto: "Ache interessante pessoas com alto grau de originalidade e criatividade", perfil: "I" },
            {
              id: "b",
              texto: "Perca a noção de tempo, quando as pessoas se comuniquem de forma sistemática e lógica",
              perfil: "C",
            },
            { id: "c", texto: "Ache estimulante as pessoas empáticas", perfil: "S" },
            {
              id: "d",
              texto: "Tenha interesse quando as pessoas são objetivas e as decisões são tomadas rápidas",
              perfil: "D",
            },
          ],
        },
        {
          index: 7,
          texto: "Sinto-me satisfeito quando os outros me veem como:",
          opcoes: [
            { id: "a", texto: "Uma pessoa realizadora e pró-ativa", perfil: "D" },
            { id: "b", texto: "Uma pessoa intelectual de vasta cultura e visão de futuro", perfil: "I" },
            { id: "c", texto: "Alguém focado em metas e objetivos e sabe como chegar lá", perfil: "D" },
            { id: "d", texto: "Amigo e preocupado na manutenção das relações", perfil: "S" },
          ],
        },
        {
          index: 8,
          texto: "Ao me relacionar com as pessoas eu valorizo:",
          opcoes: [
            { id: "a", texto: "Intuição, criatividade e inovação", perfil: "I" },
            { id: "b", texto: "Segurança, conhecimento", perfil: "C" },
            { id: "c", texto: "Respeito humano, harmonia e paz", perfil: "S" },
            { id: "d", texto: "Resultado, cumprimento de metas", perfil: "D" },
          ],
        },
        {
          index: 9,
          texto: "Quando estou sob pressão, eu geralmente:",
          opcoes: [
            { id: "a", texto: "Tomo decisões rápidas e diretas para resolver a situação", perfil: "D" },
            { id: "b", texto: "Procuro analisar todas as informações antes de agir", perfil: "C" },
            { id: "c", texto: "Busco apoio e opiniões de outras pessoas", perfil: "S" },
            { id: "d", texto: "Encontro soluções criativas que fogem do convencional", perfil: "I" },
          ],
        },
        {
          index: 10,
          texto: "Em um ambiente novo, eu normalmente:",
          opcoes: [
            { id: "a", texto: "Tomo a iniciativa e me apresento às pessoas", perfil: "D" },
            { id: "b", texto: "Observo e analiso a situação antes de interagir", perfil: "C" },
            { id: "c", texto: "Procuro ser acolhedor e fazer com que todos se sintam bem", perfil: "S" },
            { id: "d", texto: "Busco entender como posso contribuir com ideias diferentes", perfil: "I" },
          ],
        },
      ],
    },
    {
      rodada: 2,
      titulo: "Rodada 2 - O que MENOS representa você",
      tipoEscolha: "Menos",
      instrucao: "Para cada pergunta, escolha a alternativa que MENOS se parece com você:",
      perguntas: [
        {
          index: 1,
          texto: "De um modo geral as pessoas me acham:",
          opcoes: [
            { id: "a", texto: "Muito prático e objetivo", perfil: "D" },
            { id: "b", texto: "Sentimental e apoiador", perfil: "S" },
            { id: "c", texto: "Racionalizador e sistemático", perfil: "C" },
            { id: "d", texto: "Diferente, com dificuldade de ser entendido", perfil: "I" },
          ],
        },
        {
          index: 2,
          texto: "Num confronto de opiniões, eu:",
          opcoes: [
            { id: "a", texto: "Consigo empatizar", perfil: "S" },
            { id: "b", texto: "Consigo pequenos acordos rápidos, antes das grandes objeções", perfil: "I" },
            { id: "c", texto: "Encadeio ideias, estabelecendo talvez um novo conceito", perfil: "I" },
            { id: "d", texto: "Mantenho a minha, fazendo com que os argumentos sejam lógicos", perfil: "C" },
          ],
        },
        {
          index: 3,
          texto: "Satisfação pessoal para mim é:",
          opcoes: [
            { id: "a", texto: "Desenvolver alternativas inovadoras que possam ser aplicadas", perfil: "I" },
            { id: "b", texto: "Atingir resultados acima do esperado", perfil: "D" },
            { id: "c", texto: "Fazer com que o sentimento de todos seja de harmonia e de construção", perfil: "S" },
            { id: "d", texto: "Solucionar problemas de formas organizadas e planejadas", perfil: "C" },
          ],
        },
        {
          index: 4,
          texto: "Num trabalho em equipe, o importante para mim é:",
          opcoes: [
            { id: "a", texto: "Motivar e estimular a interação", perfil: "I" },
            { id: "b", texto: "A sistemática do processo e a função de cada um", perfil: "C" },
            { id: "c", texto: "Que o resultado seja positivo", perfil: "D" },
            { id: "d", texto: "Que haja criatividade e busca de novas formas de fazer as atividades", perfil: "I" },
          ],
        },
        {
          index: 5,
          texto: "Influencio pessoas quando:",
          opcoes: [
            { id: "a", texto: "Faço os outros agirem estabelecendo uma visão compartilhada", perfil: "I" },
            {
              id: "b",
              texto: "Ofereço planos lógicos, detalhados sobre uma tarefa que precisa ser feita",
              perfil: "C",
            },
            { id: "c", texto: "Uso metáforas e imagens de um futuro melhor", perfil: "I" },
            { id: "d", texto: "Sou objetivo e vou direto ao assunto", perfil: "D" },
          ],
        },
        {
          index: 6,
          texto: "Ao comunicar-me com outras pessoas, é provável que eu:",
          opcoes: [
            { id: "a", texto: "Ache interessante pessoas com alto grau de originalidade e criatividade", perfil: "I" },
            {
              id: "b",
              texto: "Perca a noção de tempo, quando as pessoas se comuniquem de forma sistemática e lógica",
              perfil: "C",
            },
            { id: "c", texto: "Ache estimulante as pessoas empáticas", perfil: "S" },
            {
              id: "d",
              texto: "Tenha interesse quando as pessoas são objetivas e as decisões são tomadas rápidas",
              perfil: "D",
            },
          ],
        },
        {
          index: 7,
          texto: "Sinto-me satisfeito quando os outros me veem como:",
          opcoes: [
            { id: "a", texto: "Uma pessoa realizadora e pró-ativa", perfil: "D" },
            { id: "b", texto: "Uma pessoa intelectual de vasta cultura e visão de futuro", perfil: "I" },
            { id: "c", texto: "Alguém focado em metas e objetivos e sabe como chegar lá", perfil: "D" },
            { id: "d", texto: "Amigo e preocupado na manutenção das relações", perfil: "S" },
          ],
        },
        {
          index: 8,
          texto: "Ao me relacionar com as pessoas eu valorizo:",
          opcoes: [
            { id: "a", texto: "Intuição, criatividade e inovação", perfil: "I" },
            { id: "b", texto: "Segurança, conhecimento", perfil: "C" },
            { id: "c", texto: "Respeito humano, harmonia e paz", perfil: "S" },
            { id: "d", texto: "Resultado, cumprimento de metas", perfil: "D" },
          ],
        },
        {
          index: 9,
          texto: "Quando estou sob pressão, eu geralmente:",
          opcoes: [
            { id: "a", texto: "Tomo decisões rápidas e diretas para resolver a situação", perfil: "D" },
            { id: "b", texto: "Procuro analisar todas as informações antes de agir", perfil: "C" },
            { id: "c", texto: "Busco apoio e opiniões de outras pessoas", perfil: "S" },
            { id: "d", texto: "Encontro soluções criativas que fogem do convencional", perfil: "I" },
          ],
        },
        {
          index: 10,
          texto: "Em um ambiente novo, eu normalmente:",
          opcoes: [
            { id: "a", texto: "Tomo a iniciativa e me apresento às pessoas", perfil: "D" },
            { id: "b", texto: "Observo e analiso a situação antes de interagir", perfil: "C" },
            { id: "c", texto: "Procuro ser acolhedor e fazer com que todos se sintam bem", perfil: "S" },
            { id: "d", texto: "Busco entender como posso contribuir com ideias diferentes", perfil: "I" },
          ],
        },
      ],
    },
    {
      rodada: 3,
      titulo: "Rodada 3 - O que você demonstra POUCO",
      tipoEscolha: "Pouco",
      instrucao: "Para cada pergunta, escolha a alternativa que você demonstra POUCO no seu dia a dia:",
      perguntas: [
        {
          index: 1,
          texto: "De um modo geral as pessoas me acham:",
          opcoes: [
            { id: "a", texto: "Muito prático e objetivo", perfil: "D" },
            { id: "b", texto: "Sentimental e apoiador", perfil: "S" },
            { id: "c", texto: "Racionalizador e sistemático", perfil: "C" },
            { id: "d", texto: "Diferente, com dificuldade de ser entendido", perfil: "I" },
          ],
        },
        {
          index: 2,
          texto: "Num confronto de opiniões, eu:",
          opcoes: [
            { id: "a", texto: "Consigo empatizar", perfil: "S" },
            { id: "b", texto: "Consigo pequenos acordos rápidos, antes das grandes objeções", perfil: "I" },
            { id: "c", texto: "Encadeio ideias, estabelecendo talvez um novo conceito", perfil: "I" },
            { id: "d", texto: "Mantenho a minha, fazendo com que os argumentos sejam lógicos", perfil: "C" },
          ],
        },
        {
          index: 3,
          texto: "Satisfação pessoal para mim é:",
          opcoes: [
            { id: "a", texto: "Desenvolver alternativas inovadoras que possam ser aplicadas", perfil: "I" },
            { id: "b", texto: "Atingir resultados acima do esperado", perfil: "D" },
            { id: "c", texto: "Fazer com que o sentimento de todos seja de harmonia e de construção", perfil: "S" },
            { id: "d", texto: "Solucionar problemas de formas organizadas e planejadas", perfil: "C" },
          ],
        },
        {
          index: 4,
          texto: "Num trabalho em equipe, o importante para mim é:",
          opcoes: [
            { id: "a", texto: "Motivar e estimular a interação", perfil: "I" },
            { id: "b", texto: "A sistemática do processo e a função de cada um", perfil: "C" },
            { id: "c", texto: "Que o resultado seja positivo", perfil: "D" },
            { id: "d", texto: "Que haja criatividade e busca de novas formas de fazer as atividades", perfil: "I" },
          ],
        },
        {
          index: 5,
          texto: "Influencio pessoas quando:",
          opcoes: [
            { id: "a", texto: "Faço os outros agirem estabelecendo uma visão compartilhada", perfil: "I" },
            {
              id: "b",
              texto: "Ofereço planos lógicos, detalhados sobre uma tarefa que precisa ser feita",
              perfil: "C",
            },
            { id: "c", texto: "Uso metáforas e imagens de um futuro melhor", perfil: "I" },
            { id: "d", texto: "Sou objetivo e vou direto ao assunto", perfil: "D" },
          ],
        },
        {
          index: 6,
          texto: "Ao comunicar-me com outras pessoas, é provável que eu:",
          opcoes: [
            { id: "a", texto: "Ache interessante pessoas com alto grau de originalidade e criatividade", perfil: "I" },
            {
              id: "b",
              texto: "Perca a noção de tempo, quando as pessoas se comuniquem de forma sistemática e lógica",
              perfil: "C",
            },
            { id: "c", texto: "Ache estimulante as pessoas empáticas", perfil: "S" },
            {
              id: "d",
              texto: "Tenha interesse quando as pessoas são objetivas e as decisões são tomadas rápidas",
              perfil: "D",
            },
          ],
        },
        {
          index: 7,
          texto: "Sinto-me satisfeito quando os outros me veem como:",
          opcoes: [
            { id: "a", texto: "Uma pessoa realizadora e pró-ativa", perfil: "D" },
            { id: "b", texto: "Uma pessoa intelectual de vasta cultura e visão de futuro", perfil: "I" },
            { id: "c", texto: "Alguém focado em metas e objetivos e sabe como chegar lá", perfil: "D" },
            { id: "d", texto: "Amigo e preocupado na manutenção das relações", perfil: "S" },
          ],
        },
        {
          index: 8,
          texto: "Ao me relacionar com as pessoas eu valorizo:",
          opcoes: [
            { id: "a", texto: "Intuição, criatividade e inovação", perfil: "I" },
            { id: "b", texto: "Segurança, conhecimento", perfil: "C" },
            { id: "c", texto: "Respeito humano, harmonia e paz", perfil: "S" },
            { id: "d", texto: "Resultado, cumprimento de metas", perfil: "D" },
          ],
        },
        {
          index: 9,
          texto: "Quando estou sob pressão, eu geralmente:",
          opcoes: [
            { id: "a", texto: "Tomo decisões rápidas e diretas para resolver a situação", perfil: "D" },
            { id: "b", texto: "Procuro analisar todas as informações antes de agir", perfil: "C" },
            { id: "c", texto: "Busco apoio e opiniões de outras pessoas", perfil: "S" },
            { id: "d", texto: "Encontro soluções criativas que fogem do convencional", perfil: "I" },
          ],
        },
        {
          index: 10,
          texto: "Em um ambiente novo, eu normalmente:",
          opcoes: [
            { id: "a", texto: "Tomo a iniciativa e me apresento às pessoas", perfil: "D" },
            { id: "b", texto: "Observo e analiso a situação antes de interagir", perfil: "C" },
            { id: "c", texto: "Procuro ser acolhedor e fazer com que todos se sintam bem", perfil: "S" },
            { id: "d", texto: "Busco entender como posso contribuir com ideias diferentes", perfil: "I" },
          ],
        },
      ],
    },
  ],
}

const perguntasVocacional = [
  {
    id: 1,
    pergunta: "Qual área mais desperta seu interesse?",
    opcoes: ["Tecnologia e Inovação", "Negócios e Gestão", "Saúde e Bem-estar", "Arte e Comunicação"],
  },
  {
    id: 2,
    pergunta: "Como você prefere aprender?",
    opcoes: ["Praticando e experimentando", "Liderando projetos", "Ajudando outras pessoas", "Criando e expressando"],
  },
  {
    id: 3,
    pergunta: "Qual ambiente de trabalho te atrai mais?",
    opcoes: [
      "Laboratório ou escritório de tecnologia",
      "Sala de reuniões e negociações",
      "Hospital, clínica ou centro de cuidados",
      "Estúdio criativo ou agência",
    ],
  },
  {
    id: 4,
    pergunta: "O que mais te motiva no trabalho?",
    opcoes: [
      "Resolver problemas complexos",
      "Liderar equipes e projetos",
      "Cuidar e ajudar pessoas",
      "Expressar criatividade",
    ],
  },
  {
    id: 5,
    pergunta: "Qual conquista te deixaria mais orgulhoso?",
    opcoes: [
      "Criar uma inovação tecnológica",
      "Construir um negócio de sucesso",
      "Salvar vidas ou melhorar a saúde",
      "Criar arte que impacte pessoas",
    ],
  },
]

const perguntasDISC = [
  {
    id: 1,
    pergunta: "Qual das seguintes características melhor descreve você?",
    opcoes: ["Dominante", "Influente", "Estável", "Conformista"],
  },
  {
    id: 2,
    pergunta: "Em um ambiente de trabalho, você prefere ser:",
    opcoes: ["Direto e objetivo", "Entusiasmado e persuasivo", "Paciente e cooperativo", "Preciso e organizado"],
  },
  {
    id: 3,
    pergunta: "Como você lida com desafios?",
    opcoes: [
      "Assumindo o controle",
      "Inspirando outros a agir",
      "Mantendo a calma e a estabilidade",
      "Analisando os detalhes",
    ],
  },
  {
    id: 4,
    pergunta: "O que é mais importante para você em um projeto?",
    opcoes: [
      "Alcançar resultados",
      "Criar um ambiente positivo",
      "Garantir a harmonia da equipe",
      "Seguir os procedimentos",
    ],
  },
  {
    id: 5,
    pergunta: "Qual é o seu maior medo?",
    opcoes: ["Perder o controle", "Ser ignorado", "Causar conflitos", "Cometer erros"],
  },
]

// Adicione esta função após as importações e before o componente principal
const formatarTextoOpcao = (texto: string, isPortrait: boolean, isMobile: boolean): React.ReactNode => {
  if (!isPortrait || !isMobile) {
    return texto
  }

  // Quebras estratégicas para modo portrait
  const textoFormatado = texto
    .replace(/,\s+/g, ",\n")
    .replace(/\s+quando\s+/g, "\nquando ")
    .replace(/\s+sobre\s+/g, "\nsobre ")
    .replace(/\s+que\s+/g, "\nque ")
    .replace(/\s+de\s+forma\s+/g, "\nde forma ")
    .replace(/\s+e\s+/g, "\ne ")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  return textoFormatado.map((linha, index) => (
    <React.Fragment key={index}>
      {linha}
      {index < textoFormatado.length - 1 && <br />}
    </React.Fragment>
  ))
}

// Componente do Cachorro Caramelo (novo mascote)
// const PupilaComponent = () => (
//   <div className="fixed bottom-4 right-4 z-50 animate-bounce">
//     <div className="relative">
//       <div className="bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 p-2 rounded-full shadow-2xl border-4 border-white">
//         <img src="/pupila.png" alt="Pupila - Mascote Alicerce" className="w-12 h-12 object-contain" />
//       </div>
//       {/* Balão de pensamento ocasional */}
//       <div className="absolute -top-16 -left-20 bg-white p-2 rounded-lg shadow-lg text-xs text-gray-700 opacity-0 animate-pulse">
//         Você consegue! 🐕
//       </div>
//     </div>
//   </div>
// )

// No início do componente, após os imports, adicione a detecção de orientação:
// const [isPortrait, setIsPortrait] = useState(false)

const initialUser: UserType = {
  id: "1",
  nome: "Visitante",
  email: "visitante@alicerce.com",
  nivel: 3,
  xp: 750,
  xpProximoNivel: 1000,
  mentoriasAssistidas: 0, // Começar sem mentorias assistidas
  missoesCompletas: 0,
  mentoriasLiberadas: [],
}

export default function AlicercePlatform() {
  const [currentPage, setCurrentPage] = useState<Page>("inicio")
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<UserType>(initialUser)

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleAssistirMentoria = (mentorId: number) => {
    setUser((prevUser) => {
      const newMentoriasAssistidas = Math.max(prevUser.mentoriasAssistidas, mentorId)
      const newXP = prevUser.xp + 100 // Ganhar 100 XP por mentoria
      const newMentoriasLiberadas = [...prevUser.mentoriasLiberadas]

      // Liberar próxima mentoria
      if (mentorId < 3 && !newMentoriasLiberadas.includes(mentorId + 1)) {
        newMentoriasLiberadas.push(mentorId + 1)
      }

      return {
        ...prevUser,
        mentoriasAssistidas: newMentoriasAssistidas,
        xp: newXP,
        mentoriasLiberadas: newMentoriasLiberadas,
      }
    })

    alert(`Mentoria ${mentorId} assistida! Você ganhou 100 XP e liberou uma nova missão!`)
  }

  const handleIniciarMissao = (missaoId: number) => {
    const missao = missoes.find((m) => m.id === missaoId)
    if (missao) {
      alert(`Missão "${missao.titulo}" iniciada! Boa sorte na sua jornada de desenvolvimento!`)
    }
  }

  const handleIniciarTesteDISC = () => {
    if (user.mentoriasAssistidas < 3) {
      alert(`Você precisa completar as 3 mentorias primeiro. Progresso atual: ${user.mentoriasAssistidas}/3`)
      return
    }
    alert("Teste DISC iniciado!")
  }

  const handleIniciarTesteVocacional = () => {
    if (user.nivel < 20) {
      alert(`Você precisa atingir o nível 20 para acessar este teste. Nível atual: ${user.nivel}`)
      return
    }
    alert("Teste Vocacional iniciado!")
  }

  const renderPage = () => {
    switch (currentPage) {
      case "inicio":
        return <IndexPage user={user} onPageChange={setCurrentPage} />
      case "mentorias":
        return <MentoriasPage user={user} onAssistirMentoria={handleAssistirMentoria} />
      case "missoes":
        return <MissoesPage user={user} onIniciarMissao={handleIniciarMissao} />
      case "teste-disc":
        return <TesteDISCPage user={user} onIniciarTeste={handleIniciarTesteDISC} />
      case "teste-vocacional":
        return <TesteVocacionalPage user={user} onIniciarTeste={handleIniciarTesteVocacional} />
      case "perfil":
        return <PerfilPage user={user} onPageChange={setCurrentPage} />
      case "bia":
        return <BIAPage user={user} />
      default:
        return <IndexPage user={user} onPageChange={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Layout */}
      {isMobile ? (
        <div className="flex flex-col h-screen">
          <Header
            user={user}
            isMobile={isMobile}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="flex-1 p-4 overflow-y-auto">{renderPage()}</div>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="flex h-screen">
          <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          <div className="flex-1 ml-64 lg:ml-72 p-8 overflow-y-auto">{renderPage()}</div>
        </div>
      )}

      {/* Pupila - Mascote */}
      <PupilaComponent />
    </div>
  )
}
