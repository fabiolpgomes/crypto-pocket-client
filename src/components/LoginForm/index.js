import { useState, useRef, useEffect, useContext } from "react";
import toast. {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";

export function LoginForm() {
  const startRef = useRef();
  const navigate = useNavigate();
  const passwordInput = useRef();

  useEffect(() => {
    startRef.current.focus();
  }, []);

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", userForm);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      setLoggedInUser({ ...response.data });
      navigate("/profile");
      toast.success("Access OK, Connected.");
    } catch (error) {
      console.log(error);
      toast.error("Error connecting.");
    }
  }

  function showPassword() {
    if (passwordInput.current.type === "password") {
      passwordInput.current.type = "text";
    } else {
      passwordInput.current.type = "password";
    }
  }

  return (
    <>
      <Toaster
      position="top-center"
      reverseOrder={false}/>
      <form bg-info onSubmit={handleSubmit}>
        <div className="p-3 mb-2 bg-light text-dark">
          <label className="form-label" htmlFor="email">
            E-mail
          </label>
          <input
            ref={startRef}
            className="form-control"
            type="email"
            id="email"
            value={userForm.email}
            name="email"
            required
            onChange={handleChange}
          />
        </div>

        <div className="p-3 mb-2 bg-light text-dark">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={userForm.password}
            name="password"
            required
            onChange={handleChange}
          />
          <input type="checkbox" onClick={showPassword} />
          Show Password
        </div>

        <button type="submit" className="btn btn-light">
          Login
        </button>
      </form>
    </>
  );
}
