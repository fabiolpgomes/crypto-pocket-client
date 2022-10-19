import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Logo from "../../assets/High Resolution Logo.png";
export function SignUpForm() {
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
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
    if (
      userForm.password === "" ||
      userForm.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
      )
    ) {
      setShowPasswordValidation(false);
    } else {
      setShowPasswordValidation(true);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/users/sign-up", { ...userForm });
      navigate("/confirm-email");
      toast.success("Account created.");
    } catch (error) {
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
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              style={{ borderRadius: "20px" }}
              className="mx-auto h-12 w-auto"
              src={Logo}
              alt="Crypto Pocket"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Welcome, be a member, Create your account!
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm"></div>
            <div>
              <input
                ref={startRef}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                id="name"
                type="text"
                value={userForm.name}
                name="name"
                placeholder="Name"
                required
                onChange={handleChange}
              />
            </div>

            <input
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              name="lastName"
              value={userForm.lastName}
              placeholder="Last Name"
              onChange={handleChange}
            />

            <div>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                value={userForm.email}
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <p>
                Password must contain at least one digit, one lowercase letter,
                one capital letter, one special character and must contain at
                least 8 of the characters mentioned
              </p>
              <input
                ref={passwordInput}
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
                value={userForm.password}
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <label
                  htmlFor="Show Password"
                  className="ml-2 block text-sm text-gray-900"
                >
                  <input
                    type="checkbox"
                    id="password"
                    name="password"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onClick={showPassword}
                  />
                  Show password
                </label>
              </div>

              {showPasswordValidation && (
                <div className="text-sm">
                  <p className="font-medium text-red-600 hover:text-red-500">
                    Invalid password!
                  </p>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
