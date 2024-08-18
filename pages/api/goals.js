import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const goals = await prisma.goal.findMany({
          where: {
            userId: parseInt(req.query.userId, 10),
          },
          include: {
            user: true,
          },
        });
        res.status(200).json(goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ message: 'Failed to fetch goals' });
      }
      break;
    case 'POST':
      try {
        const { name, target, userId } = req.body;
        const newGoal = await prisma.goal.create({
          data: {
            name,
            target,
            userId: parseInt(userId, 10),
          },
        });
        res.status(201).json(newGoal);
      } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ message: 'Failed to create goal' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}