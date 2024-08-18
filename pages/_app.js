import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'zustand'
import { useStore } from '../store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServerSideProps } from 'next-auth/react';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();
  const { user, setUser } = useStore();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user)
    }
  }, [session, setUser])

  // Protect routes based on user authentication
  useEffect(() => {
    const protectedRoutes = ['/dashboard', '/goals', '/activities', '/profile'];
    if (protectedRoutes.includes(router.pathname) && !user) {
      router.push('/login')
    }
  }, [user, router.pathname])

  return (
    <SessionProvider session={session}>
      <Provider store={useStore}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </SessionProvider>
  )
}

export { getServerSideProps };

export default MyApp