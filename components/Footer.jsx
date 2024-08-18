import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.
        </p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <Link href="/about">
              <a className="hover:underline">About</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className="hover:underline">Contact</a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;