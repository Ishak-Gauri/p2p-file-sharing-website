"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Generate sample data
const generateLatencyData = (timeRange: string) => {
  const count = timeRange === "hourly" ? 24 : timeRange === "daily" ? 7 : 30
  const keyName = timeRange === "hourly" ? "hour" : timeRange === "daily" ? "day" : "date"

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return Array.from({ length: count }, (_, i) => {
    let label = ""
    if (timeRange === "hourly") {
      label = `${i}:00`
    } else if (timeRange === "daily") {
      label = days[i % 7]
    } else {
      const date = new Date()
      date.setDate(date.getDate() - (count - i - 1))
      label = `${date.getMonth() + 1}/${date.getDate()}`
    }

    return {
      [keyName]: label,
      avg: Math.floor(Math.random() * 30) + 20,
      p95: Math.floor(Math.random() * 50) + 40,
      p99: Math.floor(Math.random() * 70) + 60,
      iot: Math.floor(Math.random() * 20) + 15,
      social: Math.floor(Math.random() * 30) + 25,
      financial: Math.floor(Math.random() * 15) + 10,
      weather: Math.floor(Math.random() * 40) + 30,
    }
  })
}

const generateScatterData = () => {
  return Array.from({ length: 100 }, () => ({
    throughput: Math.floor(Math.random() * 1000) + 100,
    latency: Math.floor(Math.random() * 100) + 10,
    size: Math.floor(Math.random() * 10) + 1,
  }))
}

const generateLatencyDistribution = () => {
  const ranges = [
    "0-10ms",
    "11-20ms",
    "21-30ms",
    "31-40ms",
    "41-50ms",
    "51-60ms",
    "61-70ms",
    "71-80ms",
    "81-90ms",
    "91-100ms",
    ">100ms",
  ]
  return ranges.map((range) => ({
    range,
    count: Math.floor(Math.random() * 1000) + 100,
  }))
}

export default function LatencyAnalysis() {
  const [timeRange, setTimeRange] = useState("hourly")
  const data = generateLatencyData(timeRange)
  const scatterData = generateScatterData()
  const distributionData = generateLatencyDistribution()

  const xKey = timeRange === "hourly" ? "hour" : timeRange === "daily" ? "day" : "date"

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Latency Metrics Over Time</CardTitle>
          <CardDescription>Average, P95, and P99 latency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis label={{ value: "Latency (ms)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avg" stroke="#4169E1" name="Average" />
                <Line type="monotone" dataKey="p95" stroke="#FF9F43" name="95th Percentile" />
                <Line type="monotone" dataKey="p99" stroke="#FF6B6B" name="99th Percentile" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latency by Data Source</CardTitle>
            <CardDescription>Average latency for each data source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis label={{ value: "Latency (ms)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="iot" fill="#4169E1" name="IoT Sensors" />
                  <Bar dataKey="social" fill="#5E81F4" name="Social Media" />
                  <Bar dataKey="financial" fill="#8BA3F9" name="Financial APIs" />
                  <Bar dataKey="weather" fill="#B8C5FB" name="Weather Data" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latency Distribution</CardTitle>
            <CardDescription>Frequency of latency ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4169E1" name="Message Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Throughput vs. Latency</CardTitle>
          <CardDescription>Correlation between message throughput and processing latency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="throughput"
                  name="Throughput"
                  label={{ value: "Throughput (msg/sec)", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  type="number"
                  dataKey="latency"
                  name="Latency"
                  label={{ value: "Latency (ms)", angle: -90, position: "insideLeft" }}
                />
                <ZAxis type="number" dataKey="size" range={[20, 100]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Throughput vs Latency" data={scatterData} fill="#4169E1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Average Latency</CardTitle>
            <CardDescription>Overall system average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-5xl font-bold text-royal-blue">
                {Math.round(data.reduce((sum, item) => sum + item.avg, 0) / data.length)} ms
              </div>
              <div className="text-sm text-muted-foreground">Average processing time</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>95th Percentile</CardTitle>
            <CardDescription>P95 latency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-5xl font-bold text-amber-500">
                {Math.round(data.reduce((sum, item) => sum + item.p95, 0) / data.length)} ms
              </div>
              <div className="text-sm text-muted-foreground">95% of requests are faster than this</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>99th Percentile</CardTitle>
            <CardDescription>P99 latency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-5xl font-bold text-red-500">
                {Math.round(data.reduce((sum, item) => sum + item.p99, 0) / data.length)} ms
              </div>
              <div className="text-sm text-muted-foreground">99% of requests are faster than this</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
