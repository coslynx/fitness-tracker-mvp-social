import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { getActivities } from '../utils/api';
import { CircularProgress } from '@mui/material';
import { Chart } from 'react-google-charts';

const ActivityLog = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useStore();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesData = await getActivities(user.id);
        setActivities(activitiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    if (user) {
      fetchActivities();
    }
  }, [user]);

  const data = [
    ['Activity', 'Calories Burned'],
    ...activities.map((activity) => [
      `${activity.type} - ${activity.date.toLocaleDateString()}`,
      activity.caloriesBurned || 0,
    ]),
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Activity Log</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Activity</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Duration</th>
            <th className="px-4 py-2 border-b">Calories Burned</th>
          </tr>
        </thead>
        <tbody>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-4 py-2 border-b">{activity.type}</td>
                <td className="px-4 py-2 border-b">
                  {activity.date.toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">{activity.duration}</td>
                <td className="px-4 py-2 border-b">{activity.caloriesBurned}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 border-b text-center">
                No activities logged yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Activity Distribution</h2>
        <div className="h-96">
          <Chart
            width={'100%'}
            height={'100%'}
            chartType="ColumnChart"
            data={data}
            options={{
              title: 'Calories Burned by Activity',
              legend: { position: 'none' },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;