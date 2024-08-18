import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const goalId = parseInt(req.query.goalId, 10);

  switch (method) {
    case 'GET':
      try {
        const goal = await prisma.goal.findUnique({
          where: {
            id: goalId,
          },
          include: {
            user: true,
          },
        });
        if (!goal) {
          return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json(goal);
      } catch (error) {
        console.error('Error fetching goal:', error);
        res.status(500).json({ message: 'Failed to fetch goal' });
      }
      break;
    case 'PUT':
      try {
        const { name, target, progress } = req.body;
        const updatedGoal = await prisma.goal.update({
          where: {
            id: goalId,
          },
          data: {
            name,
            target,
            progress,
          },
        });
        res.status(200).json(updatedGoal);
      } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ message: 'Failed to update goal' });
      }
      break;
    case 'DELETE':
      try {
        const deletedGoal = await prisma.goal.delete({
          where: {
            id: goalId,
          },
        });
        res.status(200).json(deletedGoal);
      } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ message: 'Failed to delete goal' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}