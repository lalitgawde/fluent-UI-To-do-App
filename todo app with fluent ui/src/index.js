import ReactDOM from "react-dom/client";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import "./index.css";
import App from "./App";
import TaskContextProvider from "./store/task-context";

initializeIcons();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TaskContextProvider>
    <App />
  </TaskContextProvider>
);
