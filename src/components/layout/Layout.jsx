import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  Home,
  Code2,
  Users,
  Swords,
  User,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  LogOut,
  Settings,
  GraduationCap,
  Menu,
  X,
  Zap,
  Flame,
  Route,
} from 'lucide-react';
import { currentUser } from '../../data/mockData';

const navItems = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/desafios', label: 'Desafios', icon: Code2 },
  { path: '/trilhas', label: 'Trilhas', icon: Route },
  { path: '/comunidades', label: 'Comunidades', icon: Users },
  { path: '/arena', label: 'Arena', icon: Swords },
  { path: '/perfil', label: 'Perfil', icon: User },
];

const navSecondary = [
  { path: '/professor', label: 'Painel Professor', icon: GraduationCap },
];

export default function Layout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/trilhas' && location.pathname.startsWith('/conceitos')) return true;
    return location.pathname.startsWith(path);
  };

  const xpPercent = Math.round((currentUser.xp / currentUser.xpProximoNivel) * 100);

  return (
    <div className="flex h-screen bg-[#0b0d14] overflow-hidden">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          flex flex-col
          bg-[#0b0d14] border-r border-[#252a3a]
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[72px]' : 'w-[240px]'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo area */}
        <div className={`flex items-center h-16 px-4 border-b border-[#252a3a] ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-[#7c5cfc] rounded-lg flex items-center justify-center">
                <Zap className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-[#e4e6ef] font-bold text-lg tracking-tight">CodeFan</span>
            </Link>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-[#7c5cfc] rounded-lg flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md hover:bg-[#181b2a] text-[#8b90a5] transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-md hover:bg-[#181b2a] text-[#8b90a5]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150
                  ${active
                    ? 'bg-[#7c5cfc]/10 text-[#7c5cfc]'
                    : 'text-[#8b90a5] hover:text-[#e4e6ef] hover:bg-[#181b2a]'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-[#7c5cfc]' : ''}`} />
                {!collapsed && (
                  <span className={`text-sm font-medium ${active ? 'text-[#7c5cfc]' : ''}`}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}

          <div className={`my-4 border-t border-[#252a3a] ${collapsed ? 'mx-1' : 'mx-2'}`} />

          {navSecondary.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150
                  ${active
                    ? 'bg-[#7c5cfc]/10 text-[#7c5cfc]'
                    : 'text-[#8b90a5] hover:text-[#e4e6ef] hover:bg-[#181b2a]'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-[#7c5cfc]' : ''}`} />
                {!collapsed && (
                  <span className={`text-sm font-medium ${active ? 'text-[#7c5cfc]' : ''}`}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* XP Bar at bottom */}
        {!collapsed && (
          <div className="px-4 py-4 border-t border-[#252a3a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#8b90a5]">Nível {currentUser.nivel}</span>
              <span className="text-xs text-[#8b90a5]">{currentUser.xp} / {currentUser.xpProximoNivel} XP</span>
            </div>
            <div className="w-full bg-[#181b2a] rounded-full h-1.5">
              <div
                className="bg-[#7c5cfc] rounded-full h-1.5 transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        )}
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-[#252a3a] bg-[#0b0d14] flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#181b2a] text-[#8b90a5] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 bg-[#12141f] border border-[#252a3a] rounded-lg px-3.5 py-2 w-72 focus-within:border-[#7c5cfc] transition-colors">
              <Search className="w-4 h-4 text-[#555a6e]" />
              <input
                type="text"
                placeholder="Buscar desafios, comunidades..."
                className="bg-transparent text-sm text-[#e4e6ef] placeholder-[#555a6e] outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm mr-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-[#e4e6ef] font-medium">{currentUser.sequenciaDias}</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#181b2a] text-[#8b90a5] transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7c5cfc] rounded-full" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#12141f] border border-[#252a3a] rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-[#252a3a]">
                    <h3 className="text-sm font-semibold text-[#e4e6ef]">Notificações</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-3 hover:bg-[#181b2a] border-b border-[#252a3a]/50 cursor-pointer">
                      <p className="text-sm text-[#e4e6ef]">Arena "Desafio Semanal #14" começa amanhã!</p>
                      <p className="text-xs text-[#8b90a5] mt-1">Há 1 hora</p>
                    </div>
                    <div className="p-3 hover:bg-[#181b2a] border-b border-[#252a3a]/50 cursor-pointer">
                      <p className="text-sm text-[#e4e6ef]">Novo material em Backend com Java</p>
                      <p className="text-xs text-[#8b90a5] mt-1">Há 3 horas</p>
                    </div>
                    <div className="p-3 hover:bg-[#181b2a] cursor-pointer">
                      <p className="text-sm text-[#e4e6ef]">Mariana respondeu sua mensagem</p>
                      <p className="text-xs text-[#8b90a5] mt-1">Há 5 horas</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#181b2a] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#7c5cfc]/20 flex items-center justify-center text-[#7c5cfc] text-sm font-semibold">
                  {currentUser.iniciais}
                </div>
                {!collapsed && (
                  <span className="hidden md:block text-sm font-medium text-[#e4e6ef]">
                    {currentUser.nome.split(' ')[0]}
                  </span>
                )}
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-[#12141f] border border-[#252a3a] rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-3 border-b border-[#252a3a]">
                    <p className="text-sm font-medium text-[#e4e6ef]">{currentUser.nome}</p>
                    <p className="text-xs text-[#8b90a5]">{currentUser.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/perfil"
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#8b90a5] hover:text-[#e4e6ef] hover:bg-[#181b2a] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      Meu Perfil
                    </Link>
                    <Link
                      to="/configuracoes"
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#8b90a5] hover:text-[#e4e6ef] hover:bg-[#181b2a] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Configurações
                    </Link>
                  </div>
                  <div className="border-t border-[#252a3a] py-1">
                    <Link
                      to="/login"
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-[#181b2a] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto bg-[#0b0d14]"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

