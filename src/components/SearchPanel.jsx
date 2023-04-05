import { useMain } from 'context/MainContext';
import 'styles/css/main.css';
import { ReactComponent as IconCreate} from 'assets/icons/create_item.svg';
import { useNavigate } from 'react-router-dom';

export default function SearchPanel({ getSearchList }){
  const { sortData, searchString} = useMain();
  const navigate = useNavigate();

  async function handleSearch(value){
    getSearchList(value, sortData);
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
          <button type="button" className="btn btn-secondary active">All</button>
          <button type="button" className="btn btn-secondary">Open</button>
          <button type="button" className="btn btn-secondary">In Progress</button>
          <button type="button" className="btn btn-secondary">Done</button>
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