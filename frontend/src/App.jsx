import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "./context/ConfigContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CatalogoPage from "./pages/CatalogoPage";
import ProductoDetallePage from "./pages/ProductoDetallePage";

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogoPage />} />
              <Route path="/producto/:id" element={<ProductoDetallePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
