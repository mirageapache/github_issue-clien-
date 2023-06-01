import { useMain } from 'context/MainContext';
import 'styles/css/main.css';
import { ReactComponent as IconCreate} from 'assets/icons/create_item.svg';
import { useNavigate } from 'react-router-dom';

export default function SearchPanel({ getSearchList, getIssueList }){
  const { sortData, searchString, setSearchString, currentState, setCurrentState} = useMain();
  const { search_mode, setSearchMode, setPage } = useMain();
  const navigate = useNavigate();

  // 輸入捜尋
  function handleSearch(value){
    if(!search_mode){
      setPage(1);
    }
    setSearchMode(true);
    setSearchString(value)
    getSearchList(value, sortData, currentState);
  }

  // 狀態分類搜尋
  function handleState(value){
    console.log(value)
    if(value === 'all'){
      setSearchMode(false);
      getIssueList();
    }
    else{
      if(!search_mode){
        setPage(1);
      }
      setSearchMode(true);
      getSearchList(searchString, sortData, value);
    }
    setCurrentState(value);
  }

  return(
    <>
      <div className="search_panel">
        {/* search input */}
        <input 
          className="search_input form-control" 
          type="search" 
          placeholder="搜尋 issue 主題或內容" 
          aria-label="Search" 
          onChange={(e) => {handleSearch(e.target.value)}}
          value={searchString}
        />

        {/* button group */}
        {/* 設定一個context 存state狀態 */}
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <SwtichButton handleState={handleState}/>
        </div>

        {/* create button */}
        <button className='create_btn btn btn-success' onClick={(e)=>{navigate('/create')}}>
          <IconCreate className='create_icon' />
          建立 
          <span>Issue</span>
        </button>
      </div>
    </>
  )
}


function SwtichButton ({ handleState }){
  let items = ['all','open','in_progress','done']
  const { currentState } = useMain();
  const buttons = items.map((item,index) => {
    if(item === currentState){
      return <button key={index} className="btn btn-secondary active" onClick={()=>{handleState(item)}}>{item}</button>
    }
    else{
      return <button key={index} className="btn btn-secondary" onClick={()=>{handleState(item)}}>{item}</button>
    }
  })

  return(
    <>
      {buttons}
    </>
  )
}