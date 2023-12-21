import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from "styled-components";

const queryClient = new QueryClient()


const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
  `
}


const Chart = () => {
  return (
    <div>
      <h1>Chart</h1>
    </div>
  )
}

const  App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <S.Container>
      <Chart />
      </S.Container>
    </QueryClientProvider>
  );
}

export default App;
