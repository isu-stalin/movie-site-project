import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import store from "./redux/store/store.ts";

const queryClient = new QueryClient();
const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="993854268078-ffipa1ogo31dqr9l93sr1dc6m5mfjnec.apps.googleusercontent.com">
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
