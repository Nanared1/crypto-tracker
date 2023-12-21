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
  createTheme,
} from "@mantine/core"
import axios from "axios"
import "@mantine/core/styles.css"
import { CoinData } from "./types"

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

const CryptoTable = () => {
  const {data, error, isFetching } = useQuery({
    queryKey: ["gainers-losers"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:3001/cryptocurrency/listings/latest",
        {
          params: { limit: 10 },
        },
      )
      console.log(res.data)
      return res.data.data
    },
    refetchInterval: 60000, // Refetch the data every minute
    refetchOnWindowFocus: false,
  })

  if (error) return <div>error</div>
  if (isFetching && !data) return <div>loading...</div>

  const rows = data.map((row: CoinData) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.quote.USD.price}</Table.Td>
      <Table.Td>{row.quote.USD.market_cap}</Table.Td>
      <Table.Td>{row.circulating_supply}</Table.Td>
      <Table.Td>{row.quote.USD.volume_change_24h}</Table.Td>
    </Table.Tr>
  ))

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
      <Table.Tbody>
        {rows}
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
              <CryptoTable />
            </ScrollArea>
          </S.CrytoTableContainer>
        </S.Container>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
