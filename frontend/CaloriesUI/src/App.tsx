import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { I18nProvider } from "@/lib/i18n";
import { Toaster } from "sonner";
import { type ReactNode } from "react";

import Home from './pages/home'
import Foods from './pages/foods'
import Results from './pages/results'
import Consumption from './pages/consumption'
import NotFound from './pages/notfound'
import AuthPage from './pages/auth'

import { useProfile } from "@/features/UserAuth";

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: ReactNode }) {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {

  return (
    
  <QueryClientProvider client={queryClient}>
    
    <I18nProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/foods" element={<RequireAuth><Foods/></RequireAuth>} />
            <Route path="/results" element={<RequireAuth><Results/></RequireAuth>} />
            <Route path="/consumption" element={<RequireAuth><Consumption/></RequireAuth>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      <Toaster richColors position="top-center" />
    </I18nProvider>
  </QueryClientProvider>
  )
}

export default App
