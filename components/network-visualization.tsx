"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface Peer {
  id: string
  nodeId: string
  ip: string
  port: number
  status: "active" | "inactive"
  latency: number
  uptime: number
  connections: number
  distance: number
}

interface NetworkStats {
  totalPeers: number
  activePeers: number
  averageLatency: number
  messagesSent: number
  messagesReceived: number
  lookups: number
  stores: number
  bandwidth: {
    in: number
    out: number
  }
}

// Update the COLORS array to use our new vibrant colors
const COLORS = ["#9D50BB", "#00D2FF", "#FF6B9E", "#FFD166", "#06D6A0", "#FF8C66"]

// Generate random data for the network visualization
const generateData = () => {
  const data = []
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: i,
      peers: Math.floor(Math.random() * 30) + 10,
      traffic: Math.floor(Math.random() * 100) + 20,
    })
  }
  return data
}

export function NetworkVisualization() {
  const [peers, setPeers] = useState<Peer[]>([])
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    totalPeers: 0,
    activePeers: 0,
    averageLatency: 0,
    messagesSent: 0,
    messagesReceived: 0,
    lookups: 0,
    stores: 0,
    bandwidth: {
      in: 0,
      out: 0,
    },
  })
  const [timeRange, setTimeRange] = useState("1h")
  const [trafficData, setTrafficData] = useState<any[]>([])
  const [messageTypeData, setMessageTypeData] = useState<any[]>([])
  const [latencyData, setLatencyData] = useState<any[]>([])
  const [data, setData] = useState(generateData())

  useEffect(() => {
    // Generate sample peers
    const generatePeers = () => {
      const samplePeers: Peer[] = Array.from({ length: 20 }, (_, i) => ({
        id: `peer-${i}`,
        nodeId: `0x${Math.random().toString(16).substring(2, 10)}`,
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        port: 4000 + Math.floor(Math.random() * 1000),
        status: Math.random() > 0.2 ? "active" : "inactive",
        latency: Math.floor(Math.random() * 200) + 10,
        uptime: Math.floor(Math.random() * 24 * 60 * 60),
        connections: Math.floor(Math.random() * 10) + 1,
        distance: Math.floor(Math.random() * 160) + 1,
      }))

      setPeers(samplePeers)

      // Calculate network stats
      const activePeersCount = samplePeers.filter((p) => p.status === "active").length
      const avgLatency = samplePeers.reduce((sum, peer) => sum + peer.latency, 0) / samplePeers.length

      setNetworkStats({
        totalPeers: samplePeers.length,
        activePeers: activePeersCount,
        averageLatency: avgLatency,
        messagesSent: Math.floor(Math.random() * 10000) + 5000,
        messagesReceived: Math.floor(Math.random() * 10000) + 5000,
        lookups: Math.floor(Math.random() * 1000) + 500,
        stores: Math.floor(Math.random() * 500) + 100,
        bandwidth: {
          in: Math.floor(Math.random() * 10) + 5,
          out: Math.floor(Math.random() * 8) + 3,
        },
      })
    }

    // Generate traffic data
    const generateTrafficData = () => {
      const points = timeRange === "1h" ? 12 : timeRange === "24h" ? 24 : 7
      const data = Array.from({ length: points }, (_, i) => {
        const time = timeRange === "1h" ? `${i * 5}m` : timeRange === "24h" ? `${i}h` : `Day ${i + 1}`

        return {
          time,
          incoming: Math.floor(Math.random() * 500) + 100,
          outgoing: Math.floor(Math.random() * 400) + 50,
        }
      })

      setTrafficData(data)
    }

    // Generate message type data
    const generateMessageTypeData = () => {
      const data = [
        { name: "FIND_NODE", value: Math.floor(Math.random() * 500) + 300 },
        { name: "FIND_VALUE", value: Math.floor(Math.random() * 300) + 200 },
        { name: "STORE", value: Math.floor(Math.random() * 200) + 100 },
        { name: "PING", value: Math.floor(Math.random() * 100) + 50 },
      ]

      setMessageTypeData(data)
    }

    // Generate latency data
    const generateLatencyData = () => {
      const data = Array.from({ length: 20 }, () => ({
        distance: Math.floor(Math.random() * 160) + 1,
        latency: Math.floor(Math.random() * 200) + 10,
        size: Math.floor(Math.random() * 5) + 1,
      }))

      setLatencyData(data)
    }

    generatePeers()
    generateTrafficData()
    generateMessageTypeData()
    generateLatencyData()

    // Update data periodically
    const interval = setInterval(() => {
      generateTrafficData()
      generateMessageTypeData()

      // Update peer latencies
      setPeers((prev) =>
        prev.map((peer) => ({
          ...peer,
          latency: Math.max(10, peer.latency + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 20)),
          status: Math.random() > 0.05 ? peer.status : peer.status === "active" ? "inactive" : "active",
          connections: Math.max(1, peer.connections + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2)),
        })),
      )

      // Update network stats
      setNetworkStats((prev) => {
        const activePeersCount = peers.filter((p) => p.status === "active").length
        const avgLatency = peers.reduce((sum, peer) => sum + peer.latency, 0) / peers.length

        return {
          ...prev,
          activePeers: activePeersCount,
          averageLatency: avgLatency,
          messagesSent: prev.messagesSent + Math.floor(Math.random() * 100),
          messagesReceived: prev.messagesReceived + Math.floor(Math.random() * 100),
          lookups: prev.lookups + Math.floor(Math.random() * 10),
          stores: prev.stores + Math.floor(Math.random() * 5),
          bandwidth: {
            in: Math.max(1, prev.bandwidth.in + (Math.random() > 0.5 ? 0.5 : -0.3)),
            out: Math.max(0.5, prev.bandwidth.out + (Math.random() > 0.5 ? 0.3 : -0.2)),
          },
        }
      })
    }, 5000)

    // Update data periodically to simulate network changes
    const interval2 = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData]
        const lastHour = newData[newData.length - 1].hour

        // Shift data and add new point
        newData.shift()
        newData.push({
          hour: (lastHour + 1) % 24,
          peers: Math.floor(Math.random() * 30) + 10,
          traffic: Math.floor(Math.random() * 100) + 20,
        })

        return newData
      })
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(interval2)
    }
  }, [timeRange, peers.length])

  const formatUptime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d ${hours % 24}h`
    }

    return `${hours}h ${minutes}m`
  }

  // Update the card styling for the network overview
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-rainbow">
        <CardHeader className="bg-gradient-to-r from-purple-light/10 to-teal-light/10">
          <CardTitle>Network Overview</CardTitle>
          <CardDescription>DHT network statistics and visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-purple-light/30 bg-purple-light/10 p-3">
              <div className="text-sm font-medium text-purple-light">Total Peers</div>
              <div className="text-2xl font-bold">{networkStats.totalPeers}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {networkStats.activePeers} active (
                {Math.round((networkStats.activePeers / networkStats.totalPeers) * 100)}%)
              </div>
            </div>
            <div className="rounded-lg border border-teal-light/30 bg-teal-light/10 p-3">
              <div className="text-sm font-medium text-teal-light">Average Latency</div>
              <div className="text-2xl font-bold">{Math.round(networkStats.averageLatency)} ms</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Min: {Math.min(...peers.map((p) => p.latency))} ms, Max: {Math.max(...peers.map((p) => p.latency))} ms
              </div>
            </div>
            <div className="rounded-lg border border-pink-light/30 bg-pink-light/10 p-3">
              <div className="text-sm font-medium text-pink-light">Messages</div>
              <div className="text-2xl font-bold">{networkStats.messagesSent + networkStats.messagesReceived}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Sent: {networkStats.messagesSent}, Received: {networkStats.messagesReceived}
              </div>
            </div>
            <div className="rounded-lg border border-amber-light/30 bg-amber-light/10 p-3">
              <div className="text-sm font-medium text-amber-light">Bandwidth</div>
              <div className="text-2xl font-bold">
                {(networkStats.bandwidth.in + networkStats.bandwidth.out).toFixed(1)} MB/s
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                In: {networkStats.bandwidth.in.toFixed(1)} MB/s, Out: {networkStats.bandwidth.out.toFixed(1)} MB/s
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Network Traffic</CardTitle>
              <CardDescription>Incoming and outgoing traffic</CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last hour</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} KB/s`} />
                  <Legend />
                  <Line type="monotone" dataKey="incoming" stroke="#4169E1" name="Incoming" />
                  <Line type="monotone" dataKey="outgoing" stroke="#5E81F4" name="Outgoing" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message Types</CardTitle>
            <CardDescription>Distribution of DHT message types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={messageTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {messageTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} messages`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>DHT Latency vs Distance</CardTitle>
          <CardDescription>Correlation between XOR distance and response latency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="distance"
                  name="XOR Distance"
                  label={{ value: "XOR Distance (bits)", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  type="number"
                  dataKey="latency"
                  name="Latency"
                  label={{ value: "Latency (ms)", angle: -90, position: "insideLeft" }}
                />
                <ZAxis type="number" dataKey="size" range={[40, 100]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(value, name) => [
                    name === "latency" ? `${value} ms` : value,
                    name === "latency" ? "Latency" : "XOR Distance",
                  ]}
                />
                <Scatter name="Peers" data={latencyData} fill="#4169E1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected Peers</CardTitle>
          <CardDescription>Active peers in the DHT network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-auto max-h-[400px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b">
                    <th className="p-3 text-left font-medium">Node ID</th>
                    <th className="p-3 text-left font-medium">IP:Port</th>
                    <th className="p-3 text-left font-medium">Status</th>
                    <th className="p-3 text-left font-medium">Latency</th>
                    <th className="p-3 text-left font-medium">Uptime</th>
                    <th className="p-3 text-left font-medium">Connections</th>
                  </tr>
                </thead>
                <tbody>
                  {peers.map((peer) => (
                    <tr key={peer.id} className="border-b">
                      <td className="p-3 font-mono text-xs">{peer.nodeId}</td>
                      <td className="p-3 text-sm">
                        {peer.ip}:{peer.port}
                      </td>
                      <td className="p-3">
                        {peer.status === "active" ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800">
                            Inactive
                          </Badge>
                        )}
                      </td>
                      <td className="p-3 text-sm">{peer.latency} ms</td>
                      <td className="p-3 text-sm">{formatUptime(peer.uptime)}</td>
                      <td className="p-3 text-sm">{peer.connections}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="h-[300px]">
        <ChartContainer
          config={{
            peers: {
              label: "Connected Peers",
              color: "hsl(var(--chart-1))",
            },
            traffic: {
              label: "Network Traffic",
              color: "hsl(var(--chart-2))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="peers" strokeWidth={2} activeDot={{ r: 4 }} stroke="var(--color-peers)" />
              <Line
                type="monotone"
                dataKey="traffic"
                strokeWidth={2}
                activeDot={{ r: 4 }}
                stroke="var(--color-traffic)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
