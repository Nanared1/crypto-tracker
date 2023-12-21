import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import styled from "styled-components"
import { MantineProvider, createTheme } from "@mantine/core"
import "@mantine/core/styles.css"
import { CryptoTable } from "./components/CryptoTable/CyptoTable"

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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <S.Container>
          <S.CrytoTableContainer>
            <CryptoTable />
          </S.CrytoTableContainer>
        </S.Container>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
