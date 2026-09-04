import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import Shop from './pages/Shop';
import TopBrandsPlaceholder from './pages/TopBrandsPlaceholder';
import NearbyStoresPlaceholder from './pages/NearbyStoresPlaceholder';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/top-brands" element={<TopBrandsPlaceholder />} />
        <Route path="/shop/nearby-stores" element={<NearbyStoresPlaceholder />} />
      </Routes>
    </AppShell>
  );
}

export default App;
