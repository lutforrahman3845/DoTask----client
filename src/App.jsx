import { Route, Routes } from "react-router";
import Root from "./Layout/Root";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import PrivateRoute from "./Router/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/signIn" element={<SignIn/>} />
      <Route path="/" element={<PrivateRoute><Root/></PrivateRoute>} >
       <Route index element={<Home/>} />
      </Route>
    </Routes>
  );
};

export default App;