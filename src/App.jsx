import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";
import Home from "./pages/home";
import Marketplace from "./pages/marketplace";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AddItem from "./pages/additem";
import UserDashboard from "./pages/user_dashboard";
import ItemDetails from "./pages/itmdetails";
import About from "./pages/about";
import Contact from "./pages/contact";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./context/ProtectedRoute";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auction/:id" element={<ItemDetails />} />
                <Route
                  path="/additem"
                  element={
                    <ProtectedRoute>
                      <AddItem />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>

            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;