import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootButton from './pages/RootButton';
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import SpecialPricePage from './components/SpecialsComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
<style media="" data-href="https://static.oliveyoung.co.kr/pc-static-root/css/style.css?dumm=20230706003"></style>

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootButton />} />
          <Route path="/special" element={<SpecialPricePage />} />
          <Route path="/order/:productNo" element={<Order />} />
          <Route path="/order/history" element={<OrderHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
