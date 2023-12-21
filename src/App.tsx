import React from "react"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import styled from "styled-components"
import {
  MantineProvider,
  ScrollArea,
  Table,
  TextInput,
  TextInputProps,
  createTheme,
  rem,
} from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import axios from "axios"
import "@mantine/core/styles.css"

const queryClient = new QueryClient()

const theme = createTheme({})

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
  `,
  CrytoTableContainer: styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 50px;
    box-sizing: border-box;
  `,
}

const SearchInput = (props: TextInputProps) => {
  return (
    <TextInput
      placeholder="Search by any field"
      mb="md"
      leftSection={
        <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      }
      {...props}
    />
  )
}

const CryptoTable = () => {
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["gainers-losers"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:3001/cryptocurrency/listings/latest",
        {
          params: { limit: 10},
        },
      )
      return res.data
    },
    // Refetch the data every minute
    refetchInterval: 60000,
  })

  if (error) return <div>error</div>
  if (isFetching) return <div>loading</div>

  return (
    <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Market Cap</Table.Th>
          <Table.Th>Circulating Supply</Table.Th>
          <Table.Th>Change %</Table.Th>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <S.Container>
          <S.CrytoTableContainer>
            <ScrollArea>
              <SearchInput />
              <CryptoTable />
            </ScrollArea>
          </S.CrytoTableContainer>
        </S.Container>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
