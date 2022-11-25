import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { logout } from '../Login/loginSlice';
import { RootState } from '../types';
import './styles.css';

function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state:RootState) => state.auth.user);
  async function handleLogout(): Promise<void> {
    await dispatch(logout());
    navigate('/');
  }

  return (
    <nav className="nav">

          <Link id="main" className="links" type="button" to="/">
            Home
          </Link>
         {user ? (
<button className="button-logout" type="button" onClick={handleLogout}>
            Выйти
</button>
) :
          (
<Link className="links" to="/login">
          Войти
</Link>
)}

    </nav>
  );
}

export default Navbar;
