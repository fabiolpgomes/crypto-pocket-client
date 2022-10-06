import { Link } from "react-router-dom";
import Logo from "../../assets/Low Resolution Logo - White Background.png"

function NavBar() {
  return (
    <header className="bg-indigo-600">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
              <span className="sr-only">Crypto Pocket</span>
              <Link to="/">

              <img
                className="h-14 w-auto" style={{borderRadius: "8px"}}
                src={Logo}
                alt="logo"
              />
              </Link>
            
            <div className="ml-10 hidden space-x-8 lg:block">
              <Link
                to="/"
                className="text-base font-medium text-white hover:text-indigo-50"
              >
                Home Page
              </Link>

              <Link
                to="/about"
                className="text-base font-medium text-white hover:text-indigo-50"
              >
                About
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <Link
              to="/login"
              className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in
            </Link>
            <Link
              to="/sign-up"
              className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          <Link
            to="/sign-up"
            className="text-base font-medium text-white hover:text-indigo-50"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="text-base font-medium text-white hover:text-indigo-50"
          >
            Login
          </Link>
          <Link
            to="/about"
            className="text-base font-medium text-white hover:text-indigo-50"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
