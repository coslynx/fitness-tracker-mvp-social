import Link from 'next/link';
import { useStore } from '../store';

const Header = () => {
  const { user, logout } = useStore();

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">Fitness Tracker</h1>
        </Link>
        <nav>
          {user ? (
            <ul className="flex space-x-4">
              <li>
                <Link href="/dashboard">
                  <a className="hover:underline">Dashboard</a>
                </Link>
              </li>
              <li>
                <button onClick={logout} className="hover:underline">
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-4">
              <li>
                <Link href="/login">
                  <a className="hover:underline">Login</a>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;