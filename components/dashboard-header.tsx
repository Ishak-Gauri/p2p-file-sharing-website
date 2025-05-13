"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

export default function DashboardHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 py-4">
                <Link href="/" className="text-lg font-semibold">
                  Dashboard
                </Link>
                <Link href="/data-sources" className="text-lg font-semibold">
                  Data Sources
                </Link>
                <Link href="/processing" className="text-lg font-semibold">
                  Processing
                </Link>
                <Link href="/analytics" className="text-lg font-semibold">
                  Analytics
                </Link>
                <Link href="/settings" className="text-lg font-semibold">
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-royal-blue text-white">
              <span className="font-bold">RT</span>
            </div>
            <span className="hidden font-bold text-royal-blue md:inline-block">Real-Time Data Processing</span>
          </Link>
          <nav className="hidden md:flex md:gap-4 lg:gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/data-sources" className="text-sm font-medium transition-colors hover:text-primary">
              Data Sources
            </Link>
            <Link href="/processing" className="text-sm font-medium transition-colors hover:text-primary">
              Processing
            </Link>
            <Link href="/analytics" className="text-sm font-medium transition-colors hover:text-primary">
              Analytics
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 md:w-[200px] lg:w-[300px]"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button variant="outline" size="icon" className="hidden md:flex" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ModeToggle />
          <Button variant="outline" size="icon">
            <User className="h-4 w-4" />
            <span className="sr-only">User</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
