
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { SupabaseProvider } from "@/lib/supabase/SupabaseProvider";
import { useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Garden from "./pages/Garden";
import Projects from "./pages/Projects";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Connect from "./pages/Connect";
import Philosophy from "./pages/Philosophy";
import Entrepreneurship from "./pages/Entrepreneurship";

const queryClient = new QueryClient();

// ScrollToTop component to ensure page scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Protected Route component that redirects to home if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// AppRoutes component that contains routes and conditionally renders based on auth
const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Early return showing loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Core pages available to everyone */}
        <Route path="/" element={<Index />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/entrepreneurship" element={<Entrepreneurship />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SupabaseProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SupabaseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
