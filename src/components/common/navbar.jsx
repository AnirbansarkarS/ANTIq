const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 via-black to-amber-800 text-white shadow-lg px-6 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-serif tracking-wide text-amber-400">ANTIQ</h1>
      <ul className="flex gap-8 font-medium">
        <li className="hover:text-amber-300 transition"><a href="/">Home</a></li>
        <li className="hover:text-amber-300 transition"><a href="/marketplace">Marketplace</a></li>
        <li className="hover:text-amber-300 transition"><a href="/about">About</a></li>
        <li className="hover:text-amber-300 transition"><a href="/contact">Contact</a></li>
      </ul>
      <div className="space-x-4">
        <button className="px-4 py-2 border border-amber-400 hover:bg-amber-500 transition rounded">
          Login
        </button>
        <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 transition rounded">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
