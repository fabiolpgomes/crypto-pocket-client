import { Link } from "react-router-dom";

export function ConfirmEmail() {
  return (
    <div>
      <h1> Access created, check your email to activate your account </h1>
      <Link to="/login">
        <button type="button" className="btn btn-md p-3 mb-4 bg-body rounded">
          Login
        </button>
      </Link>
    </div>
  );
}
