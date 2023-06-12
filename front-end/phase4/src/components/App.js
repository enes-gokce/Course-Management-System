import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Registration from "./Registration/Registration";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Grades from "./Grades/Grades";
import Transcript from "./Transcript/Transcript";
import AdvisingStudents from "./Advising Students/AdvisingStudents";
import Courses from "./Courses/Courses";
import Students from "./Students/Students";
import Teachers from "./Teachers/Teachers";

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
                  <Route path="/transcript" element={<Transcript />} />
                  <Route path="/advising-students" element={<AdvisingStudents />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/teachers" element={<Teachers />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;