import { readFile, writeFile } from "fs/promises"
import { join } from "path"

interface AnalyticsData {
  lastUpdated: string
  totalVisits: number
  dailyStats: {
    [date: string]: {
      visits: number
      sebClicks: number
      sebDownloads: number
      configClicks: number
      configDownloads: number
    }
  }
}

const ANALYTICS_FILE = join(process.cwd(), "analytics.json")

async function getAnalytics(): Promise<AnalyticsData> {
  try {
    const data = await readFile(ANALYTICS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return {
      lastUpdated: new Date().toISOString(),
      totalVisits: 0,
      dailyStats: {},
    }
  }
}

async function saveAnalytics(data: AnalyticsData) {
  await writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2))
}

export async function POST(req: Request) {
  try {
    const { eventType } = await req.json()
    const today = new Date().toISOString().split("T")[0]

    const analytics = await getAnalytics()

    if (!analytics.dailyStats[today]) {
      analytics.dailyStats[today] = {
        visits: 0,
        sebClicks: 0,
        sebDownloads: 0,
        configClicks: 0,
        configDownloads: 0,
      }
    }

    switch (eventType) {
      case "page-visit":
        analytics.totalVisits++
        analytics.dailyStats[today].visits++
        break
      case "seb-click":
        analytics.dailyStats[today].sebClicks++
        break
      case "seb-download":
        analytics.dailyStats[today].sebDownloads++
        break
      case "config-click":
        analytics.dailyStats[today].configClicks++
        break
      case "config-download":
        analytics.dailyStats[today].configDownloads++
        break
    }

    analytics.lastUpdated = new Date().toISOString()
    await saveAnalytics(analytics)

    return Response.json({ success: true })
  } catch (error) {
    console.error("Analytics error:", error)
    return Response.json({ error: "Failed to track event" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const analytics = await getAnalytics()
    return Response.json(analytics)
  } catch (error) {
    console.error("Analytics error:", error)
    return Response.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
