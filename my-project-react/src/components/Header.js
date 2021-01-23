import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUser, useDispatchCurrentUser } from "./CurrentUser";
import { callApi } from "../utils";
import HeaderImg from '../images/header_img.png';

const Header = () => {
  const dispatch = useDispatchCurrentUser();
  const user = useCurrentUser();

  console.log(user)

  const handleLogout = async () => {
    await callApi("/logout", "POST");
    dispatch({ type: "LOGOUT" });
    
  }

  return (
    <header className="bg-black-90 fixed w-100 ph3 pv3 pv3-ns ph4-m ph5-l" style={{zIndex: "5"}}>
      <nav className="f6 fw6 ttu tracked">
        <img  style={{ objectFit: "cover", width: "50px", height: "50px"}} src={HeaderImg} />
        <Link style={{ paddingLeft: "30px"}} className="link dim white dib mr3" to="/">
          Карта
        </Link>
        <Link className="link dim white dib mr3" to="/placemarkers">
          Мои точки
        </Link>
        {!user.isAuthenticated && (
          <Link className="link dim white dib mr3" to="/login" >
            Войти
          </Link>
        )}
        {user.isAuthenticated && (
          <Link className="link dim white dib mr3" onClick={handleLogout}>
            Выйти
          </Link>     
        )}
        {user.isAuthenticated && (
          <Link className="link dim white dib mr3" style={{ position: "absolute",right: "0", paddingTop: "10px"}}>
            {user.username}
          </Link>     
        )}
      </nav>
    </header>
  );
};

export default Header;