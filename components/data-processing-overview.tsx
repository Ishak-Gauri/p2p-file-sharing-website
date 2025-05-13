"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

type ProcessingJob = {
  id: string
  name: string
  status: "completed" | "processing" | "queued" | "failed"
  progress: number
  timestamp: string
}

export default function DataProcessingOverview() {
  const [jobs, setJobs] = useState<ProcessingJob[]>([
    {
      id: "job-1",
      name: "IoT Sensor Data Batch",
      status: "completed",
      progress: 100,
      timestamp: "10:30 AM",
    },
    {
      id: "job-2",
      name: "Social Media Stream",
      status: "processing",
      progress: 68,
      timestamp: "10:45 AM",
    },
    {
      id: "job-3",
      name: "Financial Transactions",
      status: "queued",
      progress: 0,
      timestamp: "11:00 AM",
    },
    {
      id: "job-4",
      name: "Weather Data Analysis",
      status: "failed",
      progress: 23,
      timestamp: "10:15 AM",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          if (job.status === "processing") {
            const newProgress = job.progress + 5
            if (newProgress >= 100) {
              return { ...job, status: "completed", progress: 100 }
            }
            return { ...job, progress: newProgress }
          } else if (job.status === "queued" && Math.random() > 0.7) {
            return { ...job, status: "processing", progress: 5 }
          } else if (job.status === "completed" && Math.random() > 0.9) {
            // Occasionally add new jobs when old ones complete
            const now = new Date()
            return {
              id: `job-${Date.now()}`,
              name: "New Data Stream",
              status: "queued",
              progress: 0,
              timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }
          }
          return job
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "queued":
        return <Clock className="h-4 w-4 text-gray-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Processing
          </Badge>
        )
      case "queued":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Queued
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="col-span-3 md:col-span-1">
      <CardHeader>
        <CardTitle>Data Processing Jobs</CardTitle>
        <CardDescription>Current status of data processing tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(job.status)}
                <span className="text-sm font-medium">{job.name}</span>
              </div>
              {getStatusBadge(job.status)}
            </div>
            <Progress value={job.progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{job.progress}% complete</span>
              <span>{job.timestamp}</span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">Updated just now</div>
      </CardFooter>
    </Card>
  )
}
