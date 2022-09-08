import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { ContextProvider } from "../context/WalletContextProvider"
import { WorkspaceProvider } from "../context/Anchor"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <ChakraProvider>
        <WorkspaceProvider>
          <Component {...pageProps} />
        </WorkspaceProvider>
      </ChakraProvider>
    </ContextProvider>
  )
}

export default MyApp
