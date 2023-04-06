import { useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";
import IssueList from "components/IssueList";
import SearchPanel from "components/SearchPanel";
import 'styles/css/main.css';
import { useMain } from "context/MainContext";

export default function MainPage(){
  const { userData, setUserData } = useMain();
  const { issueList, setIssueList } = useMain();
  const { searchString, setSearchString} = useMain('');
  const { setSortDate } = useMain(true);

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
  }, [setUserData])


  // 取得Search List
  async function getSearchList(searchString, sortDate){
    setSearchString(searchString);
    if(sortDate === undefined || sortDate === null){
      sortDate = true;
    }
    setSortDate(sortDate);
    let parmas = `author:${userData.login}`;

    if(searchString !== null && searchString !== undefined){
      parmas = `author:${userData.login} ${searchString} in:title ${searchString} in:body`;
    }
    try {
      const result = await axios.get(`http://localhost:5000/getSearchList?q=${parmas}&sort=${sortDate}`,{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token')
        }
      });
      setIssueList(result.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  // 取得Issue List
  useEffect(()=>{
    if(userData!== null && issueList === null){
      // 取得Issue List
      async function getIssueList(){
        try {
          const result = await axios.get(`http://localhost:5000/getIssueList?q=author:${userData.login}`,{
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('access_token')
            }
          });
          console.log(result)
          setIssueList(result.data.items);
        } catch (error) {
          console.log(error);
        }
      }
      getIssueList();
    }
  },[issueList,setIssueList])


  return(
    <>
    {/* User Data */}
      {userData !== null ?
        <>
        <Navbar />
        <SearchPanel  getSearchList={getSearchList} />
        { issueList !== null && issueList !== undefined ?
          <>
            <IssueList  getSearchList={getSearchList} />
          </>
          :
          <>
            {searchString !== null || searchString !== '' ?
              <></>
            :
              <h3 className="search_message">找不到相關資料！</h3>
            }
          </>
        }
        </>
      :
        <>
          <h2>資料載入中。。。</h2>
        </>
      }

    </>
  )

}