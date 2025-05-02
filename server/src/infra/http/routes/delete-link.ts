import { deleteLinkByShortLink } from '@/app/functions/delete-link'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/links/:shortLink',
    {
      schema: {
        summary: 'Delete link by shortLink',
        tags: ['links'],
        params: z.object({
          shortLink: z.string().min(3),
        }),
        response: {
          204: z.null(),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params

      const deleted = await deleteLinkByShortLink(shortLink)

      if (!deleted) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      return reply.status(204).send()
    }
  )
}
