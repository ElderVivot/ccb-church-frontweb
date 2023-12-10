import 'dotenv/config'
import { NextApiRequest, NextApiResponse, NextConfig } from 'next'

import { s3Factory } from '@services/s3'

export const config: NextConfig = {
    api: {
        bodyParser: {
            sizeLimit: '1GB'
        }
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const { extension } = req.body

        let contentType = 'application/pdf'
        if (extension === 'pdf') contentType = 'application/pdf'
        else if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') contentType = 'image/png'

        const s3 = s3Factory()

        const url = await s3.getSignedUrlPromise('ordem_pagto', extension, 'ccb-generic', contentType)

        res.status(200).json({ url })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err })
    }
}