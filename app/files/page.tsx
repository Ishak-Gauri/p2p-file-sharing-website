import { FileExplorer } from "@/components/file-explorer"

export default function FilesPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">My Shared Files</h1>
      <p className="text-muted-foreground">Manage the files you are sharing on the P2P network</p>

      <FileExplorer />
    </div>
  )
}
