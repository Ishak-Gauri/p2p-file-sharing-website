"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Cpu, Database, Server } from "lucide-react"

export default function SystemStats() {
  const [stats, setStats] = useState({
    cpu: 0,
    memory: 0,
    nodes: 0,
    status: "healthy" as "healthy" | "warning" | "critical",
  })

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 30) + 20, // 20-50%
        memory: Math.floor(Math.random() * 40) + 30, // 30-70%
        nodes: 4,
        status: Math.random() > 0.9 ? "warning" : "healthy",
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = () => {
    switch (stats.status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">System Healthy</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      case "critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
    }
  }

  return (
    <>
      <div className="hidden items-center gap-2 md:flex">
        <div className="flex items-center gap-1">
          <Cpu className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{stats.cpu}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Database className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{stats.memory}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Server className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{stats.nodes} nodes</span>
        </div>
      </div>
      {getStatusBadge()}
    </>
  )
}
