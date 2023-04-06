import { useMain } from "context/MainContext";
import { NavLink, useNavigate } from "react-router-dom";
import 'styles/css/navbar.css'
import axios from "axios";

import { ReactComponent as IconLogout} from 'assets/icons/logout.svg';
import { useEffect } from "react";

export default function Navbar(){
  const navigate = useNavigate();
  const { userData,setUserData } = useMain();

  // 取得UserData
  useEffect(() => {
    if(userData === null){
      async function getUserData(){
        try {
          const result = await axios.get(`http://localhost:5000/getUserData`,{
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('access_token')
            }
          });
          setUserData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
      getUserData();
    }
    
  }, [userData])

  // 登出
  function handleLogout(){
    localStorage.removeItem("access_token");
    navigate('/');
  }

  return(
    <>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <NavLink className='navbar-brand' to='/main'>
          {userData !== null && userData !== undefined?
          <>
            <img className="navbar_avatar" src={userData.avatar_url} alt="avatar" />
            <p>Hi,{userData.login}</p>
          </>
          :
            <></>
          }
        </NavLink>
        <button className='logout_btn btn btn-danger' onClick={handleLogout} >
          <IconLogout className="logout_icon" />
          登出
        </button>
      </nav>
    
    </>
  )
}