"use client"

import Link from "next/link"
import { Download, FileSearch, HelpCircle, Home, Network, Settings, Upload, User } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function AppHeader() {
  return (
    <header className="bg-gradient-to-r from-purple-light via-teal-light to-pink-light dark:from-purple-dark dark:via-teal-dark dark:to-pink-dark text-white shadow-md">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl flex items-center">
            <Network className="mr-2 h-6 w-6" />
            P2P Share
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/search" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <FileSearch className="mr-2 h-4 w-4" />
                    Search
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Upload className="mr-2 h-4 w-4" />
                  My Files
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <li>
                      <Link href="/files" legacyBehavior passHref>
                        <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                          <Upload className="h-4 w-4" />
                          Shared Files
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/downloads" legacyBehavior passHref>
                        <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                          <Download className="h-4 w-4" />
                          Downloads
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/20">
            <Link href="/help">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/20">
            <Link href="/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/20">
            <Link href="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
