import { getOriginalLinkAndIncrement } from '@/app/functions/get-original-link'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getOriginalLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/:shortLink',
    {
      schema: {
        summary: 'Get original link by shortLink and increment access count',
        tags: ['links'],
        params: z.object({
          shortLink: z.string().min(3),
        }),
        response: {
          200: z.object({
            id: z.string(),
            originalLink: z.string().url(),
            shortLink: z.string(),
            accessCount: z.string().nullable(),
            createdAt: z.date(),
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params

      const link = await getOriginalLinkAndIncrement(shortLink)

      if (!link) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      return reply.status(200).send(link)
    }
  )
}
