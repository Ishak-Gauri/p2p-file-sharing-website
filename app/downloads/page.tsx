import { TransferManager } from "@/components/transfer-manager"

export default function DownloadsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Downloads</h1>
      <p className="text-muted-foreground">Manage your active and completed downloads</p>

      <TransferManager />
    </div>
  )
}
