import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DarkModeProvider } from "./Components/Tasks/Navbar/DarkModeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>,
);
