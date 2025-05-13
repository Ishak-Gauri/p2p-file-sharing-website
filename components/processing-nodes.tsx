"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type ProcessingNode = {
  id: string
  name: string
  status: "online" | "offline" | "warning"
  load: number
  memory: number
  tasks: number
  region: string
}

export default function ProcessingNodes() {
  const [nodes, setNodes] = useState<ProcessingNode[]>([
    {
      id: "node-1",
      name: "Processing Node 1",
      status: "online",
      load: 65,
      memory: 48,
      tasks: 12,
      region: "US-East",
    },
    {
      id: "node-2",
      name: "Processing Node 2",
      status: "online",
      load: 32,
      memory: 27,
      tasks: 8,
      region: "US-West",
    },
    {
      id: "node-3",
      name: "Processing Node 3",
      status: "warning",
      load: 89,
      memory: 76,
      tasks: 24,
      region: "EU-Central",
    },
    {
      id: "node-4",
      name: "Processing Node 4",
      status: "offline",
      load: 0,
      memory: 0,
      tasks: 0,
      region: "Asia-East",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.status === "offline") return node

          const loadChange = Math.floor(Math.random() * 10) - 5
          const memoryChange = Math.floor(Math.random() * 8) - 4
          const taskChange = Math.floor(Math.random() * 3) - 1

          const newLoad = Math.max(0, Math.min(100, node.load + loadChange))
          const newMemory = Math.max(0, Math.min(100, node.memory + memoryChange))
          const newTasks = Math.max(0, node.tasks + taskChange)

          let newStatus = node.status
          if (newLoad > 85) {
            newStatus = "warning"
          } else if (newLoad < 80 && node.status === "warning") {
            newStatus = "online"
          }

          return {
            ...node,
            status: newStatus,
            load: newLoad,
            memory: newMemory,
            tasks: newTasks,
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Online</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      case "offline":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Offline</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader>
        <CardTitle>Processing Nodes</CardTitle>
        <CardDescription>Status of distributed processing nodes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nodes.map((node) => (
            <div key={node.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{node.name}</h4>
                  <p className="text-sm text-muted-foreground">Region: {node.region}</p>
                </div>
                {getStatusBadge(node.status)}
              </div>

              {node.status !== "offline" && (
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">CPU Load</p>
                    <p className="font-medium">{node.load}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Memory</p>
                    <p className="font-medium">{node.memory}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Active Tasks</p>
                    <p className="font-medium">{node.tasks}</p>
                  </div>
                </div>
              )}

              <Separator />
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          {nodes.filter((n) => n.status === "online").length} of {nodes.length} nodes online
        </div>
      </CardContent>
    </Card>
  )
}
