import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainProvider } from 'context/MainContext';

function App() {

  return (
    <BrowserRouter>
      <MainProvider>
        <div className="App">
          <section className='container'>
            <LoginPage />
            <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path='main' element={<MainPage />}></Route>
              <Route path='detail' element={<DetailPage />}></Route>
              <Route path='create' element={<CreatePage />}></Route>
              <Route path='edit' element={<EditPage />}></Route>
            </Routes>
          </section>
        </div>
      </MainProvider>
    </BrowserRouter>
  );
}

export default App;
