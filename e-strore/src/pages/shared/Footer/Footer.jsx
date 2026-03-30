import Logo from "../Logo/Logo";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import Swal from "sweetalert2";

const Footer = () => {
  const { user, logOut } = useAuth();
  const [isAdmin, adminLoading] = useAdmin();

  const handleLogout = async () => {
    await logOut();
    Swal.fire({
      icon: "success",
      title: "Logged out successfully",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const dashboardLink = isAdmin
    ? "/dashboard/adminHome"
    : "/dashboard/userHome";

  return (
    <footer className="bg-base-200 text-base-content">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-4 text-sm opacity-70">
            Premium quality products with fast delivery and secure payment.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h6 className="footer-title">Shop</h6>
          <div className="flex flex-col gap-2">
            <Link to="/" className="link link-hover">Home</Link>
            <Link to="/products/all" className="link link-hover">All Products</Link>
            <Link to="/products/featured" className="link link-hover">Featured</Link>
          </div>
        </div>

        {/* Account */}
        <div>
          <h6 className="footer-title">Account</h6>

          {!user && (
            <div className="flex flex-col gap-2">
              <Link to="/login" className="link link-hover">Login</Link>
              <Link to="/register" className="link link-hover">Register</Link>
            </div>
          )}

          {user && (
            <div className="flex flex-col gap-2">
              {!adminLoading && (
                <Link to={dashboardLink} className="link link-hover">
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="link link-hover text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Legal */}
        <div>
          <h6 className="footer-title">Legal</h6>
          <div className="flex flex-col gap-2">
            <Link to="/privacy-policy" className="link link-hover">
              Privacy Policy
            </Link>
            <Link to="/terms" className="link link-hover">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="link link-hover">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} E-Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;