import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { I18nProvider } from "@/lib/i18n";
import { StoreProvider } from "@/lib/store";
import { Toaster } from "sonner";

import Home from './pages/home'
import Foods from './pages/foods'
import History from './pages/history'
import Results from './pages/results'
import NotFound from './pages/notfound'


const queryClient = new QueryClient();

function App() {

  return (
    
  <QueryClientProvider client={queryClient}>
    
    <StoreProvider>
      <I18nProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/foods" element={<Foods/>} />
              <Route path="/history" element={<History/>} />
              <Route path="/results" element={<Results/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </BrowserRouter>
        <Toaster richColors position="top-center" />
      </I18nProvider>
    </StoreProvider>
  </QueryClientProvider>
  )
}

export default App
