import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { type NextApiRequest, type NextApiResponse } from 'next'
import nc from 'next-connect'
import { env } from 'node:process'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (request, resp) => {
  const { ECONOMYKIT_APP_TOKEN } = env
  if (!ECONOMYKIT_APP_TOKEN) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR)
    resp.send(ReasonPhrases.INTERNAL_SERVER_ERROR)

    return
  }

  // TODO
  resp.status(StatusCodes.NOT_IMPLEMENTED)
  resp.send(ReasonPhrases.NOT_IMPLEMENTED)
})

export default handler
