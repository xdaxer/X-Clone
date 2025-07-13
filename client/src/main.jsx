import { createRoot } from "react-dom/client";
import ContextProvider from "./Context/provider";
import "./index.scss";
 

createRoot(document.getElementById("root")).render(<ContextProvider />);
