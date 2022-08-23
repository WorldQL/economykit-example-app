import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { type NextApiRequest, type NextApiResponse } from 'next'
import nc from 'next-connect'
import { baseURL, playerID, provisionToken } from '~/lib/economykit'

const stringParameter = (request: NextApiRequest, key: string) => {
  const value = request.body[key] as unknown
  if (typeof value !== 'string') return undefined

  return value
}

// Hardcoded expiry time
const expires = ms('72')

const handler = nc<NextApiRequest, NextApiResponse>()
handler.post(async (request, resp) => {
  const name = stringParameter(request, 'name')
  if (!name) {
    resp.status(StatusCodes.BAD_REQUEST)
    resp.send(ReasonPhrases.BAD_REQUEST)

    return
  }

  const idResp = await playerID(name)
  const tokenResp = await provisionToken(expires, idResp.player_id)

  resp.send({
    id: idResp.player_id,
    displayName: idResp.display_name,
    token: tokenResp.key,

    baseURL,
  })
})

export default handler
