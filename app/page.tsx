"use client"

import { useState, useEffect } from "react"
import { PeerStatus } from "@/components/peer-status"
import { TransferManager } from "@/components/transfer-manager"
import { FileExplorer } from "@/components/file-explorer"
import { NetworkVisualization } from "@/components/network-visualization"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  const [stats, setStats] = useState({
    connectedPeers: 0,
    filesShared: 0,
    totalDownloaded: 0,
    totalUploaded: 0,
  })

  useEffect(() => {
    // Simulate fetching stats
    setStats({
      connectedPeers: Math.floor(Math.random() * 20) + 5,
      filesShared: Math.floor(Math.random() * 50) + 10,
      totalDownloaded: Math.floor(Math.random() * 1000) + 500,
      totalUploaded: Math.floor(Math.random() * 500) + 100,
    })
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-light to-teal-light bg-clip-text text-transparent">
        Dashboard
      </h1>
      <p className="text-muted-foreground">Welcome to your P2P File Sharing Dashboard</p>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-gradient-purple">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Connected Peers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.connectedPeers}</div>
            <p className="text-xs opacity-80">Active nodes in the network</p>
          </CardContent>
        </Card>

        <Card className="card-gradient-teal">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Files Shared</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.filesShared}</div>
            <p className="text-xs opacity-80">Files available on the network</p>
          </CardContent>
        </Card>

        <Card className="card-gradient-pink">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Downloaded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDownloaded} MB</div>
            <p className="text-xs opacity-80">Data received from peers</p>
          </CardContent>
        </Card>

        <Card className="card-gradient-amber">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-black">Total Uploaded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{stats.totalUploaded} MB</div>
            <p className="text-xs text-black/70">Data sent to peers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="network" className="space-y-4">
            <TabsList className="bg-gradient-to-r from-purple-light/20 to-teal-light/20 dark:from-purple-dark/20 dark:to-teal-dark/20">
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="transfers">Transfers</TabsTrigger>
            </TabsList>
            <TabsContent value="network" className="space-y-4">
              <NetworkVisualization />
            </TabsContent>
            <TabsContent value="files">
              <FileExplorer />
            </TabsContent>
            <TabsContent value="transfers">
              <TransferManager />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <PeerStatus />
        </div>
      </div>
    </div>
  )
}
