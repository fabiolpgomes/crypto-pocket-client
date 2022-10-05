import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage/index";
import { ErrorPage } from "./pages/ErrorPage/index";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Profile } from "./pages/Profile/index";
import { SignUpPage } from "./pages/SignUpPage/index";
import { CryptoDetails } from "./pages/CryptoDetails/index";
import { ConfirmEmail } from "./pages/ConfirmEmail";
import { AuthContextComponent } from "./contexts/authContext";

import { ProtectedRoute } from "./components/ProtecteRoute";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/dashboard-page" element={<DashboardPage />} />
          <Route path="/CryptoDetailst" element={<CryptoDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
