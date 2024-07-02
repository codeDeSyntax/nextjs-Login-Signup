import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/mongoose';
import Registration from '@/models/Registeration';
import { protectRoute } from '../../../middleware/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'DELETE':
      try {
        const { id } = req.query;
        await Registration.findByIdAndDelete(id);
        res.status(200).json({ message: 'Registration canceled successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Server error canceling registration' });
      }
      break;
    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default protectRoute(handler);
