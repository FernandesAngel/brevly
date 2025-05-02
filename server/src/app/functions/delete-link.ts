import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'

export async function deleteLinkByShortLink(
  shortLink: string
): Promise<boolean> {
  const result = await db
    .delete(schema.links)
    .where(eq(schema.links.shortLink, shortLink))
    .returning({ id: schema.links.id })

  return result.length > 0
}
