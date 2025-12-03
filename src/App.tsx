import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Certifications from "./pages/Certifications";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import Exam from "./pages/Exam";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/study/:certId/flashcards" element={<Flashcards />} />
          <Route path="/study/:certId/quiz" element={<Quiz />} />
          <Route path="/study/:certId/exam" element={<Exam />} />
          <Route path="/progress" element={<Progress />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
