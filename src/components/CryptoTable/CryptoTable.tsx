import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Table } from "@mantine/core"
import axios from "axios"
import "@mantine/core/styles.css"
import { CoinData } from "../../shared/types"

export const CryptoTable = () => {
  const { data, error, isFetching } = useQuery({
    queryKey: ["listings-latest"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:3001/cryptocurrency/listings/latest",
        {
          params: { limit: 10 },
        },
      )
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
      <Table.Td>${row.quote.USD.price.toFixed(4)}</Table.Td>
      <Table.Td>${row.quote.USD.market_cap.toFixed(2)}</Table.Td>
      <Table.Td>{row.circulating_supply.toFixed(0)}</Table.Td>
      <Table.Td>{row.quote.USD.volume_change_24h.toFixed(2)}%</Table.Td>
    </Table.Tr>
  ))

  return (
    <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price(USD)</Table.Th>
          <Table.Th>Market Cap(USD)</Table.Th>
          <Table.Th>Circulating Supply</Table.Th>
          <Table.Th>Change %</Table.Th>
        </Table.Tr>
      </Table.Tbody>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}
