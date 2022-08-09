import { type AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

const NextApp = ({ Component, pageProps }: AppProps) => (
  <div className='w-full h-screen flex flex-col items-center px-4'>
    <Component {...pageProps} />
  </div>
)

export default NextApp
