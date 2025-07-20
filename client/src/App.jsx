import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Access from "./pages/access/access";
import { CourseProvider } from "./context/coursecontext";
import styles from "./App.module.css";

function App() {
  return (
    <CourseProvider>
      <Router>
        <div className={styles.app}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/access" element={<Access />} />
          </Routes>
        </div>
      </Router>
    </CourseProvider>
  );
}

export default App;
