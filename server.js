const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());

  server.get('/api/goals', async (req, res) => {
    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId: parseInt(req.query.userId, 10),
        },
        include: {
          user: true,
        },
      });
      res.json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ message: 'Failed to fetch goals' });
    }
  });

  server.post('/api/goals', async (req, res) => {
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
  });

  server.get('/api/activities', async (req, res) => {
    try {
      const activities = await prisma.activity.findMany({
        where: {
          userId: parseInt(req.query.userId, 10),
        },
        include: {
          user: true,
        },
      });
      res.json(activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      res.status(500).json({ message: 'Failed to fetch activities' });
    }
  });

  server.post('/api/activities', async (req, res) => {
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
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});