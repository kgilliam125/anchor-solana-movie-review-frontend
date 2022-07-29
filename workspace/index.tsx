import { createContext, useContext } from "react"
import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor"
import idl from "./idl.json"
import { MovieReview, IDL } from "./movie_review"
import { Connection, PublicKey } from "@solana/web3.js"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import MockWallet from "./MockWallet"

const WorkspaceContext = createContext({})
const programId = new PublicKey("6hf17KpmVhjbkLySF5XAvdiFtS616zJRpWw5bRBJ1H2L")

interface WorkSpace {
  connection?: Connection
  provider?: AnchorProvider
  program?: Program<MovieReview>
}

const WorkspaceProvider = ({ children }: any) => {
  const wallet = useAnchorWallet() || MockWallet
  const connection = new Connection("https://api.devnet.solana.com")

  const provider = new AnchorProvider(connection, wallet, {})

  setProvider(provider)
  const program = new Program(
    IDL as Idl,
    programId
  ) as unknown as Program<MovieReview>
  const workspace = {
    connection,
    provider,
    program,
  }

  return (
    <WorkspaceContext.Provider value={workspace}>
      {children}
    </WorkspaceContext.Provider>
  )
}

const useWorkspace = (): WorkSpace => {
  return useContext(WorkspaceContext)
}

export { WorkspaceProvider, useWorkspace }
