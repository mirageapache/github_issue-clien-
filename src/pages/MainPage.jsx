import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";
import IssueList from "components/IssueList";

export default function MainPage(){
  const [userData, setUserData] = useState(null);
  const [issueList, setIssueList] = useState(null);
  const navigate = useNavigate();

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
          console.log(result.data);
          setUserData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
      getUserData();
    }
  }, [userData])

  // 取得Issue List
  useEffect(()=>{
    if(userData!== null && issueList === null){
      async function getIssueList(){
        try {
          const result = await axios.get(`http://localhost:5000/getIssueList?q=author:${userData.login}`,{
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('access_token')
            }
          });
          console.log(result.data.items);
          setIssueList(result.data.items)
        } catch (error) {
          console.log(error);
        }
      }
      getIssueList();
    }
  },[issueList,userData])


  // 登出
  function handleLogout(){
    console.log('execute logout');
    localStorage.removeItem("access_token");
    navigate('/');
  }

  return(
    <>
    {/* User Data */}
      {userData !== null ?
        <>
        <Navbar userData={userData} Logout={handleLogout}/>
        {issueList !== null?
          <IssueList listData={issueList} />
          :
          <></>
        }
        </>
      :
        <>
          <h2>糟糕，發生了一點錯誤！</h2>
          <NavLink to='/' onClick={handleLogout}>請重新登入</NavLink>
        </>
      }

    </>
  )

}