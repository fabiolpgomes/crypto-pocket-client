import {SignUpForm} from "../../components/SignUpForm";

export function SignUpPage() {
  return (
    <div className="container-md main-container p-3 mb-2 bg-light text-dark border border-dark rounded p-3">
      <h2>Create Account</h2>
      <SignUpForm />
    </div>
  );
}
