import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const activityId = parseInt(req.query.activityId, 10);

  switch (method) {
    case 'GET':
      try {
        const activity = await prisma.activity.findUnique({
          where: {
            id: activityId,
          },
          include: {
            user: true,
          },
        });
        if (!activity) {
          return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activity);
      } catch (error) {
        console.error('Error fetching activity:', error);
        res.status(500).json({ message: 'Failed to fetch activity' });
      }
      break;
    case 'PUT':
      try {
        const { type, date, duration, caloriesBurned } = req.body;
        const updatedActivity = await prisma.activity.update({
          where: {
            id: activityId,
          },
          data: {
            type,
            date: new Date(date),
            duration,
            caloriesBurned,
          },
        });
        res.status(200).json(updatedActivity);
      } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).json({ message: 'Failed to update activity' });
      }
      break;
    case 'DELETE':
      try {
        const deletedActivity = await prisma.activity.delete({
          where: {
            id: activityId,
          },
        });
        res.status(200).json(deletedActivity);
      } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ message: 'Failed to delete activity' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}