import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const handleLogin = () => {
    const users = getFromLocalStorage('users') || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      toast.error('Invalid email or password!');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    toast.success('Login Successful!');

    setTimeout(() => {
      navigate(user.role === 'admin' ? '/admin-dashboard' : '/userdashboard');
    }, 2000);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="login-container">

        <div className='img-containers'>

          <img src='/office-workplace.svg'></img>
        </div>
        <div className="login-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-fields"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-fields"
          />
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
          <div className="signup-link">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Login;
