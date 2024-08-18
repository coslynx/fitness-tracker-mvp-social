import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const activities = await prisma.activity.findMany({
          where: {
            userId: parseInt(req.query.userId, 10),
          },
          include: {
            user: true,
          },
        });
        res.status(200).json(activities);
      } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: 'Failed to fetch activities' });
      }
      break;
    case 'POST':
      try {
        const { type, date, duration, caloriesBurned, userId } = req.body;
        const newActivity = await prisma.activity.create({
          data: {
            type,
            date: new Date(date),
            duration,
            caloriesBurned,
            userId: parseInt(userId, 10),
          },
        });
        res.status(201).json(newActivity);
      } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({ message: 'Failed to create activity' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}