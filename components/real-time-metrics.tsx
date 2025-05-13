"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"

// Simulated real-time data
const generateData = () => {
  const now = new Date()
  return Array.from({ length: 24 }, (_, i) => {
    const time = new Date(now)
    time.setHours(now.getHours() - 23 + i)
    return {
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      throughput: Math.floor(Math.random() * 100) + 50,
      latency: Math.floor(Math.random() * 20) + 5,
      errors: Math.floor(Math.random() * 5),
    }
  })
}

export default function RealTimeMetrics() {
  const [data, setData] = useState(generateData())

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const now = new Date()
        const newPoint = {
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          throughput: Math.floor(Math.random() * 100) + 50,
          latency: Math.floor(Math.random() * 20) + 5,
          errors: Math.floor(Math.random() * 5),
        }
        return [...prevData.slice(1), newPoint]
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="col-span-3 lg:col-span-2">
      <CardHeader>
        <CardTitle>Real-Time System Metrics</CardTitle>
        <CardDescription>Live monitoring of system performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="throughput">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="throughput">Throughput</TabsTrigger>
            <TabsTrigger value="latency">Latency</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
          <TabsContent value="throughput" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4169E1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4169E1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="throughput"
                    stroke="#4169E1"
                    fillOpacity={1}
                    fill="url(#colorThroughput)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground">
              Current throughput: {data[data.length - 1].throughput} requests/sec
            </div>
          </TabsContent>
          <TabsContent value="latency" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="latency" stroke="#FF6B6B" fillOpacity={1} fill="url(#colorLatency)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground">Average latency: {data[data.length - 1].latency} ms</div>
          </TabsContent>
          <TabsContent value="errors" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="errors" fill="#FF9F43" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground">
              Total errors in last 24 hours: {data.reduce((sum, point) => sum + point.errors, 0)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
