import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar flex justify-between items-center py-4 px-6">
      <Link to="/" className="hover:opacity-90 transition-opacity">
        <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          R8MyCV
        </p>
      </Link>

      <Link
        to="/upload"
        className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-200 flex items-center gap-2"
      >
        📄 Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;
