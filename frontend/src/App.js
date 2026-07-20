import "@/App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { CookieConsent } from "@/components/site/CookieConsent";
import Home from "@/pages/Home";
import IndustryPage from "@/pages/IndustryPage";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

function App() {
  return (
    <div className="App bg-[#080808] text-white antialiased">
      <HashRouter>
        <CustomCursor />
        <ScrollProgress />
        <Toaster position="top-center" theme="dark" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <CookieConsent />
      </HashRouter>
    </div>
  );
}

export default App;
