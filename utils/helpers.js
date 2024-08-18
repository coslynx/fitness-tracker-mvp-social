import { format } from 'date-fns';

const formatDate = (date) => format(new Date(date), 'MMMM dd, yyyy');

const calculateCaloriesBurned = (activityType, duration) => {
  const caloriesPerMinute = {
    'running': 10,
    'walking': 4,
    'cycling': 7,
    'swimming': 8,
    'yoga': 3,
    // Add more activity types and corresponding calories burned per minute
  };

  return caloriesPerMinute[activityType.toLowerCase()] * duration;
};

export { formatDate, calculateCaloriesBurned };