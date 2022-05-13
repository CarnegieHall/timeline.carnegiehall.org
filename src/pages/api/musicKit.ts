import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_CERT } = process.env;

  if (!APPLE_CERT || !APPLE_KEY_ID || !APPLE_TEAM_ID) {
    res.status(500).send('Missing apple details');
    return;
  }

  const token = jwt.sign({}, APPLE_CERT.replace(/\\n/gm, '\n'), {
    algorithm: 'ES256',
    expiresIn: '180d',
    issuer: APPLE_TEAM_ID,
    header: {
      alg: 'ES256',
      kid: APPLE_KEY_ID
    }
  });

  res.status(200).json({ token });
}
