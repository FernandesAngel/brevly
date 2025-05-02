import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'

type GetOriginalLinkOutput = {
  id: string
  originalLink: string
  shortLink: string
  accessCount: string | null
  createdAt: Date
} | null

export async function getOriginalLinkAndIncrement(
  shortLink: string
): Promise<GetOriginalLinkOutput> {
  const result = await db
    .select({
      id: schema.links.id,
      originalLink: schema.links.originalLink,
      shortLink: schema.links.shortLink,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .where(eq(schema.links.shortLink, shortLink))
    .limit(1)

  if (result.length === 0) {
    return null
  }

  const link = result[0]
  const currentCount = Number.parseInt(link.accessCount ?? '0', 10)
  const newCount = (currentCount + 1).toString()

  await db
    .update(schema.links)
    .set({ accessCount: newCount })
    .where(eq(schema.links.shortLink, shortLink))

  return { ...link, accessCount: newCount }
}
