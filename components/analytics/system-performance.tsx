"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Generate sample data
const generatePerformanceData = (timeRange: string) => {
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
      cpu: Math.floor(Math.random() * 40) + 20,
      memory: Math.floor(Math.random() * 30) + 40,
      disk: Math.floor(Math.random() * 20) + 10,
      network: Math.floor(Math.random() * 50) + 30,
      node1: Math.floor(Math.random() * 40) + 20,
      node2: Math.floor(Math.random() * 40) + 20,
      node3: Math.floor(Math.random() * 40) + 20,
      node4: Math.floor(Math.random() * 40) + 20,
    }
  })
}

export default function SystemPerformance() {
  const [timeRange, setTimeRange] = useState("hourly")
  const data = generatePerformanceData(timeRange)

  const xKey = timeRange === "hourly" ? "hour" : timeRange === "daily" ? "day" : "date"

  // Current utilization metrics
  const currentCpu = 42
  const currentMemory = 68
  const currentDisk = 27
  const currentNetwork = 53

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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>CPU Utilization</CardTitle>
            <CardDescription>Average CPU usage across all nodes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4169E1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4169E1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis label={{ value: "CPU Usage (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value) => [`${value}%`, "CPU Usage"]} />
                  <Area
                    type="monotone"
                    dataKey="cpu"
                    stroke="#4169E1"
                    fillOpacity={1}
                    fill="url(#colorCpu)"
                    name="CPU Usage"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Memory Utilization</CardTitle>
            <CardDescription>Average memory usage across all nodes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF9F43" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF9F43" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis label={{ value: "Memory Usage (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value) => [`${value}%`, "Memory Usage"]} />
                  <Area
                    type="monotone"
                    dataKey="memory"
                    stroke="#FF9F43"
                    fillOpacity={1}
                    fill="url(#colorMemory)"
                    name="Memory Usage"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Node Performance Comparison</CardTitle>
          <CardDescription>CPU utilization across processing nodes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis label={{ value: "CPU Usage (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => [`${value}%`, "CPU Usage"]} />
                <Legend />
                <Line type="monotone" dataKey="node1" stroke="#4169E1" name="Node 1" />
                <Line type="monotone" dataKey="node2" stroke="#5E81F4" name="Node 2" />
                <Line type="monotone" dataKey="node3" stroke="#8BA3F9" name="Node 3" />
                <Line type="monotone" dataKey="node4" stroke="#B8C5FB" name="Node 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Disk I/O</CardTitle>
            <CardDescription>Disk utilization over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5E81F4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#5E81F4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis label={{ value: "Disk I/O (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value) => [`${value}%`, "Disk I/O"]} />
                  <Area
                    type="monotone"
                    dataKey="disk"
                    stroke="#5E81F4"
                    fillOpacity={1}
                    fill="url(#colorDisk)"
                    name="Disk I/O"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Utilization</CardTitle>
            <CardDescription>Network bandwidth usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8BA3F9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8BA3F9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis label={{ value: "Network Usage (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value) => [`${value}%`, "Network Usage"]} />
                  <Area
                    type="monotone"
                    dataKey="network"
                    stroke="#8BA3F9"
                    fillOpacity={1}
                    fill="url(#colorNetwork)"
                    name="Network Usage"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current System Utilization</CardTitle>
          <CardDescription>Real-time resource usage metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>CPU Utilization</span>
                <span className="font-medium">{currentCpu}%</span>
              </div>
              <Progress value={currentCpu} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Memory Utilization</span>
                <span className="font-medium">{currentMemory}%</span>
              </div>
              <Progress value={currentMemory} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Disk I/O</span>
                <span className="font-medium">{currentDisk}%</span>
              </div>
              <Progress value={currentDisk} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Network Utilization</span>
                <span className="font-medium">{currentNetwork}%</span>
              </div>
              <Progress value={currentNetwork} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
