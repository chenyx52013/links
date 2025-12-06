import { prisma } from '../db/prisma'

export const generateSlug = (length: number = 6): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let slug = ''
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return slug
}

export const createUniqueSlug = async (customSlug?: string): Promise<string> => {
  if (customSlug) {
    const existing = await prisma.link.findUnique({ where: { slug: customSlug } })
    if (!existing) return customSlug
    throw new Error('Custom slug already exists')
  }
  
  let slug: string
  let existing: any
  do {
    slug = generateSlug()
    existing = await prisma.link.findUnique({ where: { slug } })
  } while (existing)
  
  return slug
}