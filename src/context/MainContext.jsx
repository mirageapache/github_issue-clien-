import { createContext, useContext, useState } from "react";

const defaultValue = {
  rerender: false,
  userData: null,
  issue: null,
  issueList: null,
  searchString: '',
  sortDate: true,
  currentState: 'all',
  page: 1,
  total_count: 0
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
  const [total_count, setTotalCount] = useState(0) //資料總筆數
  const [page, setPage] = useState(1); // 資料載入分頁index

  return (
    <MainContext.Provider 
      value={{
          rerender, setRerender,
          userData, setUserData,
          issue, setIssue,
          issueList, setIssueList, 
          searchString, setSearchString,
          sortDate, setSortDate,
          currentState, setCurrentState,
          page, setPage,
          total_count, setTotalCount
        }}
      >
      {children}
    </MainContext.Provider>
  );
};
