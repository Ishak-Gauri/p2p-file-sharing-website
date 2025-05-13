import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SystemArchitecture() {
  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader>
        <CardTitle>System Architecture</CardTitle>
        <CardDescription>Distributed data processing system architecture</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <img
            src="/architecture-diagram.png"
            alt="System Architecture Diagram"
            className="rounded-md border border-muted"
          />
        </div>
        <div className="mt-4 text-sm">
          <p className="mb-2">The architecture implements a microservices approach with:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Data ingestion services via WebSockets and REST APIs</li>
            <li>Distributed processing nodes for real-time analytics</li>
            <li>MongoDB/Redis for fast data storage and retrieval</li>
            <li>Next.js frontend with SSR for responsive UI</li>
            <li>Docker containers for deployment and scaling</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
