import { prisma } from '../src/lib/db/prisma'

export const handler = async (req: Request) => {
  try {
    const url = new URL(req.url)
    const slug = url.pathname.slice(1) // Remove leading slash
    
    if (!slug) {
      // If no slug is provided, redirect to the home page or show an error
      return new Response('Short Link System', {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      })
    }
    
    // Find the link in the database
    const link = await prisma.link.findUnique({ where: { slug } })
    
    if (!link) {
      // If the link doesn't exist, show a 404 page
      return new Response('Not Found', {
        status: 404,
        headers: {
          'Content-Type': 'text/html',
        },
      })
    }
    
    // Log the click event in the background
    prisma.click.create({
      data: {
        linkId: link.id,
        ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('remote-addr') || undefined,
        userAgent: req.headers.get('user-agent') || undefined,
        referrer: req.headers.get('referer') || undefined,
      },
    }).catch(error => {
      console.error('Error logging click:', error)
      // We don't want to fail the redirect if logging fails
    })
    
    // Redirect to the original URL
    return new Response(null, {
      status: 302,
      headers: {
        Location: link.originalUrl,
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Redirect error:', error)
    return new Response('Internal Server Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/html',
      },
    })
  }
}

export default handler