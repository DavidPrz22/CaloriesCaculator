import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { I18nProvider } from "@/lib/i18n";
import { Toaster } from "sonner";

import Home from './pages/home'
import Foods from './pages/foods'
import Results from './pages/results'
import Consumption from './pages/consumption'
import NotFound from './pages/notfound'


const queryClient = new QueryClient();

function App() {

  return (
    
  <QueryClientProvider client={queryClient}>
    
    <I18nProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foods" element={<Foods/>} />
            <Route path="/results" element={<Results/>} />
            <Route path="/consumption" element={<Consumption/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      <Toaster richColors position="top-center" />
    </I18nProvider>
  </QueryClientProvider>
  )
}

export default App
