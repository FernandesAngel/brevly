import { getLinks } from '@/app/functions/get-links'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get links',
        tags: ['links'],
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                originalLink: z.string(),
                shortLink: z.string(),
                accessCount: z.string().optional().nullable(),
                createdAt: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getLinks()

      const { links } = unwrapEither(result)

      return reply.status(200).send({ links })
    }
  )
}
