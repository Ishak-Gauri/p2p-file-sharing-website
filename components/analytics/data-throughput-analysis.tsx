"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Generate sample data
const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i
    return {
      hour: `${hour}:00`,
      iot: Math.floor(Math.random() * 500) + 800,
      social: Math.floor(Math.random() * 300) + 500,
      financial: Math.floor(Math.random() * 200) + 400,
      weather: Math.floor(Math.random() * 100) + 100,
      total: Math.floor(Math.random() * 1000) + 1500,
    }
  })
}

const generateDailyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  return days.map((day) => ({
    day,
    iot: Math.floor(Math.random() * 5000) + 15000,
    social: Math.floor(Math.random() * 3000) + 10000,
    financial: Math.floor(Math.random() * 2000) + 8000,
    weather: Math.floor(Math.random() * 1000) + 2000,
    total: Math.floor(Math.random() * 10000) + 30000,
  }))
}

const generateMonthlyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return months.map((month) => ({
    month,
    iot: Math.floor(Math.random() * 50000) + 400000,
    social: Math.floor(Math.random() * 30000) + 300000,
    financial: Math.floor(Math.random() * 20000) + 200000,
    weather: Math.floor(Math.random() * 10000) + 50000,
    total: Math.floor(Math.random() * 100000) + 900000,
  }))
}

const sourceDistribution = [
  { name: "IoT Sensors", value: 42 },
  { name: "Social Media", value: 28 },
  { name: "Financial APIs", value: 18 },
  { name: "Weather Data", value: 12 },
]

export default function DataThroughputAnalysis() {
  const [timeRange, setTimeRange] = useState("hourly")

  const getData = () => {
    switch (timeRange) {
      case "hourly":
        return generateHourlyData()
      case "daily":
        return generateDailyData()
      case "monthly":
        return generateMonthlyData()
      default:
        return generateHourlyData()
    }
  }

  const data = getData()
  const xKey = timeRange === "hourly" ? "hour" : timeRange === "daily" ? "day" : "month"

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
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Throughput</CardTitle>
            <CardDescription>Messages processed per {timeRange.slice(0, -2)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4169E1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4169E1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey={xKey} />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#4169E1"
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                    name="Total Messages"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Throughput by Source</CardTitle>
            <CardDescription>Breakdown by data source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis />
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Throughput Trends</CardTitle>
          <CardDescription>Historical trends by data source</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="iot" stroke="#4169E1" name="IoT Sensors" />
                <Line type="monotone" dataKey="social" stroke="#5E81F4" name="Social Media" />
                <Line type="monotone" dataKey="financial" stroke="#8BA3F9" name="Financial APIs" />
                <Line type="monotone" dataKey="weather" stroke="#B8C5FB" name="Weather Data" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Peak Throughput</CardTitle>
            <CardDescription>Maximum messages per second</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-6xl font-bold text-royal-blue">
                {Math.max(...data.map((item) => item.total)).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Peak messages per {timeRange.slice(0, -2)}</div>
              <div className="text-sm">
                {timeRange === "hourly" ? "Today at 14:00" : timeRange === "daily" ? "Wednesday" : "August"}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Throughput</CardTitle>
            <CardDescription>By data source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>IoT Sensors</span>
                <span className="font-medium">
                  {Math.round(data.reduce((sum, item) => sum + item.iot, 0) / data.length).toLocaleString()} msg/
                  {timeRange.slice(0, -2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Social Media</span>
                <span className="font-medium">
                  {Math.round(data.reduce((sum, item) => sum + item.social, 0) / data.length).toLocaleString()} msg/
                  {timeRange.slice(0, -2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Financial APIs</span>
                <span className="font-medium">
                  {Math.round(data.reduce((sum, item) => sum + item.financial, 0) / data.length).toLocaleString()} msg/
                  {timeRange.slice(0, -2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Weather Data</span>
                <span className="font-medium">
                  {Math.round(data.reduce((sum, item) => sum + item.weather, 0) / data.length).toLocaleString()} msg/
                  {timeRange.slice(0, -2)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="font-medium">Total Average</span>
                <span className="font-medium">
                  {Math.round(data.reduce((sum, item) => sum + item.total, 0) / data.length).toLocaleString()} msg/
                  {timeRange.slice(0, -2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
