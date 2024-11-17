import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import VocaloidList from "./pages/VocaloidList";
import VocaloidDetail from "./pages/VocaloidDetail";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Proyecto Vocaloid uwu</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/vocaloids" element={<VocaloidList />} />
          <Route path="/vocaloids/:id" element={<VocaloidDetail />} />
        </Routes>
      </main>
      <footer>
        <p>Aplicaciones Híbridas, Parcial 2 - Dana Michelle Zambelli</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
