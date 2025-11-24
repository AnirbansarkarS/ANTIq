import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";
import Home from "./pages/home";
import Marketplace from "./pages/marketplace";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
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
              {/* <Route
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
                    /> */}
            </Routes>
            
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;