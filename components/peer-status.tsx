"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Clock, Upload, Download } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function PeerStatus() {
  const [uptime, setUptime] = useState(0)
  const [connected, setConnected] = useState(false)
  const [peers, setPeers] = useState(0)
  const [uploadSpeed, setUploadSpeed] = useState(0)
  const [downloadSpeed, setDownloadSpeed] = useState(0)

  useEffect(() => {
    // Simulate connecting to the network
    const connectTimeout = setTimeout(() => {
      setConnected(true)
      setPeers(Math.floor(Math.random() * 20) + 5)
    }, 2000)

    // Simulate uptime counter
    const uptimeInterval = setInterval(() => {
      setUptime((prev) => prev + 1)
    }, 1000)

    // Simulate fluctuating network speeds
    const speedInterval = setInterval(() => {
      setUploadSpeed(Math.random() * 2)
      setDownloadSpeed(Math.random() * 5)
    }, 3000)

    return () => {
      clearTimeout(connectTimeout)
      clearInterval(uptimeInterval)
      clearInterval(speedInterval)
    }
  }, [])

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="bg-gradient-to-br from-emerald-light/90 to-teal-dark/90 text-white">
      <CardHeader>
        <CardTitle>Peer Status</CardTitle>
        <CardDescription className="text-white/80">Your connection to the P2P network</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {connected ? (
              <CheckCircle className="h-5 w-5 text-emerald-light mr-2" />
            ) : (
              <Clock className="h-5 w-5 text-amber-light animate-pulse mr-2" />
            )}
            <span>{connected ? "Connected" : "Connecting..."}</span>
          </div>
          <span className="text-sm text-white/80">{peers} peers</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Uptime</span>
            </div>
            <span>{formatUptime(uptime)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Upload className="h-4 w-4 mr-1" />
              <span>Upload</span>
            </div>
            <span>{uploadSpeed.toFixed(2)} MB/s</span>
          </div>
          <Progress value={uploadSpeed * 20} className="h-1 bg-white/20" indicatorClassName="bg-amber-light" />

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              <span>Download</span>
            </div>
            <span>{downloadSpeed.toFixed(2)} MB/s</span>
          </div>
          <Progress value={downloadSpeed * 10} className="h-1 bg-white/20" indicatorClassName="bg-pink-light" />
        </div>
      </CardContent>
    </Card>
  )
}
