"use client"

import { useState } from "react"
import { Download, File, FileText, ImageIcon, Music, Package, Search, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

// Sample search results
const searchResults = [
  {
    id: "1",
    name: "Research Paper on P2P Networks.pdf",
    size: 2.4,
    type: "document",
    peers: 15,
    hash: "QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX",
    seeders: 8,
  },
  {
    id: "2",
    name: "Introduction to Distributed Systems.pdf",
    size: 3.7,
    type: "document",
    peers: 12,
    hash: "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ",
    seeders: 5,
  },
  {
    id: "3",
    name: "Network Security Fundamentals.mp4",
    size: 245.8,
    type: "video",
    peers: 25,
    hash: "QmT8CUmZ7kZsMPPD4q6P9GcXEcKxUPZGh8vNmMZyLGkxVt",
    seeders: 18,
  },
  {
    id: "4",
    name: "Blockchain Technology Overview.pptx",
    size: 15.2,
    type: "document",
    peers: 9,
    hash: "QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51",
    seeders: 4,
  },
  {
    id: "5",
    name: "Distributed Hash Tables Explained.mp4",
    size: 178.5,
    type: "video",
    peers: 32,
    hash: "QmZXf2PnUHfMquMfNUQHkQ8RhCYsZktBi4zLqx2XN4Lrh5",
    seeders: 22,
  },
  {
    id: "6",
    name: "P2P Architecture Diagrams.zip",
    size: 45.3,
    type: "archive",
    peers: 7,
    hash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    seeders: 3,
  },
  {
    id: "7",
    name: "Kademlia Protocol Implementation.zip",
    size: 12.8,
    type: "archive",
    peers: 14,
    hash: "QmTkzDwWqPbnAh5YiV5VwcTLnGdwSNsNTn2aDxdXBFca7D",
    seeders: 9,
  },
  {
    id: "8",
    name: "Decentralized Applications.pdf",
    size: 5.2,
    type: "document",
    peers: 18,
    hash: "QmVcSqVEsvm5RR9mBLjwpb2XjFVn5bPdPL69mL8PH45pPC",
    seeders: 11,
  },
]

// Function to get the appropriate icon based on file type
const getFileIcon = (type: string) => {
  switch (type) {
    case "document":
      return <FileText className="h-8 w-8 text-blue-500" />
    case "image":
      return <ImageIcon className="h-8 w-8 text-green-500" />
    case "video":
      return <Video className="h-8 w-8 text-red-500" />
    case "audio":
      return <Music className="h-8 w-8 text-purple-500" />
    case "archive":
      return <Package className="h-8 w-8 text-yellow-500" />
    default:
      return <File className="h-8 w-8 text-gray-500" />
  }
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [fileType, setFileType] = useState("all")
  const [minPeers, setMinPeers] = useState(0)
  const [sortBy, setSortBy] = useState("relevance")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const { toast } = useToast()

  const handleSearch = () => {
    if (!query.trim()) {
      toast({
        title: "Search query required",
        description: "Please enter a search term.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      // Filter results based on search criteria
      const filtered = searchResults.filter((result) => {
        const matchesQuery = result.name.toLowerCase().includes(query.toLowerCase())
        const matchesType = fileType === "all" || result.type === fileType
        const matchesPeers = result.peers >= minPeers

        return matchesQuery && matchesType && matchesPeers
      })

      // Sort results
      const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name)
        } else if (sortBy === "size") {
          return a.size - b.size
        } else if (sortBy === "peers") {
          return b.peers - a.peers
        }
        // Default: relevance (we'll just use peers count as a proxy for relevance)
        return b.peers - a.peers
      })

      setResults(sorted)
      setIsSearching(false)

      toast({
        title: `Found ${sorted.length} results`,
        description: `Search completed for "${query}"`,
      })
    }, 1500)
  }

  const handleDownload = (file: any) => {
    toast({
      title: "Download started",
      description: `${file.name} has been added to your downloads.`,
    })
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-gradient-to-br from-purple-light/10 via-transparent to-teal-light/10">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-purple-light to-teal-light bg-clip-text text-transparent">
            Search P2P Network
          </CardTitle>
          <CardDescription>Search for files shared across the peer-to-peer network</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for files..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>File Type</Label>
              <RadioGroup value={fileType} onValueChange={setFileType} className="mt-2 space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All Types</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="document" id="document" />
                  <Label htmlFor="document">Documents</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video">Videos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="audio" id="audio" />
                  <Label htmlFor="audio">Audio</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="image" />
                  <Label htmlFor="image">Images</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="archive" id="archive" />
                  <Label htmlFor="archive">Archives</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Minimum Peers</Label>
              <div className="mt-6">
                <Slider value={[minPeers]} onValueChange={(value) => setMinPeers(value[0])} max={30} step={1} />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>0</span>
                  <span>{minPeers} peers</span>
                  <span>30+</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="sort-by">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="mt-2">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                  <SelectItem value="peers">Number of Peers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Search Results</h2>

        {isSearching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md" />
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md" />
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="h-4 w-full bg-muted animate-pulse rounded-md mb-2" />
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md" />
                </CardContent>
                <CardFooter>
                  <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((file) => (
              <Card
                key={file.id}
                className="overflow-hidden border border-transparent hover:border-primary/50 transition-colors"
              >
                <CardHeader className="pb-2 bg-gradient-to-r from-purple-light/10 to-teal-light/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <div>
                        <CardTitle className="text-base truncate max-w-[200px]">{file.name}</CardTitle>
                        <CardDescription>{file.size} MB</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-light">{file.peers} peers</span>
                    <span className="text-teal-light">{file.seeders} seeders</span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground truncate mt-1">{file.hash}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="bg-gradient-to-r from-purple-light to-teal-light hover:from-purple-dark hover:to-teal-dark"
                    onClick={() => handleDownload(file)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <File className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-medium">No results found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-medium">Search the P2P network</h3>
            <p className="text-muted-foreground">Enter a search term above to find files</p>
          </div>
        )}
      </div>
    </div>
  )
}
