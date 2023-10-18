import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import App from "../App";

function Router() {
  return (
    <div>
      <Routes>
        <Route  path="/" element={<App />} />
      </Routes>
    </div>
  );
}

export default Router;
