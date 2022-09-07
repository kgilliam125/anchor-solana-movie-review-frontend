import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { ContextProvider } from "../context/WalletContextProvider"
import { WorkspaceProvider } from "../context/Anchor"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ContextProvider>
        <WorkspaceProvider>
          <Component {...pageProps} />
        </WorkspaceProvider>
      </ContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
