import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import Shop from './pages/Shop';
import TopBrandsPlaceholder from './pages/TopBrandsPlaceholder';
import NearbyStoresPlaceholder from './pages/NearbyStoresPlaceholder';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';


function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/top-brands" element={<TopBrandsPlaceholder />} />
        <Route path="/shop/nearby-stores" element={<NearbyStoresPlaceholder />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppShell>
  );
}

export default App;
