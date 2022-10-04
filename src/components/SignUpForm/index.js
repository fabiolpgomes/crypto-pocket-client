import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { SignUpPage } from "../../pages/SignUpPage";

export function SignUpForm() {
  const startRef = useRef();
  const passwordInput = useRef();
  const createButton = useRef();
  const navigate = useNavigate();
  const [preview, setPreview] = useState();

  useEffect(() => {
    startRef.current.focus();
  }, []);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    createButton.current.disabled = true;

    try {
      await api.post("/users/sign-up", { ...userForm });
      toast.success("Account created.");
      navigate("/confirm-email");
    } catch (error) {
      createButton.current.disabled = false;
      console.log(error);
      toast.error("Unable to create account, check information.");
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
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label fw-bold" htmlFor="name">
            Name
          </label>
          <input
            ref={startRef}
            className="form-control"
            id="name"
            type="text"
            value={userForm.name}
            name="name"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label fw-bold" htmlFor="email">
            E-mail
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            value={userForm.email}
            name="email"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold" htmlFor="password">
            Password
          </label>
          <input
            ref={passwordInput}
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

        <button ref={createButton} type="submit" className="btn btn-primary">
          CREATE ACCOUNT
        </button>
      </form>
    </>
  );
}
