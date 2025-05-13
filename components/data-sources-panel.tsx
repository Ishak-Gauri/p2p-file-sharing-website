"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "IoT Sensors", value: 35 },
  { name: "Social Media", value: 25 },
  { name: "Financial APIs", value: 20 },
  { name: "Weather Data", value: 15 },
  { name: "User Activity", value: 5 },
]

const COLORS = ["#4169E1", "#5E81F4", "#8BA3F9", "#B8C5FB", "#D6DFFD"]

export default function DataSourcesPanel() {
  return (
    <Card className="col-span-3 md:col-span-1">
      <CardHeader>
        <CardTitle>Data Sources</CardTitle>
        <CardDescription>Distribution of incoming data by source</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend layout="vertical" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">Total active data sources: {data.length}</div>
      </CardContent>
    </Card>
  )
}
