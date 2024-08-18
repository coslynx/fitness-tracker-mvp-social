import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { getGoals } from '../utils/api';
import GoalForm from './GoalForm';
import { CircularProgress } from '@mui/material';

const GoalList = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useStore();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsData = await getGoals(user.id);
        setGoals(goalsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    if (user) {
      fetchGoals();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Goals</h2>
      {goals.length > 0 ? (
        <ul className="list-disc pl-4">
          {goals.map((goal) => (
            <li key={goal.id} className="mb-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.name}</span>
                <span className="text-gray-600">
                  Target: {goal.target}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No goals yet. Create your first goal!</p>
      )}
      <GoalForm />
    </div>
  );
};

export default GoalList;