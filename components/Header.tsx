"use client"
import { Button } from "@/components/ui/button"
import { Menu, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./Sidebar"

interface HeaderProps {
  user: any
  isMobile: boolean
  currentPage: string
  onPageChange: (page: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header({
  user,
  isMobile,
  currentPage,
  onPageChange,
  sidebarOpen,
  setSidebarOpen,
}: HeaderProps) {
  if (!isMobile) return null

  return (
    <div className="bg-primaryOrange p-4 flex items-center justify-between text-white">
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 rounded-xl">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 bg-primaryOrange">
          <Sidebar
            currentPage={currentPage}
            onPageChange={(page) => {
              onPageChange(page)
              setSidebarOpen(false)
            }}
          />
        </SheetContent>
      </Sheet>

      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white/10">
          <img src="/logo-alicerce-round.png" alt="Logo Alicerce" className="w-6 h-6 object-cover rounded-full" />
        </div>
        <h1 className="text-lg font-bold" style={{ fontFamily: "Fredoka, sans-serif" }}>
          Alicerce to School
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <Zap className="h-4 w-4 text-yellow-300" />
        <span className="text-sm font-bold">Nível {user?.nivel}</span>
      </div>
    </div>
  )
}
