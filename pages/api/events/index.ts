import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/mongoose';
import Event from '@/models/events';
import { protectRoute } from '../../../middleware/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const events = await Event.find({});
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ error: 'Server error fetching events' });
      }
      break;
    case 'POST':
      try {
        const { title, description, date, status } = req.body;
        const event = new Event({ title, description, date, status });
        await event.save();
        res.status(201).json(event);
      } catch (error) {
        res.status(500).json({ error: 'Server error creating event' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default protectRoute(handler);
