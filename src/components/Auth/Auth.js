import { useState, useContext } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { authUser } from '../../services/auth';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);
  
  if (user) {
    return <Redirect to='/todos' />;
  }
  const submitAuth = async (e) => {
    e.preventDefault();

    const userInput = await authUser(email, password, type);
    setUser(userInput);
  };

  return (
    <div id='auth-container'>
      <NavLink id='sign-up' to='/auth/sign-up' >Sign Up</NavLink>
      <NavLink id='sign-in' to='/auth/sign-in' >Sign In</NavLink>
      <form onSubmit={submitAuth}>
        <label> Email
          <input type='text' name='email' value={email} onChange={e => setEmail(e.target.value)}></input>
        </label>
        <label> Password
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}></input>
        </label>
        <input type='submit' value='submit'></input>
      </form>
    </div>
  );
}