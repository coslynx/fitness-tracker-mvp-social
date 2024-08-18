import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getGoals = async (userId) => {
  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId: parseInt(userId, 10),
      },
      include: {
        user: true,
      },
    });
    return goals;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw new Error('Failed to fetch goals');
  }
};

export const createGoal = async (goalData) => {
  try {
    const newGoal = await prisma.goal.create({
      data: {
        ...goalData,
      },
    });
    return newGoal;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw new Error('Failed to create goal');
  }
};

export const getActivities = async (userId) => {
  try {
    const activities = await prisma.activity.findMany({
      where: {
        userId: parseInt(userId, 10),
      },
      include: {
        user: true,
      },
    });
    return activities;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw new Error('Failed to fetch activities');
  }
};

export const getUser = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId, 10),
      },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId, 10),
      },
      data: {
        ...userData,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};