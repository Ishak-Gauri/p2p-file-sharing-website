import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/data-sources/data-table"
import { columns } from "@/components/data-sources/columns"
import { dataSources } from "@/components/data-sources/data"

export const metadata: Metadata = {
  title: "Data Sources - Real-Time Distributed Data Processing System",
  description: "Manage data sources for the real-time distributed data processing system",
}

export default function DataSourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-royal-blue">Data Sources</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Data Source
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Manage Data Sources</CardTitle>
            <CardDescription>Configure and monitor your data sources for real-time processing</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={dataSources} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
