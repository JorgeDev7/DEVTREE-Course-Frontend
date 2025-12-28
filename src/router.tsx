import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/app/AppLayout";
import AuthLayout from "./layouts/auth/AuthLayout";
import LinkTreeView from "./views/app/LinkTreeView";
import ProfileView from "./views/app/ProfileView";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>

        <Route path="/admin" element={<AppLayout />}>
          <Route index element={<LinkTreeView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
