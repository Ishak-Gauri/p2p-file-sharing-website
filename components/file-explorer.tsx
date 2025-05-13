"use client"

import { useState } from "react"
import { Download, File, FileText, ImageIcon, Music, Package, Share2, Trash2, Video } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// Sample data for shared files
const sharedFiles = [
  {
    id: "1",
    name: "Project Documentation.pdf",
    size: 2.4,
    type: "document",
    dateAdded: "2025-05-01",
    peers: 8,
    hash: "QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX",
  },
  {
    id: "2",
    name: "Vacation Photos.zip",
    size: 156.7,
    type: "archive",
    dateAdded: "2025-05-03",
    peers: 3,
    hash: "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ",
  },
  {
    id: "3",
    name: "Presentation.pptx",
    size: 15.2,
    type: "document",
    dateAdded: "2025-05-05",
    peers: 5,
    hash: "QmT8CUmZ7kZsMPPD4q6P9GcXEcKxUPZGh8vNmMZyLGkxVt",
  },
  {
    id: "4",
    name: "Research Paper.docx",
    size: 1.8,
    type: "document",
    dateAdded: "2025-05-06",
    peers: 2,
    hash: "QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51",
  },
  {
    id: "5",
    name: "Song Collection.mp3",
    size: 45.3,
    type: "audio",
    dateAdded: "2025-05-07",
    peers: 12,
    hash: "QmZXf2PnUHfMquMfNUQHkQ8RhCYsZktBi4zLqx2XN4Lrh5",
  },
]

// Update the file type icons to use our new vibrant colors
const getFileIcon = (type: string) => {
  switch (type) {
    case "document":
      return <FileText className="h-8 w-8 text-purple-light" />
    case "image":
      return <ImageIcon className="h-8 w-8 text-emerald-light" />
    case "video":
      return <Video className="h-8 w-8 text-pink-light" />
    case "audio":
      return <Music className="h-8 w-8 text-teal-light" />
    case "archive":
      return <Package className="h-8 w-8 text-amber-light" />
    default:
      return <File className="h-8 w-8 text-coral-light" />
  }
}

export function FileExplorer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const { toast } = useToast()

  const filteredFiles = sharedFiles.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleShare = (file: any) => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(`p2p://${file.hash}`)
    toast({
      title: "Link copied to clipboard",
      description: `Share link for ${file.name} has been copied.`,
    })
  }

  const handleDelete = (id: string) => {
    // In a real app, this would remove the file from sharing
    toast({
      title: "File removed from sharing",
      description: "The file will no longer be available to other peers.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <File className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Share New File</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share a File</DialogTitle>
              <DialogDescription>Select a file from your computer to share on the P2P network.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <Input id="file" type="file" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input id="description" placeholder="Add a description for this file" />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  toast({
                    title: "File shared successfully",
                    description: "Your file is now available on the P2P network.",
                  })
                }}
              >
                Share File
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center">
          <TabsList className="bg-gradient-to-r from-purple-light/20 to-teal-light/20 dark:from-purple-dark/20 dark:to-teal-dark/20">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
          <span className="text-sm text-muted-foreground">{filteredFiles.length} files</span>
        </div>

        <TabsContent value="grid" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <div>
                        <CardTitle className="text-base truncate max-w-[200px]">{file.name}</CardTitle>
                        <CardDescription>{file.size} MB</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{file.peers} peers</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-xs text-muted-foreground">
                    Added on {new Date(file.dateAdded).toLocaleDateString()}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground truncate mt-1">{file.hash}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleShare(file)}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-2 p-3 border-b bg-muted/50 text-sm font-medium">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Added</div>
              <div className="col-span-1">Peers</div>
              <div className="col-span-2">Actions</div>
            </div>
            {filteredFiles.map((file) => (
              <div key={file.id} className="grid grid-cols-12 gap-2 p-3 border-b items-center hover:bg-accent/10">
                <div className="col-span-5 flex items-center gap-2">
                  {getFileIcon(file.type)}
                  <span className="truncate">{file.name}</span>
                </div>
                <div className="col-span-2">{file.size} MB</div>
                <div className="col-span-2">{new Date(file.dateAdded).toLocaleDateString()}</div>
                <div className="col-span-1">{file.peers}</div>
                <div className="col-span-2 flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleShare(file)}>
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedFile} onOpenChange={(open) => !open && setSelectedFile(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {getFileIcon(selectedFile.type)}
                <div>
                  <h3 className="font-medium">{selectedFile.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedFile.size} MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Date Added</div>
                <div>{new Date(selectedFile.dateAdded).toLocaleDateString()}</div>

                <div className="font-medium">Connected Peers</div>
                <div>{selectedFile.peers}</div>

                <div className="font-medium">Content Hash</div>
                <div className="font-mono text-xs break-all">{selectedFile.hash}</div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => handleShare(selectedFile)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Link
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
