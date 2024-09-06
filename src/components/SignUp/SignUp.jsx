import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 

  const isFieldEmpty = (value) => {
    const emptyRegex = /^\s*$/;
    return emptyRegex.test(value);
  };

  const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleRegister = () => {
    if (isFieldEmpty(username)) {
      toast.error('Username cannot be empty!');
      return;
    }

    if (isFieldEmpty(email)) {
      toast.error('Email cannot be empty!');
      return;
    }

    if (isFieldEmpty(password)) {
      toast.error('Password cannot be empty!');
      return;
    }

    if (password !== cpassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = getFromLocalStorage('users') || [];
      const newUser = { username, email, password, role };
      users.push(newUser);
      saveToLocalStorage('users', users);

      setLoading(false);
      handleCloseModal()
      toast.success('Registration Successful!');
    }, 3000);
  };

  const handleRoleSelect = (event) => {
    setRole(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/'); 
  };

  return (
    <>

      <ToastContainer position="top-center" autoClose={3000} />
      <div className="signup-container">
        {loading && <div className="loader">Loading...</div>}

        <div className='img-container'>
          <img src='/business-investment.svg'></img>
        </div>

        <div className="signup-form">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e) => setcPassword(e.target.value)}
            className="input-field"
          />

          <select value={role} onChange={handleRoleSelect} className="input-field">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button onClick={handleRegister} className="signup-button">
            Register
          </button>

          <div className="login-link">
            <span>Already have an account?</span>
            <Link to="/"> Login</Link>
          </div>
        </div>


      </div>
    </>
  );
};

export default SignUp;
