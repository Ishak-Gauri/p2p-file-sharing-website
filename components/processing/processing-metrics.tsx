"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Generate random data for the charts
const generateTimeSeriesData = (hours = 24) => {
  const now = new Date()
  return Array.from({ length: hours }, (_, i) => {
    const time = new Date(now)
    time.setHours(now.getHours() - (hours - 1) + i)
    return {
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      throughput: Math.floor(Math.random() * 1000) + 500,
      latency: Math.floor(Math.random() * 50) + 10,
      errorRate: Math.random() * 2,
      cpuUsage: Math.floor(Math.random() * 40) + 20,
      memoryUsage: Math.floor(Math.random() * 30) + 40,
    }
  })
}

const generatePipelineData = () => {
  return [
    { name: "IoT Data Transformation", throughput: 1200, latency: 25, errorRate: 0.5 },
    { name: "Social Media Sentiment", throughput: 800, latency: 35, errorRate: 0.8 },
    { name: "Financial Transactions", throughput: 600, latency: 15, errorRate: 0.2 },
    { name: "Weather Data Aggregation", throughput: 120, latency: 40, errorRate: 1.5 },
  ]
}

export default function ProcessingMetrics() {
  const [timeRange, setTimeRange] = useState("24h")
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData())
  const [pipelineData] = useState(generatePipelineData())

  useEffect(() => {
    const hours = timeRange === "24h" ? 24 : timeRange === "12h" ? 12 : 6
    setTimeSeriesData(generateTimeSeriesData(hours))
  }, [timeRange])

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6h">Last 6 hours</SelectItem>
            <SelectItem value="12h">Last 12 hours</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-medium">System Throughput</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="throughput" stroke="#4169E1" name="Messages/sec" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-medium">Processing Latency</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="latency" stroke="#FF6B6B" name="Latency (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-medium">Resource Utilization</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpuUsage" stroke="#4CAF50" name="CPU Usage (%)" />
                <Line type="monotone" dataKey="memoryUsage" stroke="#FF9800" name="Memory Usage (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-medium">Pipeline Comparison</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#4169E1" />
                <YAxis yAxisId="right" orientation="right" stroke="#FF6B6B" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="throughput" fill="#4169E1" name="Throughput (msg/sec)" />
                <Bar yAxisId="right" dataKey="latency" fill="#FF6B6B" name="Latency (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
