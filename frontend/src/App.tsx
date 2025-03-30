import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import WorkoutListPage from './pages/WorkoutListPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
        <Header />
        <main >
          <Routes>
            <Route path="/" element={<WorkoutListPage />} />
            <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
            <Route path="*" element={<div className="text-center py-10">Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
