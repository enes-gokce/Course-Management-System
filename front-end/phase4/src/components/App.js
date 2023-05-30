import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Registration from "././Registration";
import Profile from "./Profile";
import Login from "./Login";

function App() {
  return (
      <div>
          <Router>
              <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/profile" element={<Profile />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;