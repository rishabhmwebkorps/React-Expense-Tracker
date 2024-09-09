import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import UserDashboard from './components/Userdashboard/UserDashboard';
import IncomeForm from './components/Income/Income'
import Expense from './components/Expense/Expense'
import AdminDashboard from './components/admin/AdminDashboard'
import AllUsers from './components/admin/AllUsers';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn/>}></Route>
          <Route path='/signUp' element={<SignUp/>}></Route>
          <Route path='/userdashboard' element={<UserDashboard/>}></Route>
          <Route path='/income' element={<IncomeForm/>}></Route>
          <Route path='/expense' element={<Expense/>}></Route>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
          <Route path='/all' element={<AllUsers/>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
