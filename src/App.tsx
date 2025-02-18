import { BrowserRouter, Routes, Route } from "react-router";
import { OrderProvider } from './context/OrderContext';

import './App.css'

import HomeContainer from "./presentation/home/HomeContainer";
import OrderContainer from "./presentation/order/OrderContainer";
import PaymentContainer from './presentation/payment/PaymentContainer';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <OrderProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/order" element={<OrderContainer />} />
            <Route path="/payment" element={<PaymentContainer />} />
          </Routes>
        </QueryClientProvider>
      </OrderProvider>
    </BrowserRouter >

  )
}

export default App
