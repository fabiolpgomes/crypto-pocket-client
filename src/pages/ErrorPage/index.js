import { Link } from "react-router-dom";

export function ErrorPage() {
  return (

    <div className="container-xxl main-container">
      <div className="container-sm bg-danger border border-dark rounded p-3">
        <h2>Oops, page not found!!!</h2>
        <br />
        <p>
        It looks like you tried to access a page that doesn't exist on our domain.
        </p>
        <hr className="bg-dark" />
        <Link to="/">
          <button type="button" className="btn btn-secondary btn-lg">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  );
}


