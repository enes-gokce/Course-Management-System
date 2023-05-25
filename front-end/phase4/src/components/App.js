import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Navbar from "./Navbar";

function App() {
  return (
      <div>
          <Router>
              <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;