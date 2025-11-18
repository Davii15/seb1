import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

// Define available files for download
const AVAILABLE_FILES = {
  "seb-browser": {
    filename: "seb-browser.exe",
    displayName: "SEB Browser",
    version: "3.7.0",
    size: "45.2 MB",
  },
  "seb-config": {
    filename: "seb-config-tool.exe",
    displayName: "SEB Configuration Tool",
    version: "2.4.1",
    size: "12.8 MB",
  },
  // Add more files here as needed
}

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const fileKey = params.filename
    const fileInfo = AVAILABLE_FILES[fileKey as keyof typeof AVAILABLE_FILES]

    if (!fileInfo) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // File path in your project (you can store files in a private folder)
    const filePath = path.join(process.cwd(), "downloads", fileInfo.filename)

    try {
      const fileBuffer = await fs.readFile(filePath)

      // Track download (you could save to database here)
      console.log(`[v0] Download initiated for ${fileInfo.displayName}`)

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename="${fileInfo.filename}"`,
          "Content-Length": fileBuffer.length.toString(),
        },
      })
    } catch (error) {
      console.error("[v0] File read error:", error)
      return NextResponse.json({ error: "File not accessible" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Download error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
