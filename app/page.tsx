"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Users, Clock, Settings, BookOpen, CheckCircle, ExternalLink, ChevronDown } from 'lucide-react'

interface AnalyticsData {
  totalVisits: number
  sebClicks: number
  sebDownloads: number
  configClicks: number
  configDownloads: number
  today: string
  todayVisits: number
  todayDate: string
}

export default function HomePage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [showSebOptions, setShowSebOptions] = useState(false)

  const loadAnalytics = () => {
    const stored = localStorage.getItem("seb-analytics")
    const today = new Date().toISOString().split("T")[0]
    
    let data: AnalyticsData = stored ? JSON.parse(stored) : {
      totalVisits: 0,
      sebClicks: 0,
      sebDownloads: 0,
      configClicks: 0,
      configDownloads: 0,
      today: today,
      todayVisits: 0,
      todayDate: today
    }

    // Reset daily stats if date changed
    if (data.today !== today) {
      data.today = today
      data.todayVisits = 0
      data.sebClicks = 0
      data.sebDownloads = 0
      data.configClicks = 0
      data.configDownloads = 0
    }

    // Increment total visits and today visits on page load
    data.totalVisits += 1
    data.todayVisits += 1
    
    localStorage.setItem("seb-analytics", JSON.stringify(data))
    setAnalytics(data)
  }

  const trackEvent = (eventType: string) => {
    const stored = localStorage.getItem("seb-analytics")
    const data = stored ? JSON.parse(stored) : {}
    
    if (eventType === "seb-click") data.sebClicks = (data.sebClicks || 0) + 1
    if (eventType === "seb-download") data.sebDownloads = (data.sebDownloads || 0) + 1
    if (eventType === "config-click") data.configClicks = (data.configClicks || 0) + 1
    if (eventType === "config-download") data.configDownloads = (data.configDownloads || 0) + 1
    
    localStorage.setItem("seb-analytics", JSON.stringify(data))
    loadAnalytics()
  }

  useEffect(() => {
    loadAnalytics()
  }, [])

  const handleDirectDownload = () => {
    trackEvent("seb-click")
    window.open("/seb-browser.exe", "_blank")
    setTimeout(() => trackEvent("seb-download"), 1000)
  }

  const handleGoogleDriveDownload = () => {
    trackEvent("seb-click")
    // Replace with actual Google Drive link
    window.open("https://drive.google.com/", "_blank")
    setTimeout(() => trackEvent("seb-download"), 1000)
  }

  const handleConfigDownloadClick = () => {
    trackEvent("config-click")
    window.open("/seb-config.exe", "_blank")
    setTimeout(() => trackEvent("config-download"), 1000)
  }

  if (!analytics) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-exam-dark via-exam-accent to-exam-secondary">
      {/* Navigation */}
      <nav className="bg-exam-dark/95 backdrop-blur-md border-b border-exam-accent sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-exam-primary to-exam-accent rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Kagumo Downloader</h1>
                <p className="text-xs text-exam-light/70">Teachers College</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-exam-light hover:text-exam-primary font-medium transition-colors">
                Home
              </a>
              <a href="#download" className="text-exam-light hover:text-exam-primary font-medium transition-colors">
                Download
              </a>
              <a href="#support" className="text-exam-light hover:text-exam-primary font-medium transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance drop-shadow-lg animate-fade-in-up">
            WELCOME TO THE KAGUMO DOWNLOADER SITE
          </h1>
          <p className="text-lg text-exam-light max-w-3xl mx-auto leading-relaxed">
            Download the Secure Exam Browser (SEB) for safe, controlled examination environments. Trusted by Kagumo Teachers College for secure assessments.
          </p>
        </div>

        {/* Download Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-white/10 backdrop-blur-xl border border-exam-primary/30 shadow-2xl hover:shadow-exam-primary/20 transition-all">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-exam-primary to-exam-accent rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Download className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">SEB Browser</h2>
                <p className="text-exam-light/80">Secure Exam Browser Application</p>
              </div>
              
              {/* Dropdown for download options */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowSebOptions(!showSebOptions)}
                  className="w-full bg-gradient-to-r from-exam-primary to-exam-accent hover:from-exam-primary/80 hover:to-exam-accent/80 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download SEB Browser
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSebOptions ? 'rotate-180' : ''}`} />
                </button>
                
                {showSebOptions && (
                  <div className="space-y-2 animate-fade-in">
                    <Button
                      onClick={handleDirectDownload}
                      variant="outline"
                      className="w-full bg-white/20 border-exam-primary text-white hover:bg-white/30 py-3 rounded-lg transition-all duration-200"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Direct Download (.exe)
                    </Button>
                    <Button
                      onClick={handleGoogleDriveDownload}
                      variant="outline"
                      className="w-full bg-white/20 border-exam-primary text-white hover:bg-white/30 py-3 rounded-lg transition-all duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Download via Google Drive
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="text-sm text-exam-light/90 bg-white/5 rounded-lg py-2">
                Today: <span className="font-bold text-exam-primary">{analytics.sebDownloads}</span> downloads
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white/10 backdrop-blur-xl border border-exam-secondary/30 shadow-2xl hover:shadow-exam-secondary/20 transition-all">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-exam-secondary to-exam-accent rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Settings className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Configuration Tool</h2>
                <p className="text-exam-light/80">SEB Configuration Manager</p>
              </div>
              <Button
                onClick={handleConfigDownloadClick}
                size="lg"
                className="w-full bg-gradient-to-r from-exam-secondary to-exam-accent hover:from-exam-secondary/80 hover:to-exam-accent/80 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Config Tool
              </Button>
              <div className="text-sm text-exam-light/90 bg-white/5 rounded-lg py-2">
                Today: <span className="font-bold text-exam-secondary">{analytics.configDownloads}</span> downloads
              </div>
            </div>
          </Card>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border border-exam-primary/30 text-center">
            <Users className="w-8 h-8 text-exam-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">{analytics.totalVisits}</div>
            <div className="text-sm text-exam-light/80">Total Visits</div>
          </Card>
          <Card className="p-6 bg-white/10 backdrop-blur-xl border border-exam-primary/30 text-center">
            <Clock className="w-8 h-8 text-exam-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">{analytics.todayVisits}</div>
            <div className="text-sm text-exam-light/80">Today's Visits</div>
          </Card>
          <Card className="p-6 bg-white/10 backdrop-blur-xl border border-exam-secondary/30 text-center">
            <CheckCircle className="w-8 h-8 text-exam-secondary mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">{analytics.sebClicks}</div>
            <div className="text-sm text-exam-light/80">SEB Clicks (Today)</div>
          </Card>
          <Card className="p-6 bg-white/10 backdrop-blur-xl border border-exam-secondary/30 text-center">
            <CheckCircle className="w-8 h-8 text-exam-secondary mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">{analytics.configClicks}</div>
            <div className="text-sm text-exam-light/80">Config Clicks (Today)</div>
          </Card>
        </div>

        {/* Information Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border border-exam-primary/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-exam-primary" />
              System Requirements
            </h3>
            <ul className="space-y-3 text-exam-light/90">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-exam-primary rounded-full mr-3"></div>
                Windows 10 or later
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-exam-primary rounded-full mr-3"></div>
                4GB RAM minimum
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-exam-primary rounded-full mr-3"></div>
                100MB free disk space
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-exam-primary rounded-full mr-3"></div>
                Internet connection required
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-xl border border-exam-secondary/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-exam-secondary" />
              Key Features
            </h3>
            <ul className="space-y-3 text-exam-light/90">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-exam-secondary rounded-full mr-3"></div>
                Secure examination environment
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-exam-secondary rounded-full mr-3"></div>
                Prevents unauthorized access
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-exam-secondary rounded-full mr-3"></div>
                Easy configuration and deployment
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-exam-secondary rounded-full mr-3"></div>
                Institution-ready solution
              </li>
            </ul>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-exam-dark/95 backdrop-blur-md border-t border-exam-accent/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-exam-primary to-exam-accent rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">Kagumo Teachers College</span>
            </div>
            <div className="text-sm text-exam-light/80 space-y-1">
              <p className="font-semibold">ALL RIGHTS RESERVED</p>
              <p>THIS IS A PROPERTY OF KAGUMO TEACHERS COLLEGE</p>
            </div>
            <div className="text-xs text-exam-light/60">
              © {new Date().getFullYear()} Kagumo Teachers College. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
