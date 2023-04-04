import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
         <section className='container'>
          <LoginPage />
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='main' element={<MainPage />}></Route>
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
