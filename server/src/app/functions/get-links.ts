import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { desc } from 'drizzle-orm'

type GetLinksOutput = {
  links: {
    id: string
    originalLink: string
    shortLink: string
    accessCount?: string | null
    createdAt: Date
  }[]
}

export async function getLinks(): Promise<Either<never, GetLinksOutput>> {
  const [links] = await Promise.all([
    db
      .select({
        id: schema.links.id,
        originalLink: schema.links.originalLink,
        shortLink: schema.links.shortLink,
        accessCount: schema.links.accessCount,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .orderBy(fields => {
        return desc(fields.id)
      }),
  ])

  return makeRight({ links })
}
