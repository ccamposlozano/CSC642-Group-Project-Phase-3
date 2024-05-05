import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Exercise from "./pages/Exercise";
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";


function App() {
  // const queryClient = new QueryClient()

  //const requireAuth = require('../middleware/requireAuth')
  //const router = express.Router()
  //router.use(requireAuth)

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
