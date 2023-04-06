import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "components/Navbar";
import IssueList from "components/IssueList";
import SearchPanel from "components/SearchPanel";
import 'styles/css/main.css';
import { useMain } from "context/MainContext";

export default function MainPage(){
  const { userData, setUserData } = useMain();
  const { issueList, setIssueList } = useMain();
  const { searchString, setSearchString, setCurrentState} = useMain();
  const { setSortDate } = useMain(true);
  const { page, setPage } = useMain(); // 動態載入

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
  }, [userData,setUserData])


  // 取得Search List
  async function getSearchList(searchString, sortDate, state){
    setSearchString(searchString);
    setSortDate(sortDate);
    setCurrentState(state);
    // 排序
    if(sortDate === undefined || sortDate === null){
      sortDate = true;
    }
    let parmas = `author:${userData.login} `;

    // 搜尋字串
    if(searchString !== null && searchString !== undefined){
      parmas = parmas + ` ${searchString} in:title ${searchString} in:body `;
    }

    // 狀態分類
    if(state.length > 0 && state !== 'all'){
      parmas = parmas + ` state:open label:${state} `
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
    if(userData !== null){
      // 取得Issue List
      async function getIssueList(){
        try {
          const result = await axios.get(`http://localhost:5000/getIssueList?q=author:${userData.login}&page=${page}`,{
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('access_token')
            }
          });
          const new_data = result.data.items;
          if(issueList !== null){
            setIssueList([...issueList, ...new_data]);
          }
          else{
            setIssueList(result.data.items);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getIssueList();
    }
  },[userData,setIssueList,page])

  // 監聽頁面捲動至底部
  window.addEventListener('scroll', () => {
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const scrollTop = Math.max(window.scrollY, window.pageYOffset);
    const clientHeight = window.innerHeight;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log('bottom');
      setPage(page+1)
    }
  });

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