import { prisma } from '../../src/lib/db/prisma'
import { createUniqueSlug } from '../../src/lib/utils/shortenUrl'

export const handler = async (req: Request) => {
  // Get current user (in a real app, you'd validate the auth token)
  // For now, we'll simulate a user
  const userId = 'test-user-id'
  
  try {
    if (req.method === 'POST') {
      // Create new short link
      const { originalUrl, customSlug, title, description } = await req.json()
      
      if (!originalUrl) {
        return new Response(JSON.stringify({ error: 'Original URL is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      
      const slug = await createUniqueSlug(customSlug)
      
      const link = await prisma.link.create({
        data: {
          slug,
          originalUrl,
          title,
          description,
          userId,
        },
      })
      
      return new Response(JSON.stringify(link), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    if (req.method === 'GET') {
      // Get all links for current user
      const links = await prisma.link.findMany({
        where: { userId },
        include: {
          _count: { select: { clicks: true } },
        },
        orderBy: { createdAt: 'desc' },
      })
      
      return new Response(JSON.stringify(links), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    if (req.method === 'PUT') {
      // Update existing link
      const { id, originalUrl, customSlug, title, description } = await req.json()
      
      if (!id) {
        return new Response(JSON.stringify({ error: 'Link ID is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      
      // Check if link exists and belongs to user
      const existingLink = await prisma.link.findUnique({
        where: { id, userId },
      })
      
      if (!existingLink) {
        return new Response(JSON.stringify({ error: 'Link not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      
      let slug = existingLink.slug
      if (customSlug && customSlug !== slug) {
        slug = await createUniqueSlug(customSlug)
      }
      
      const updatedLink = await prisma.link.update({
        where: { id },
        data: {
          slug,
          originalUrl: originalUrl || existingLink.originalUrl,
          title: title !== undefined ? title : existingLink.title,
          description: description !== undefined ? description : existingLink.description,
        },
      })
      
      return new Response(JSON.stringify(updatedLink), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    if (req.method === 'DELETE') {
      // Delete link
      const { id } = await req.json()
      
      if (!id) {
        return new Response(JSON.stringify({ error: 'Link ID is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      
      // Check if link exists and belongs to user
      const existingLink = await prisma.link.findUnique({
        where: { id, userId },
      })
      
      if (!existingLink) {
        return new Response(JSON.stringify({ error: 'Link not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      
      await prisma.link.delete({ where: { id } })
      
      return new Response(JSON.stringify({ message: 'Link deleted successfully' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Links API error:', error)
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export default handler