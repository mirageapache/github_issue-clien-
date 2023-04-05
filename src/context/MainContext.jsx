import { createContext, useContext, useState } from "react";

const defaultValue = {
  rerender: false,
  userData: null,
  issue: null,
  issueList: null,
  searchString: '',
  sortDate: true,
  currentState: 'all'
};

const MainContext = createContext(defaultValue);
export const useMain = () => useContext(MainContext);

export const MainProvider = ({ children }) => {
  const [rerender, setRerender] = useState(false); //使用者資料
  const [userData, setUserData] = useState(null); //使用者資料
  const [issue, setIssue] = useState(null); //單筆issue資料
  const [issueList, setIssueList] = useState(null); //issue清單資料
  const [searchString, setSearchString] = useState(); //搜尋字串
  const [sortDate, setSortDate] = useState(true); //list排序
  const [currentState, setCurrentState] = useState('all'); //當前查詢的狀態

  return (
    <MainContext.Provider 
      value={{
          rerender,
          setRerender,
          userData,
          setUserData,
          issue,
          setIssue,
          issueList,
          setIssueList, 
          searchString,
          setSearchString,
          sortDate,
          setSortDate,
          currentState,
          setCurrentState
        }}
      >
      {children}
    </MainContext.Provider>
  );
};
