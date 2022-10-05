import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import profilePlaceholder from "../../assets/profile-placeholder.jpg";
import { SignUpPage } from "../../pages/SignUpPage";

export function SignUpForm() {
  const startRef = useRef();
  const passwordInput = useRef();
  const createButton = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    startRef.current.focus();
  }, []);
  const [userForm, setUserForm] = useState({
    name: "",
    lastName: "",
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
        <label>Last name</label>
        <input
          name="lastName"
          value={userForm.lastName}
          onChange={handleChange}
        />
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
            className="w-full rounded-md border-gray-300 px-5 py-3 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs"
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
        <button
          ref={createButton}
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          CREATE ACCOUNT
        </button>
      </form>
    </>
  );
}
