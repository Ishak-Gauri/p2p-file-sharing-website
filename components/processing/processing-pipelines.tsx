"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, Settings, ArrowRight } from "lucide-react"

type Pipeline = {
  id: string
  name: string
  description: string
  status: "running" | "paused" | "error"
  source: string
  destination: string
  processingSteps: number
  throughput: number
}

const pipelines: Pipeline[] = [
  {
    id: "pipe-001",
    name: "IoT Data Transformation",
    description: "Processes and transforms IoT sensor data for analytics",
    status: "running",
    source: "IoT Sensor Network",
    destination: "MongoDB",
    processingSteps: 4,
    throughput: 1200,
  },
  {
    id: "pipe-002",
    name: "Social Media Sentiment Analysis",
    description: "Analyzes sentiment from social media feeds",
    status: "running",
    source: "Social Media Feed",
    destination: "Redis",
    processingSteps: 3,
    throughput: 800,
  },
  {
    id: "pipe-003",
    name: "Financial Transaction Processing",
    description: "Processes and validates financial transactions",
    status: "paused",
    source: "Financial Transactions",
    destination: "MongoDB",
    processingSteps: 5,
    throughput: 0,
  },
  {
    id: "pipe-004",
    name: "Weather Data Aggregation",
    description: "Aggregates weather data from multiple sources",
    status: "error",
    source: "Weather Data Service",
    destination: "InfluxDB",
    processingSteps: 2,
    throughput: 0,
  },
]

export default function ProcessingPipelines() {
  const [pipelinesList, setPipelinesList] = useState<Pipeline[]>(pipelines)

  const togglePipelineStatus = (id: string) => {
    setPipelinesList(
      pipelinesList.map((pipeline) => {
        if (pipeline.id === id) {
          const newStatus = pipeline.status === "running" ? "paused" : "running"
          return {
            ...pipeline,
            status: newStatus,
            throughput: newStatus === "running" ? (pipeline.id === "pipe-001" ? 1200 : 800) : 0,
          }
        }
        return pipeline
      }),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Running</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Paused</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {pipelinesList.map((pipeline) => (
        <Card key={pipeline.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">{pipeline.name}</h3>
                  {getStatusBadge(pipeline.status)}
                </div>
                <p className="text-sm text-muted-foreground">{pipeline.description}</p>
              </div>
              <div className="mt-4 flex items-center gap-2 md:mt-0">
                {pipeline.status !== "error" && (
                  <Button variant="outline" size="sm" onClick={() => togglePipelineStatus(pipeline.id)}>
                    {pipeline.status === "running" ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start
                      </>
                    )}
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-sm font-medium">Source</p>
                <p className="text-sm text-muted-foreground">{pipeline.source}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Destination</p>
                <p className="text-sm text-muted-foreground">{pipeline.destination}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Processing Steps</p>
                <p className="text-sm text-muted-foreground">{pipeline.processingSteps}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Throughput</p>
                <p className="text-sm text-muted-foreground">
                  {pipeline.throughput > 0 ? `${pipeline.throughput} msg/sec` : "0 msg/sec"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex-1 space-y-1">
                <div className="flex items-center text-xs">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <ArrowRight className="h-3 w-3" />
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <ArrowRight className="h-3 w-3" />
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <ArrowRight className="h-3 w-3" />
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  {pipeline.processingSteps > 3 && (
                    <>
                      <ArrowRight className="h-3 w-3" />
                      <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                    </>
                  )}
                  {pipeline.processingSteps > 4 && (
                    <>
                      <ArrowRight className="h-3 w-3" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
