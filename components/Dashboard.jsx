import { useState, useEffect } from "react";
import { useStore } from "../store";
import { getGoals, getActivities } from "../utils/api";
import GoalList from "./GoalList";
import ActivityLog from "./ActivityLog";
import { CircularProgress } from "@mui/material";
import { Chart } from "react-google-charts";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useStore();
  const [goals, setGoals] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const goalsData = await getGoals(user.id);
        setGoals(goalsData);

        const activitiesData = await getActivities(user.id);
        setActivities(activitiesData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Sleep", 7],
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Your Goals</h2>
          <GoalList goals={goals} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Your Activity Log</h2>
          <ActivityLog activities={activities} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Your Progress</h2>
        <div className="h-96">
          <Chart
            width={"100%"}
            height={"100%"}
            chartType="PieChart"
            data={data}
            options={{
              title: "Your Activity Distribution",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;