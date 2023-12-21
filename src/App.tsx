import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import styled from "styled-components"
import { ActionIcon, MantineProvider, TextInput, TextInputProps, createTheme, rem, useMantineTheme } from "@mantine/core"
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import '@mantine/core/styles.css';

const queryClient = new QueryClient()

const theme = createTheme({});

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0px;
    width: 100%;
    height: 100vh;
  `,
}

const SearchInput = (props: TextInputProps) => {
  const theme = useMantineTheme();
  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Search Crypto"
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
      {...props}
    />
  );
}

const CryptoTable = () => {
  return (
    <div>
      <h1>CryptoTable</h1>
    </div>
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
      <S.Container>
        <SearchInput />
        <CryptoTable />
      </S.Container>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
