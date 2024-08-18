import Link from 'next/link';
import { useStore } from '../store';

const Navigation = () => {
  const { user } = useStore();

  return (
    <nav className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">Fitness Tracker</h1>
        </Link>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <li>
                <Link href="/dashboard">
                  <a className="hover:underline">Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/goals">
                  <a className="hover:underline">Goals</a>
                </Link>
              </li>
              <li>
                <Link href="/activities">
                  <a className="hover:underline">Activities</a>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <a className="hover:underline">Profile</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <a className="hover:underline">Login</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a className="hover:underline">Signup</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;