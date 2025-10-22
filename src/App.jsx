import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";
import Home from "./pages/home";
import Marketplace from "./pages/marketplace";
import Login from "./pages/login";
import Signup from "./pages/signup";
import HeroSection from "./components/common/HeroSection";
import StatsSection from "./components/common/StatsSection";
import AuctionCard from "./components/common/AuctionCard";
import Loader from "./components/common/loader";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* <HeroSection /> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <AuctionCard />
        <StatsSection />
        <Footer />
  
      </div>
    </Router>
  );
}

export default App;
