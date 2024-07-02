import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

interface CustomNextApiRequest extends NextApiRequest {
  user?: any;
}

export const protectRoute = (handler: (req: CustomNextApiRequest, res: NextApiResponse) => void) => {
  return async (req: CustomNextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = session.user;
    return handler(req, res);
  };
};
