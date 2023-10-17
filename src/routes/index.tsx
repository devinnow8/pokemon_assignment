import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import App from "../App";

function Router() {
  const navigate = useNavigate();
  return (
    <div>
      {/* <button onClick={() => navigate(-1)}>Go back</button> */}
      <Routes>
        <Route  path="/" element={<App />} />
      </Routes>
    </div>
  );
}

export default Router;
