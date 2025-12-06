import { prisma } from '../../src/lib/db/prisma'

export const handler = async (req: Request) => {
  // Get current user (in a real app, you'd validate the auth token)
  const userId = 'test-user-id'
  
  try {
    const url = new URL(req.url)
    const linkId = url.searchParams.get('linkId')
    
    if (!linkId) {
      return new Response(JSON.stringify({ error: 'Link ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    // Check if link belongs to user
    const link = await prisma.link.findUnique({ where: { id: linkId, userId } })
    
    if (!link) {
      return new Response(JSON.stringify({ error: 'Link not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    // Get click statistics
    const clicks = await prisma.click.findMany({
      where: { linkId },
      orderBy: { createdAt: 'desc' },
    })
    
    // Get summary statistics
    const summary = await prisma.click.aggregate({
      where: { linkId },
      _count: { id: true },
      _min: { createdAt: true },
      _max: { createdAt: true },
    })
    
    // Get top referrers
    const topReferrers = await prisma.click.groupBy({
      by: ['referrer'],
      where: { linkId, referrer: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    })
    
    return new Response(JSON.stringify({ clicks, summary, topReferrers }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Stats API error:', error)
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export default handler