import { Card } from "./Card"
import { FC, useEffect, useState } from "react"
import { Button, Center, HStack, Input, Spacer } from "@chakra-ui/react"
import { useWorkspace } from "../workspace"

export const MovieList: FC = () => {
  const workspace = useWorkspace()
  const [movies, setMovies] = useState<any | null>(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [result, setResult] = useState("")

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts =
        (await workspace.program?.account.movieAccountState.all()) ?? []

      const sort = [...accounts].sort((a, b) =>
        a.account.title > b.account.title ? 1 : -1
      )
      setMovies(sort)
    }
    fetchAccounts()
  }, [])

  useEffect(() => {
    if (movies && search != "") {
      const filtered = movies.filter((movie: any) => {
        return movie.account.title
          .toLowerCase()
          .startsWith(search.toLowerCase())
      })
      console.log(filtered)
      setResult(filtered)
    }
  }, [search])

  useEffect(() => {
    if (movies) {
      const filtered = movies.slice((page - 1) * 3, page * 3)
      console.log(filtered)
      setResult(filtered)
    }
  }, [page, movies])

  return (
    <div>
      <Center>
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
      {result && (
        <div>
          {Object.keys(result).map((key) => {
            const data = result[key as unknown as number]
            return <Card key={key} movie={data} />
          })}
        </div>
      )}
      <Center>
        {movies && (
          <HStack w="full" mt={2} mb={8} ml={4} mr={4}>
            {page > 1 && (
              <Button onClick={() => setPage(page - 1)}>Previous</Button>
            )}
            <Spacer />
            {movies.length > page * 5 && (
              <Button onClick={() => setPage(page + 1)}>Next</Button>
            )}
          </HStack>
        )}
      </Center>
    </div>
  )
}
