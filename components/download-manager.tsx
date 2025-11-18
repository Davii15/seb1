"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, Settings } from "lucide-react"

// Available downloads configuration
const DOWNLOADS = [
  {
    id: "seb-browser",
    name: "SEB Browser",
    description: "Secure Exam Browser for Windows",
    version: "3.7.0",
    size: "45.2 MB",
    icon: Download,
    primary: true,
  },
  {
    id: "seb-config",
    name: "SEB Configuration Tool",
    description: "Configure SEB settings and policies",
    version: "2.4.1",
    size: "12.8 MB",
    icon: Settings,
    primary: false,
  },
  {
    id: "user-manual",
    name: "User Manual",
    description: "Complete guide for SEB Browser",
    version: "2024.1",
    size: "2.1 MB",
    icon: FileText,
    primary: false,
  },
]

export function DownloadManager() {
  const handleDownload = (fileId: string, fileName: string) => {
    // Track the download
    const currentClicks = Number(localStorage.getItem(`${fileId}-clicks`) || "0")
    localStorage.setItem(`${fileId}-clicks`, (currentClicks + 1).toString())

    // Initiate download
    window.open(`/api/download/${fileId}`, "_blank")

    // Track successful download after delay
    setTimeout(() => {
      const currentDownloads = Number(localStorage.getItem(`${fileId}-downloads`) || "0")
      localStorage.setItem(`${fileId}-downloads`, (currentDownloads + 1).toString())
    }, 1000)
  }

  return (
    <div className="grid gap-6">
      {DOWNLOADS.map((download) => {
        const Icon = download.icon
        return (
          <Card
            key={download.id}
            className={`p-6 bg-white/70 backdrop-blur-sm border-blue-100 ${download.primary ? "ring-2 ring-blue-200" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${download.primary ? "bg-gradient-to-br from-blue-600 to-indigo-600" : "bg-gray-100"}`}
                >
                  <Icon className={`w-6 h-6 ${download.primary ? "text-white" : "text-gray-600"}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{download.name}</h3>
                  <p className="text-sm text-gray-600">{download.description}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">v{download.version}</span>
                    <span className="text-xs text-gray-500">{download.size}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleDownload(download.id, download.name)}
                variant={download.primary ? "default" : "outline"}
                className={
                  download.primary
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    : ""
                }
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
