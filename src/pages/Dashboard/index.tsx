import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

// Define types
interface Link {
  id: string
  slug: string
  originalUrl: string
  title?: string
  description?: string
  createdAt: Date
  updatedAt: Date
  _count: {
    clicks: number
  }
}

const Dashboard: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  
  // Form state
  const [originalUrl, setOriginalUrl] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  // Fetch links from API
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('/api/links', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setLinks(data)
        }
      } catch (error) {
        console.error('Failed to fetch links:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchLinks()
  }, [])
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalUrl,
          customSlug,
          title,
          description
        })
      })
      
      if (response.ok) {
        const newLink = await response.json()
        setLinks([newLink, ...links])
        // Reset form
        setOriginalUrl('')
        setCustomSlug('')
        setTitle('')
        setDescription('')
        setShowCreateForm(false)
      }
    } catch (error) {
      console.error('Failed to create link:', error)
    }
  }
  
  // Handle delete link
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      try {
        const response = await fetch('/api/links', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        })
        
        if (response.ok) {
          setLinks(links.filter(link => link.id !== id))
        }
      } catch (error) {
        console.error('Failed to delete link:', error)
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Short Links</h1>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Link
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Create Link Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Short Link</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Original URL *
                  </label>
                  <Input
                    id="originalUrl"
                    type="url"
                    placeholder="https://example.com"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Slug (Optional)
                  </label>
                  <Input
                    id="customSlug"
                    type="text"
                    placeholder="custom-slug"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title (Optional)
                  </label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Link Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Link Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Link
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        )}
        
        {/* Links List */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Links</h2>
            
            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : links.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No links yet. Create your first link above!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {links.map((link) => (
                  <div key={link.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium text-gray-900 mr-2">{link.title || 'Untitled'}</h3>
                        <span className="text-sm text-gray-500">({link._count.clicks} clicks)</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{link.originalUrl}</p>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-primary mr-2">
                          {window.location.origin}/{link.slug}
                        </span>
                        <button 
                          className="text-sm text-gray-500 hover:text-gray-700 mr-3"
                          onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${link.slug}`)}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3 sm:mt-0">
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}

export default Dashboard