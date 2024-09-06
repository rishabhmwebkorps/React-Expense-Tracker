import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import UserDashboard from './components/Userdashboard/UserDashboard';
import Income from './components/Income/Income'
import Expense from './components/Expense/Expense'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn/>}></Route>
          <Route path='/signUp' element={<SignUp/>}></Route>
          <Route path='/userdashboard' element={<UserDashboard/>}></Route>
          <Route path='/income' element={<Income/>}></Route>
          <Route path='/expense' element={<Expense/>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
