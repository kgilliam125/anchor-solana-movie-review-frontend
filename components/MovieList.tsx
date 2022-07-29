import { Card } from "./Card"
import { FC, useEffect, useMemo, useState } from "react"
import { MovieCoordinator } from "../coordinators/MovieCoordinator"
import { Button, Center, HStack, Input, Spacer } from "@chakra-ui/react"
import { useWorkspace } from "../workspace"

export const MovieList: FC = () => {
  const workspace = useWorkspace()
  const [movies, setMovies] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await workspace.program?.account.movieAccountState.all()

      setMovies(accounts)
      console.log(accounts)
    }
    fetchAccounts()
  }, [])

  //   useEffect(() => {
  //     MovieCoordinator.fetchPage(connection, page, 5, search, search !== "").then(
  //       setMovies
  //     )
  //   }, [page, search])

  return (
    <div>
      {/* <Center>
        <Input
          id="search"
          color="gray.400"
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search"
          w="97%"
          mt={2}
          mb={2}
        />
      </Center>
      <Center>
        <HStack w="full" mt={2} mb={8} ml={4} mr={4}>
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)}>Previous</Button>
          )}
          <Spacer />
          {MovieCoordinator.accounts.length > page * 5 && (
            <Button onClick={() => setPage(page + 1)}>Next</Button>
          )}
        </HStack>
      </Center> */}
      {movies && (
        <div>
          {Object.keys(movies).map((key, index) => {
            const data = movies[key]
            return <Card key={key} movie={data} />
          })}
        </div>
      )}
    </div>
  )
}
