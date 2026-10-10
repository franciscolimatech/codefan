import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Desafios from './pages/Desafios';
import DesafioDetalhe from './pages/DesafioDetalhe';
import Resolver from './pages/Resolver';
import Perfil from './pages/Perfil';
import Professor from './pages/Professor';
import Login from './pages/Login';
import Configuracoes from './pages/Configuracoes';
import Trilhas from './pages/Trilhas';
import TrilhaDetalhe from './pages/TrilhaDetalhe';
import Conceito from './pages/Conceito';
import Nivelamento from './pages/Nivelamento';
import { ProgressoProvider } from './context/ProgressoContext';

function PaginaPorId({ componente: Componente, parametro = 'id' }) {
  const params = useParams();
  return <Componente key={params[parametro]} />;
}

export default function App() {
  return (
    <ProgressoProvider>
    <BrowserRouter>
      <Routes>
        {/* Login - no layout */}
        <Route path="/login" element={<Login />} />
        
        {/* Resolver - full screen IDE */}
        <Route path="/resolver/:id" element={<PaginaPorId componente={Resolver} />} />

        {/* Main layout routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nivelamento" element={<Nivelamento />} />
          <Route path="/nivelamento/questoes" element={<Nivelamento />} />
          <Route path="/nivelamento/resultado" element={<Nivelamento />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/desafios" element={<Desafios />} />
          <Route path="/desafios/:id" element={<DesafioDetalhe />} />
          <Route path="/trilhas" element={<Trilhas />} />
          <Route path="/trilhas/:id" element={<TrilhaDetalhe />} />
          <Route path="/conceitos/:habilidadeId" element={<PaginaPorId componente={Conceito} parametro="habilidadeId" />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/professor" element={<Professor />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ProgressoProvider>
  );
}
