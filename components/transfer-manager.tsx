"use client"

import { useEffect, useState } from "react"
import { Ban, Download, FileDown, FileUp, Pause, Play, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// Sample data for transfers
const initialDownloads = [
  {
    id: "d1",
    name: "Large Dataset.csv",
    size: 345.8,
    progress: 45,
    speed: 2.3,
    peers: 8,
    status: "downloading",
    eta: "10:25",
  },
  {
    id: "d2",
    name: "Software Update.zip",
    size: 1240.5,
    progress: 12,
    speed: 1.8,
    peers: 5,
    status: "downloading",
    eta: "32:40",
  },
  {
    id: "d3",
    name: "Research Papers.zip",
    size: 89.2,
    progress: 78,
    speed: 3.2,
    peers: 12,
    status: "downloading",
    eta: "03:15",
  },
]

const initialUploads = [
  {
    id: "u1",
    name: "Project Documentation.pdf",
    size: 2.4,
    peers: 3,
    speed: 0.8,
    status: "uploading",
  },
  {
    id: "u2",
    name: "Presentation.pptx",
    size: 15.2,
    peers: 1,
    speed: 0.3,
    status: "uploading",
  },
]

export function TransferManager() {
  const [downloads, setDownloads] = useState(initialDownloads)
  const [uploads, setUploads] = useState(initialUploads)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate progress updates for downloads
    const interval = setInterval(() => {
      setDownloads((prevDownloads) =>
        prevDownloads.map((download) => {
          if (download.status === "downloading") {
            const newProgress = download.progress + Math.random() * 2

            if (newProgress >= 100) {
              toast({
                title: "Download Complete",
                description: `${download.name} has been downloaded successfully.`,
              })

              return {
                ...download,
                progress: 100,
                status: "completed",
                eta: "00:00",
              }
            }

            return {
              ...download,
              progress: newProgress,
              speed: Math.random() * 3 + 1,
              eta: calculateEta(download.size, newProgress, Math.random() * 3 + 1),
            }
          }
          return download
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [toast])

  const calculateEta = (size: number, progress: number, speed: number) => {
    const remaining = (size * (100 - progress)) / 100
    const seconds = remaining / speed
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePauseResume = (id: string) => {
    setDownloads((prevDownloads) =>
      prevDownloads.map((download) => {
        if (download.id === id) {
          const newStatus = download.status === "downloading" ? "paused" : "downloading"
          toast({
            title: newStatus === "downloading" ? "Download Resumed" : "Download Paused",
            description: `${download.name} has been ${newStatus === "downloading" ? "resumed" : "paused"}.`,
          })

          return {
            ...download,
            status: newStatus,
          }
        }
        return download
      }),
    )
  }

  const handleCancel = (id: string) => {
    setDownloads((prevDownloads) => prevDownloads.filter((download) => download.id !== id))

    toast({
      title: "Download Cancelled",
      description: "The download has been cancelled.",
    })
  }

  const handleStopUpload = (id: string) => {
    setUploads((prevUploads) => prevUploads.filter((upload) => upload.id !== id))

    toast({
      title: "Upload Stopped",
      description: "The upload has been stopped.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Manager</CardTitle>
        <CardDescription>Manage your downloads and uploads</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="downloads">
          <TabsList className="bg-gradient-to-r from-purple-light/20 to-teal-light/20 dark:from-purple-dark/20 dark:to-teal-dark/20">
            <TabsTrigger value="downloads" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Downloads ({downloads.length})
            </TabsTrigger>
            <TabsTrigger value="uploads" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Uploads ({uploads.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="downloads" className="mt-4">
            <div className="space-y-4">
              {downloads.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileDown className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No active downloads</p>
                </div>
              ) : (
                downloads.map((download) => (
                  <div
                    key={download.id}
                    className="border rounded-md p-4 bg-gradient-to-r from-purple-light/5 to-teal-light/5"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{download.name}</h4>
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                          <span>{download.size} MB</span>
                          <span>{download.peers} peers</span>
                          {download.status === "downloading" && (
                            <>
                              <span>{download.speed.toFixed(1)} MB/s</span>
                              <span>ETA: {download.eta}</span>
                            </>
                          )}
                          {download.status === "paused" && <span className="text-amber-light">Paused</span>}
                          {download.status === "completed" && <span className="text-emerald-light">Completed</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {download.status !== "completed" && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => handlePauseResume(download.id)}>
                              {download.status === "downloading" ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                              <span className="sr-only">{download.status === "downloading" ? "Pause" : "Resume"}</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleCancel(download.id)}>
                              <Ban className="h-4 w-4" />
                              <span className="sr-only">Cancel</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <Progress
                      value={download.progress}
                      className="h-2 bg-muted"
                      indicatorClassName={
                        download.status === "completed"
                          ? "bg-emerald-light"
                          : "bg-gradient-to-r from-purple-light to-teal-light"
                      }
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>{download.progress.toFixed(1)}%</span>
                      <span>
                        {((download.size * download.progress) / 100).toFixed(1)} MB / {download.size} MB
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="uploads" className="mt-4">
            <div className="space-y-4">
              {uploads.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No active uploads</p>
                </div>
              ) : (
                uploads.map((upload) => (
                  <div key={upload.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{upload.name}</h4>
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                          <span>{upload.size} MB</span>
                          <span>{upload.peers} peers</span>
                          <span>{upload.speed.toFixed(1)} MB/s</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleStopUpload(upload.id)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Stop Upload</span>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
