import { useState } from 'react';
import { useStore } from '../store';
import { createGoal } from '../utils/api';

const GoalForm = () => {
  const { user } = useStore();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      await createGoal({ name, target, userId: user.id });
      setName('');
      setTarget('');
    } catch (error) {
      setError('Failed to create goal');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Create New Goal</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Goal Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="target" className="block text-sm font-medium text-gray-700">
            Target:
          </label>
          <input
            type="number"
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
        >
          Create Goal
        </button>
      </form>
    </div>
  );
};

export default GoalForm;