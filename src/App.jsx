import { Route, Routes } from "react-router";
import Root from "./Layout/Root";
import Home from "./Pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root/>} >
       <Route index element={<Home/>} />
      </Route>
    </Routes>
  );
};

export default App;