import { BrowserRouter, Routes, Route } from "react-router";
import { OrderProvider } from './context/OrderContext';

import './App.css'

import HomeContainer from "./presentation/home/HomeContainer";
import OrderContainer from "./presentation/order/OrderContainer";
import PaymentContainer from './presentation/payment/PaymentContainer';


function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/order" element={<OrderContainer />} />
          <Route path="/payment" element={<PaymentContainer />} />
        </Routes>
      </OrderProvider>
    </BrowserRouter>

  )
}

export default App
