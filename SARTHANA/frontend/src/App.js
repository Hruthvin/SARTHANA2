import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import SyllabusPage from './pages/SyllabusPage';
import NotesList from './pages/NotesList'; // Adjust the path as per your file structure

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/syllabus" element={<SyllabusPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/notes" element={<NotesList />} /> {/* Add route for NotesList */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
