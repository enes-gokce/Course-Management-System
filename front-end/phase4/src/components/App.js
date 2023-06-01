import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Registration from "././Registration";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Grades from "./Grades/Grades";

function App() {
  return (
      <div>
          <Router>
              <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/grades" element={<Grades />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;