import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'

type CreateLinkInput = {
  originalLink: string
  shortLink: string
}

export async function createLink({
  originalLink,
  shortLink,
}: CreateLinkInput): Promise<
  Either<
    'LINK_ALREADY_EXISTS',
    {
      id: string
      originalLink: string
      shortLink: string
      accessCount: string | null
      createdAt: Date
    }
  >
> {
  const normalizedShortLink = shortLink.trim().toLowerCase()

  const existing = await db
    .select({ id: schema.links.id })
    .from(schema.links)
    .where(eq(schema.links.shortLink, normalizedShortLink))

  if (existing.length > 0) {
    return makeLeft('LINK_ALREADY_EXISTS')
  }

  const [link] = await db
    .insert(schema.links)
    .values({
      originalLink,
      shortLink: normalizedShortLink,
      accessCount: '0',
    })
    .returning({
      id: schema.links.id,
      originalLink: schema.links.originalLink,
      shortLink: schema.links.shortLink,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })

  return makeRight(link)
}
