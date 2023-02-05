import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { store } from 'store'
import 'styles/globals.css'

interface MyAppProps extends AppProps {
  clientId?: string
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('No client ID provided!');
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default MyApp
