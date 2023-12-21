import React from "react"
import { render, waitFor, screen } from "@testing-library/react"
import axios from "axios"
import { CryptoTable } from "./CryptoTable"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MantineProvider, createTheme } from "@mantine/core"
import { mockMatchMedia } from "../../setupTests"

jest.mock("axios")

const theme = createTheme({})

const mockData = [
  {
    id: 1,
    name: "Bitcoin",
    quote: {
      USD: {
        price: 45000,
        market_cap: 900000000000,
        volume_change_24h: 2.5,
      },
    },
    circulating_supply: 21000000,
  },
]

beforeAll(() => {
	mockMatchMedia()
})

describe("CryptoTable", () => {

  it("renders the table header", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { data: mockData } })

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MantineProvider theme={theme}>
          <CryptoTable />
        </MantineProvider>
      </QueryClientProvider>,
    )
    await waitFor(() => {
      const nameHeader = screen.getByText("Name")
      const priceHeader = screen.getByText("Price(USD)")
      const marketCapHeader = screen.getByText("Market Cap(USD)")
      const circulatingSupplyHeader = screen.getByText("Circulating Supply")
      const changePercentageHeader = screen.getByText("Change %")

      expect(nameHeader).toBeInTheDocument()
      expect(priceHeader).toBeInTheDocument()
      expect(marketCapHeader).toBeInTheDocument()
      expect(circulatingSupplyHeader).toBeInTheDocument()
      expect(changePercentageHeader).toBeInTheDocument()
    })
  })

  it("renders loading text when fetching data", async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    axios.get = jest.fn().mockImplementation(() => new Promise(() => {})) // Simulate a pending promise

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MantineProvider theme={theme}>
          <CryptoTable />
        </MantineProvider>
      </QueryClientProvider>,
    )
    const loadingText = screen.getByText("loading...")
    expect(loadingText).toBeInTheDocument()
  })

  it("renders error message when data fetching fails", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: {} })

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MantineProvider theme={theme}>
          <CryptoTable />
        </MantineProvider>
      </QueryClientProvider>,
    )
    await waitFor(() => {
      const errorText = screen.getByText("error")
      expect(errorText).toBeInTheDocument()
    })
  })

  it("renders data in the table rows", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { data: mockData } })
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MantineProvider theme={theme}>
          <CryptoTable />
        </MantineProvider>
      </QueryClientProvider>,
    )
    await waitFor(() => {
      const bitcoinName = screen.getByText("Bitcoin")
      const bitcoinPrice = screen.getByText("$45000.0000")
      const bitcoinMarketCap = screen.getByText("$900000000000.00")
      const bitcoinCirculatingSupply = screen.getByText("21000000")
      const bitcoinChangePercentage = screen.getByText("2.50%")

      expect(bitcoinName).toBeInTheDocument()
      expect(bitcoinPrice).toBeInTheDocument()
      expect(bitcoinMarketCap).toBeInTheDocument()
      expect(bitcoinCirculatingSupply).toBeInTheDocument()
      expect(bitcoinChangePercentage).toBeInTheDocument()
    })
  })
})
