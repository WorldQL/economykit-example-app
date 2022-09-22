import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { type NextApiRequest, type NextApiResponse } from 'next'
import nc from 'next-connect'
import { appClient } from '~/lib/economykit/server'
import { ExternalIdentifier, type PlayerAuth } from '@worldql/economykit-client'
import { DeepMap } from '~/lib/types'

const stringParameter = (request: NextApiRequest, key: string) => {
  const value = request.body[key] as unknown
  if (typeof value !== 'string') return undefined

  return value
}

// Hardcoded expiry time
const expires = ms('72h')
export type PlayerAuthAPI = DeepMap<PlayerAuth, Date, Date | string>

const handler = nc<NextApiRequest, NextApiResponse<PlayerAuthAPI | string>>()
handler.post(async (request, resp) => {
  const name = stringParameter(request, 'name')
  if (!name) {
    resp.status(StatusCodes.BAD_REQUEST)
    resp.send(ReasonPhrases.BAD_REQUEST)

    return
  }

  const playerAuth = await appClient.authenticate(
    name,
    ExternalIdentifier.CUSTOM,
    name,
    expires
  )

  resp.send(playerAuth)
})

export default handler
