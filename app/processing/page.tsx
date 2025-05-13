import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProcessingPipelines from "@/components/processing/processing-pipelines"
import ProcessingMetrics from "@/components/processing/processing-metrics"
import ProcessingLogs from "@/components/processing/processing-logs"

export const metadata: Metadata = {
  title: "Processing - Real-Time Distributed Data Processing System",
  description: "Monitor and manage data processing pipelines",
}

export default function ProcessingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-royal-blue">Processing</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Data Processing Management</CardTitle>
            <CardDescription>Monitor and manage your data processing pipelines</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pipelines" className="space-y-4">
              <TabsList>
                <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="pipelines">
                <ProcessingPipelines />
              </TabsContent>
              <TabsContent value="metrics">
                <ProcessingMetrics />
              </TabsContent>
              <TabsContent value="logs">
                <ProcessingLogs />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
