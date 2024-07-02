import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/mongoose';
import Registration from '@/models/Registeration';
import { protectRoute } from '../../../middleware/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'POST':
      try {
        const { userId, eventId } = req.body;
        const registration = new Registration({ userId, eventId });
        await registration.save();
        res.status(201).json(registration);
      } catch (error) {
        res.status(500).json({ error: 'Server error registering for event' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default protectRoute(handler);
