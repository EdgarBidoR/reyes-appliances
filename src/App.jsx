import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Products />} />
        <Route path="productos/:id" element={<ProductDetail />} />
        <Route path="servicios" element={<Services />} />
        <Route path="contacto" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
