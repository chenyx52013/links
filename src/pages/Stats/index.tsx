import React, { useState, useEffect } from 'react'
import { ArrowLeft, Calendar, Clock, Globe, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

// Define types
interface Click {
  id: string
  linkId: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
  createdAt: Date
}

interface Summary {
  _count: {
    id: number
  }
  _min: {
    createdAt: Date | null
  }
  _max: {
    createdAt: Date | null
  }
}

interface TopReferrer {
  referrer?: string
  _count: {
    id: number
  }
}

interface StatsData {
  clicks: Click[]
  summary: Summary
  topReferrers: TopReferrer[]
}

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [linkId, setLinkId] = useState<string | null>(null)
  
  // Get linkId from URL params (in a real app, you'd use react-router)
  useEffect(() => {
    // For demo purposes, we'll use a mock linkId
    // In a real app, you'd get this from the URL
    setLinkId('test-link-id')
  }, [])
  
  // Fetch stats data
  useEffect(() => {
    if (!linkId) return
    
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/stats?linkId=${linkId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [linkId])
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Links
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Link Statistics</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : !stats ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No statistics available.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Clicks</p>
                      <h3 className="text-3xl font-bold mt-1">{stats.summary._count.id}</h3>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <LinkIcon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">First Click</p>
                      <h3 className="text-lg font-semibold mt-1">
                        {stats.summary._min.createdAt ? new Date(stats.summary._min.createdAt).toLocaleString() : 'N/A'}
                      </h3>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Last Click</p>
                      <h3 className="text-lg font-semibold mt-1">
                        {stats.summary._max.createdAt ? new Date(stats.summary._max.createdAt).toLocaleString() : 'N/A'}
                      </h3>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Top Referrers */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Top Referrers</h2>
                
                {stats.topReferrers.length === 0 ? (
                  <p className="text-gray-500">No referrer data available.</p>
                ) : (
                  <div className="space-y-3">
                    {stats.topReferrers.map((referrer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 text-gray-500 mr-3" />
                          <span className="font-medium">
                            {referrer.referrer || 'Direct'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{referrer._count.id} clicks</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
            
            {/* Recent Clicks */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Clicks</h2>
                
                {stats.clicks.length === 0 ? (
                  <p className="text-gray-500">No click data available.</p>
                ) : (
                  <div className="space-y-3">
                    {stats.clicks.map((click) => (
                      <div key={click.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <Clock className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm font-medium">
                              {new Date(click.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            {click.ipAddress && (
                              <span className="mr-4">IP: {click.ipAddress}</span>
                            )}
                            {click.userAgent && (
                              <span className="mr-4">UA: {click.userAgent.substring(0, 50)}...</span>
                            )}
                            {click.referrer && (
                              <span>Referrer: {click.referrer}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

export default Stats