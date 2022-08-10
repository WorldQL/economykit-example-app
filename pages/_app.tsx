import { type AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

const NextApp = ({ Component, pageProps }: AppProps) => (
  <div className='w-full h-screen flex flex-col items-center bg-gray-100'>
    <Component {...pageProps} />
  </div>
)

export default NextApp
