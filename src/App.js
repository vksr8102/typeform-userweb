import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import Home from './pages/Home';
import { Route,BrowserRouter as Router, Routes } from "react-router-dom"
import Form from './pages/form/Form';
import Preview from './pages/preview/Preview';
function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route exact path="/" element={<Form  />} />
        <Route exact path="/preview" element={<Preview  />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
