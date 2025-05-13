"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [downloadPath, setDownloadPath] = useState("/home/user/Downloads")
  const [maxDownloadSpeed, setMaxDownloadSpeed] = useState(0) // 0 means unlimited
  const [maxUploadSpeed, setMaxUploadSpeed] = useState(100) // KB/s
  const [maxConnections, setMaxConnections] = useState(50)
  const [portNumber, setPortNumber] = useState(6881)
  const [encryption, setEncryption] = useState("enabled")
  const [dhtEnabled, setDhtEnabled] = useState(true)
  const [localDiscoveryEnabled, setLocalDiscoveryEnabled] = useState(true)
  const [startWithSystem, setStartWithSystem] = useState(false)
  const [minimizeToTray, setMinimizeToTray] = useState(true)
  const [theme, setTheme] = useState("system")

  const { toast } = useToast()

  const handleSaveSettings = () => {
    // In a real app, this would save settings to a config file or database
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground">Configure your P2P file sharing application</p>

      <Tabs defaultValue="general">
        <TabsList className="bg-gradient-to-r from-purple-light/20 to-teal-light/20 dark:from-purple-dark/20 dark:to-teal-dark/20">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="download-path">Download Path</Label>
                <Input id="download-path" value={downloadPath} onChange={(e) => setDownloadPath(e.target.value)} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="start-with-system">Start with system</Label>
                <Switch id="start-with-system" checked={startWithSystem} onCheckedChange={setStartWithSystem} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="minimize-to-tray">Minimize to tray</Label>
                <Switch id="minimize-to-tray" checked={minimizeToTray} onCheckedChange={setMinimizeToTray} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Settings</CardTitle>
              <CardDescription>Configure network and bandwidth settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="port">Port Number</Label>
                <Input
                  id="port"
                  type="number"
                  value={portNumber}
                  onChange={(e) => setPortNumber(Number.parseInt(e.target.value))}
                />
                <p className="text-sm text-muted-foreground">Port used for incoming connections (default: 6881)</p>
              </div>

              <div className="grid gap-2">
                <Label>Maximum Download Speed (KB/s)</Label>
                <div className="pt-4">
                  <Slider
                    value={[maxDownloadSpeed]}
                    onValueChange={(value) => setMaxDownloadSpeed(value[0])}
                    max={10000}
                    step={100}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>Unlimited</span>
                    <span>{maxDownloadSpeed === 0 ? "Unlimited" : `${maxDownloadSpeed} KB/s`}</span>
                    <span>10000 KB/s</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Maximum Upload Speed (KB/s)</Label>
                <div className="pt-4">
                  <Slider
                    value={[maxUploadSpeed]}
                    onValueChange={(value) => setMaxUploadSpeed(value[0])}
                    max={1000}
                    step={10}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>0 KB/s</span>
                    <span>{maxUploadSpeed} KB/s</span>
                    <span>1000 KB/s</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Maximum Connections</Label>
                <div className="pt-4">
                  <Slider
                    value={[maxConnections]}
                    onValueChange={(value) => setMaxConnections(value[0])}
                    max={200}
                    step={5}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>10</span>
                    <span>{maxConnections} connections</span>
                    <span>200</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Configure privacy and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Encryption Mode</Label>
                <RadioGroup value={encryption} onValueChange={setEncryption} className="mt-2 space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enabled" id="encryption-enabled" />
                    <Label htmlFor="encryption-enabled">Enabled</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="forced" id="encryption-forced" />
                    <Label htmlFor="encryption-forced">Forced</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disabled" id="encryption-disabled" />
                    <Label htmlFor="encryption-disabled">Disabled</Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-muted-foreground">
                  Enabled: Prefer encrypted connections but allow unencrypted ones
                  <br />
                  Forced: Only allow encrypted connections
                  <br />
                  Disabled: Do not use encryption
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dht-enabled">DHT Network</Label>
                  <p className="text-sm text-muted-foreground">Enable Distributed Hash Table for peer discovery</p>
                </div>
                <Switch id="dht-enabled" checked={dhtEnabled} onCheckedChange={setDhtEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="local-discovery">Local Peer Discovery</Label>
                  <p className="text-sm text-muted-foreground">Discover peers on your local network</p>
                </div>
                <Switch
                  id="local-discovery"
                  checked={localDiscoveryEnabled}
                  onCheckedChange={setLocalDiscoveryEnabled}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="cache-size">Cache Size (MB)</Label>
                <Input id="cache-size" type="number" defaultValue="512" />
                <p className="text-sm text-muted-foreground">Size of the disk cache used for temporary storage</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bootstrap-nodes">Bootstrap Nodes</Label>
                <Input id="bootstrap-nodes" defaultValue="router.bittorrent.com:6881,dht.transmissionbt.com:6881" />
                <p className="text-sm text-muted-foreground">Comma-separated list of DHT bootstrap nodes</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="log-level">Log Level</Label>
                <Select defaultValue="info">
                  <SelectTrigger id="log-level">
                    <SelectValue placeholder="Select log level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="trace">Trace</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Level of detail for application logs</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-purple-light to-teal-light hover:from-purple-dark hover:to-teal-dark"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
