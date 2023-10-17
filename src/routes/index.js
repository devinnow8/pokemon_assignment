import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import App from "../App";
// import Ability from "../pages/ability";

function Router() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <Routes>
        <Route exact path="/" element={<App />} />
        {/* <Route exact path="/ability/:id" element={<Ability />} /> */}
      </Routes>
    </div>
  );
}

export default Router;
