import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from "./components/Menu/Menu";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import GoalsPage from "./pages/GoalsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
