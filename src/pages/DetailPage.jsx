import Navbar from "components/Navbar";
import { useMain } from "context/MainContext";
import 'styles/css/detail.css'
import { ReactComponent as IconBack} from 'assets/icons/left_arrow.svg';

export default function DetailPage(){
  const { userData, issue, currentState, setCurrentState } = useMain();

  // 狀態選單
  function selectChange(value){
    setCurrentState(value);
  }

  return(
    <>
      <Navbar />
      <div className="detail_panel">
        <div className="banner">
          <button className="back_btn btn btn-secondary" onClick={()=>{window.history.back()}}>
            <IconBack className="back_icon"/>
            回上一頁
          </button>
        </div>
        {/* 個人資料 */}
        <div className="user_profile">
          <img className="user_avatar" src={userData.avatar_url} alt="" />
          <h4 className="user_name">{userData.login}</h4>
        </div>
        <div className="content">
          <div className="info">
            {/* issue 標題 */}
            <h3 className="detail_title">{issue.title}</h3>

            {/* 操作 */}
            <div className="operate">
              <select className="state_select" value={currentState} onChange={(e)=>{selectChange(e.target.value)}}>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button className="btn btn-warning">編輯</button>
              <button className="btn btn-danger">刪除</button>
            </div>
          </div>
          {/* issue 內文 */}
          <div className="detail_body">
            {issue.body}
          </div>
        </div>  
      </div>
    </>
  )
}