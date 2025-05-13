import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataThroughputAnalysis from "@/components/analytics/data-throughput-analysis"
import LatencyAnalysis from "@/components/analytics/latency-analysis"
import ErrorRateAnalysis from "@/components/analytics/error-rate-analysis"
import SystemPerformance from "@/components/analytics/system-performance"

export const metadata: Metadata = {
  title: "Analytics - Real-Time Distributed Data Processing System",
  description: "Analytics and insights for the real-time distributed data processing system",
}

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-royal-blue">Analytics</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>System Analytics</CardTitle>
            <CardDescription>Detailed analytics and insights for your data processing system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="throughput" className="space-y-4">
              <TabsList>
                <TabsTrigger value="throughput">Throughput</TabsTrigger>
                <TabsTrigger value="latency">Latency</TabsTrigger>
                <TabsTrigger value="errors">Error Rates</TabsTrigger>
                <TabsTrigger value="performance">System Performance</TabsTrigger>
              </TabsList>
              <TabsContent value="throughput">
                <DataThroughputAnalysis />
              </TabsContent>
              <TabsContent value="latency">
                <LatencyAnalysis />
              </TabsContent>
              <TabsContent value="errors">
                <ErrorRateAnalysis />
              </TabsContent>
              <TabsContent value="performance">
                <SystemPerformance />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
