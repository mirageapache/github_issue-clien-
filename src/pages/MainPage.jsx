import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MainPage(){
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // 取得UserData
    if(userData === undefined){
      async function getUserData(){
        try {
          console.log(localStorage.getItem('access_token'))
          const result = await axios.get(`http://localhost:5000/getUserData`,{
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('access_token')
            }
          });
          console.log(result);
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
    console.log('execute logout');
    localStorage.removeItem("access_token");
    navigate('/');
  }

  return(
    <>
    
      <h2>MainPage, 已經登入</h2>
      <button className='btn btn-danger' onClick={handleLogout} >登出Github</button>

      {/* User Data */}
      {userData !== undefined ?
        <>
        <h4>{userData.login}</h4>
        <img width="100px" height="100px" src={userData.avatar_url} alt=''></img>
        <a href={userData.html_url} style={{"color":"white"}}>View Github Profile</a>
        </>
      :
        <><p>未取得User Data</p></>
      }

    </>
  )

}