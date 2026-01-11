import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  timestamp: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    message: 'Hello from Blog Sermaye API!',
    timestamp: new Date().toISOString()
  })
}
