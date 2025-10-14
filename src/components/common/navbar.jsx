import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-yellow-400">ANTIQ</Link>
      <div className="space-x-6">
        <Link to="/marketplace" className="hover:text-yellow-300">Marketplace</Link>
        <Link to="/login" className="hover:text-yellow-300">Login</Link>
        <Link to="/signup" className="hover:text-yellow-300">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
