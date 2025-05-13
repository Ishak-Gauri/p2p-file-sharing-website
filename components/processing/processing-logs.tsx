"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type LogLevel = "info" | "warning" | "error" | "debug"

type LogEntry = {
  id: string
  timestamp: string
  level: LogLevel
  source: string
  message: string
}

// Generate sample log entries
const generateLogs = (count = 50): LogEntry[] => {
  const sources = ["IoT Pipeline", "Social Media Pipeline", "Financial Pipeline", "Weather Pipeline", "System"]
  const levels: LogLevel[] = ["info", "warning", "error", "debug"]
  const infoMessages = [
    "Processing batch completed successfully",
    "New data source connected",
    "Pipeline started",
    "Data transformation completed",
    "Scheduled maintenance completed",
  ]
  const warningMessages = [
    "High latency detected",
    "Memory usage above 70%",
    "Slow database response",
    "Rate limiting applied",
    "Connection retries increased",
  ]
  const errorMessages = [
    "Failed to process message",
    "Database connection lost",
    "API rate limit exceeded",
    "Out of memory error",
    "Pipeline processing timeout",
  ]
  const debugMessages = [
    "Initializing connection pool",
    "Applying transformation function",
    "Validating message schema",
    "Checking cache status",
    "Optimizing query execution",
  ]

  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const level = levels[Math.floor(Math.random() * levels.length)]
    const source = sources[Math.floor(Math.random() * sources.length)]

    let message = ""
    switch (level) {
      case "info":
        message = infoMessages[Math.floor(Math.random() * infoMessages.length)]
        break
      case "warning":
        message = warningMessages[Math.floor(Math.random() * warningMessages.length)]
        break
      case "error":
        message = errorMessages[Math.floor(Math.random() * errorMessages.length)]
        break
      case "debug":
        message = debugMessages[Math.floor(Math.random() * debugMessages.length)]
        break
    }

    const timestamp = new Date(now.getTime() - i * 60000 * Math.random() * 10)

    return {
      id: `log-${i}`,
      timestamp: timestamp.toISOString(),
      level,
      source,
      message,
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export default function ProcessingLogs() {
  const [logs, setLogs] = useState<LogEntry[]>(generateLogs())
  const [filter, setFilter] = useState("")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")

  const refreshLogs = () => {
    setLogs(generateLogs())
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const getLevelBadge = (level: LogLevel) => {
    switch (level) {
      case "info":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Info</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      case "debug":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Debug</Badge>
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesText =
      log.message.toLowerCase().includes(filter.toLowerCase()) ||
      log.source.toLowerCase().includes(filter.toLowerCase())
    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesSource = sourceFilter === "all" || log.source === sourceFilter

    return matchesText && matchesLevel && matchesSource
  })

  const sources = Array.from(new Set(logs.map((log) => log.source)))

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              className="pl-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Log level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={refreshLogs}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="max-h-[600px] overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-background">
                <tr className="border-b">
                  <th className="p-3 text-left font-medium">Timestamp</th>
                  <th className="p-3 text-left font-medium">Level</th>
                  <th className="p-3 text-left font-medium">Source</th>
                  <th className="p-3 text-left font-medium">Message</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b">
                      <td className="p-3 text-sm">{formatTimestamp(log.timestamp)}</td>
                      <td className="p-3">{getLevelBadge(log.level)}</td>
                      <td className="p-3 text-sm">{log.source}</td>
                      <td className="p-3 text-sm">{log.message}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-3 text-center text-muted-foreground">
                      No logs found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
