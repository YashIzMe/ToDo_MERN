import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Auth from './components/Auth/Auth';
import ResetPassword from "./components/Auth/ResetPassword";
import Todo from "./components/ToDo/Todo";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route exact path="/reset" element={<ResetPassword />} />
        <Route exact path="/home" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
