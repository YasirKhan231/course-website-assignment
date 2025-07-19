// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/home";
import Payment from "./pages/Payment/Payment";
import CourseAccess from "./pages/CourseAccess/CourseAccess";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Navbar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/course-access/:courseId" element={<CourseAccess />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
