import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SketchContractProvider } from '../store/SketchContractContext'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <SketchContractProvider >
      <Component {...pageProps} />
    </SketchContractProvider>
  )
}

export default MyApp
