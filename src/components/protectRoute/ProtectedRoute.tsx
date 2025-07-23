import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { type RootState } from "@/redux/store/store";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? children : <Navigate to="/profile" />;
};

export default ProtectedRoute;