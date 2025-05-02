import { exportLinks } from '@/app/functions/export-links-csv'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportLinksRoute: FastifyPluginAsyncZod = async (
  server: FastifyInstance
) => {
  server.get(
    '/links/export',
    {
      schema: {
        summary: 'Export all shortened links as a CSV file',
        tags: ['links'],
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({ reportUrl: z.string().url() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const query = request.query as { searchQuery?: string }

      const result = await exportLinks({ searchQuery: query?.searchQuery })

      if (isRight(result)) {
        const data = unwrapEither(result)
        return reply.status(200).send(data)
      }

      return reply.status(400).send({ message: 'Failed to export links' })
    }
  )
}
