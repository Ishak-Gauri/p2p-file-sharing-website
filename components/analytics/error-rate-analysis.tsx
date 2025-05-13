"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Generate sample data
const generateErrorData = (timeRange: string) => {
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
      rate: (Math.random() * 2).toFixed(2),
      connection: Math.floor(Math.random() * 10) + 1,
      timeout: Math.floor(Math.random() * 8) + 1,
      validation: Math.floor(Math.random() * 15) + 1,
      processing: Math.floor(Math.random() * 12) + 1,
      iot: (Math.random() * 2.5).toFixed(2),
      social: (Math.random() * 1.8).toFixed(2),
      financial: (Math.random() * 1.2).toFixed(2),
      weather: (Math.random() * 3).toFixed(2),
    }
  })
}

const errorTypeData = [
  { name: "Connection Errors", value: 28 },
  { name: "Timeout Errors", value: 22 },
  { name: "Validation Errors", value: 32 },
  { name: "Processing Errors", value: 18 },
]

const COLORS = ["#FF6B6B", "#FF9F43", "#4169E1", "#5E81F4"]

export default function ErrorRateAnalysis() {
  const [timeRange, setTimeRange] = useState("hourly")
  const data = generateErrorData(timeRange)

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
          <CardTitle>Error Rate Over Time</CardTitle>
          <CardDescription>Percentage of failed messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis label={{ value: "Error Rate (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => [`${value}%`, "Error Rate"]} />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="#FF6B6B" name="Error Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Error Types</CardTitle>
            <CardDescription>Distribution of error categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {errorTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Count by Type</CardTitle>
            <CardDescription>Number of errors by category</CardDescription>
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
                  <Bar dataKey="connection" fill="#FF6B6B" name="Connection Errors" />
                  <Bar dataKey="timeout" fill="#FF9F43" name="Timeout Errors" />
                  <Bar dataKey="validation" fill="#4169E1" name="Validation Errors" />
                  <Bar dataKey="processing" fill="#5E81F4" name="Processing Errors" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Error Rate by Data Source</CardTitle>
          <CardDescription>Error percentage for each data source</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis label={{ value: "Error Rate (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => [`${value}%`, "Error Rate"]} />
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

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Average Error Rate</CardTitle>
            <CardDescription>Overall system average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-4xl font-bold text-red-500">
                {(data.reduce((sum, item) => sum + Number.parseFloat(item.rate), 0) / data.length).toFixed(2)}%
              </div>
              <div className="text-sm text-muted-foreground">Average error rate</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peak Error Rate</CardTitle>
            <CardDescription>Maximum observed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-4xl font-bold text-red-500">
                {Math.max(...data.map((item) => Number.parseFloat(item.rate))).toFixed(2)}%
              </div>
              <div className="text-sm text-muted-foreground">Peak error rate</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Errors</CardTitle>
            <CardDescription>Count of all errors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-4xl font-bold text-red-500">
                {data
                  .reduce((sum, item) => sum + item.connection + item.timeout + item.validation + item.processing, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total error count</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Common Error</CardTitle>
            <CardDescription>Highest frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-xl font-bold text-red-500">Validation Errors</div>
              <div className="text-4xl font-bold">32%</div>
              <div className="text-sm text-muted-foreground">Of all errors</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
