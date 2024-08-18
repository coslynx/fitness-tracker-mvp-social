import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useStore } from '../store';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useStore();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setUser(result.user);
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Failed to login');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-lg font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;