import ReactDOM from "react-dom/client";
import "./main.css";
import Initializer from "./Initializer";
import Home from "./app/page";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Initializer>
    <Home />
  </Initializer>
);
