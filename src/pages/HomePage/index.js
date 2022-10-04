import { Link } from "react-router-dom";
export function HomePage() {


    return (  
        <div className="container-xxl main-container">
        <div className="container-md bg-info p-3 border border-dark rounded">
          <h2>Crypto Pocket</h2>
          <hr className="bg-dark" />
          <div className="d-flex align-items-center justify-content-center gap-2">
            <Link to="/sign-up">
              <button type="button" className="btn btn-md p-3 mb-4 bg-body rounded">
                CREATE ACCOUNT
              </button>
            </Link>
            <Link to="/login">
              <button type="button" className="btn btn-md p-3 mb-4 bg-body rounded">
                LOGIN
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

