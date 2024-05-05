import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate(); // Create a navigate function
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    if (location.pathname == "/profile") {
      navigate("..");
    }
  };

  return (
    <nav className="navbar">
      <div className="links">
        <div className="navbar-left">
          <Link to="/">FitBuddyPal</Link>
        </div>

        <div className="navbar-mid">
          <Link to="/">Home</Link>
          <Link to="/exercise">Exercise</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/about">About</Link>
          {user && (
            <>
              <Link to="/profile">Profile</Link>
            </>
          )}
        </div>

        <div className="navbar-right">
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}

          {user && (
            <>
              <div></div>
              <Link onClick={handleLogout}>{user.name} | Logout </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
