import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Desafios from './pages/Desafios';
import DesafioDetalhe from './pages/DesafioDetalhe';
import Resolver from './pages/Resolver';
import Comunidades from './pages/Comunidades';
import ComunidadeDetalhe from './pages/ComunidadeDetalhe';
import ArenaList from './pages/ArenaList';
import ArenaLobby from './pages/ArenaLobby';
import ArenaAtiva from './pages/ArenaAtiva';
import Perfil from './pages/Perfil';
import Professor from './pages/Professor';
import Login from './pages/Login';
import Configuracoes from './pages/Configuracoes';
import MembrosComunidade from './pages/MembrosComunidade';
import Trilhas from './pages/Trilhas';
import TrilhaDetalhe from './pages/TrilhaDetalhe';
import Conceito from './pages/Conceito';
import { ProgressoProvider } from './context/ProgressoContext';

export default function App() {
  return (
    <ProgressoProvider>
    <BrowserRouter>
      <Routes>
        {/* Login - no layout */}
        <Route path="/login" element={<Login />} />
        
        {/* Arena ativa - full screen, no sidebar */}
        <Route path="/arena/:id/ativa" element={<ArenaAtiva />} />
        
        {/* Resolver - full screen IDE */}
        <Route path="/resolver/:id" element={<Resolver />} />

        {/* Main layout routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/desafios" element={<Desafios />} />
          <Route path="/desafios/:id" element={<DesafioDetalhe />} />
          <Route path="/trilhas" element={<Trilhas />} />
          <Route path="/trilhas/:id" element={<TrilhaDetalhe />} />
          <Route path="/conceitos/:habilidadeId" element={<Conceito />} />
          <Route path="/comunidades" element={<Comunidades />} />
          <Route path="/comunidades/:id" element={<ComunidadeDetalhe />} />
          <Route path="/comunidades/:id/membros" element={<MembrosComunidade />} />
          <Route path="/arena" element={<ArenaList />} />
          <Route path="/arena/:id/lobby" element={<ArenaLobby />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/professor" element={<Professor />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ProgressoProvider>
  );
}
