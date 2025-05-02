import { createLink } from '@/app/functions/create-link'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create new link',
        tags: ['links'],
        body: z.object({
          originalLink: z.string().url(),
          shortLink: z
            .string()
            .min(3)
            .max(64)
            .regex(/^[a-zA-Z0-9_-]+$/, {
              message:
                'shortLink can only contain letters, numbers, (-) and (_)',
            }),
        }),
        response: {
          201: z.object({
            id: z.string(),
            originalLink: z.string(),
            shortLink: z.string(),
            accessCount: z.string().nullable(),
            createdAt: z.date(),
          }),
          400: z.object({ message: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe('Link already exists'),
        },
      },
    },
    async (request, reply) => {
      const { originalLink, shortLink } = request.body

      const result = await createLink({ originalLink, shortLink })

      if (!isRight(result)) {
        const error = result.left

        if (error === 'LINK_ALREADY_EXISTS') {
          return reply
            .status(409)
            .send({ message: 'Short link already exists. Choose another one.' })
        }

        return reply.status(400).send({ message: 'Error creating link.' })
      }

      const data = unwrapEither(result)
      return reply.status(201).send(data)
    }
  )
}
