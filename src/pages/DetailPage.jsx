import Navbar from "components/Navbar";
import { useMain } from "context/MainContext";
import 'styles/css/detail.css'
import { ReactComponent as IconBack} from 'assets/icons/left_arrow.svg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "api";

export default function DetailPage(){
  const { userData, issue, currentState, setCurrentState, setIssue, setIssueList } = useMain();
  const navigate = useNavigate();

  // 進入編輯頁
  function handleEdit(index){
    navigate(`/edit?id=${index}`);
  }

  // 修改issue狀態
  async function setIssueState(value){
    setCurrentState(value);
    let substring_from = 30 + userData.login.length;
    const repo = issue.repository_url.substring(substring_from);
    try {
      const result = await axios.get(`${baseUrl}/setLabelsToIssue?username=${userData.login}&repo=${repo}&number=${issue.number}&label=${value}`,{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token')
        }
      });
      if(result.status === 200){
        const new_data = result.data;
        setIssue((prevData)=>{
          return{ 
            ...prevData,
            labels: new_data
          }
        });
        setIssueList((prevData)=>{
          return prevData.map(data=>{
            if(data.id === issue.id){
              return{
                ...data,
                labels: new_data
              }
            }
            else{
              return data
            }
          })
        });
        alert('狀態已修改');
      }
    } catch (error) {
      console.log(error);
    }

  }

  // 刪除Issue
  async function deleteIssue(){
    let delete_confirm = window.confirm("確定要刪除嗎?");
    if(delete_confirm){
      let substring_from = 30 + userData.login.length;
      const repo = issue.repository_url.substring(substring_from);
      try {
        // 刪除issue資料(closed)
        const result = await axios.get(`${baseUrl}/deleteIssue?username=${userData.login}&repo=${repo}&number=${issue.number}`,{
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('access_token')
          }
        });
        if(result.status === 200){
          const new_data = result.data;
          setIssueList((prevData)=>{
            return prevData.map((item) => {
              if(item.id === new_data.id){
                return{
                  ...item,
                  state: new_data.state
                };
              }else{
                return item;
              }
            })
          });
          alert('刪除成功！')
          navigate('/main');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // 下拉選単資料
  let issue_state = 'open';
  if(issue.labels.length > 0){
    issue_state = issue.labels[0].name
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
              <select className="state_select" value={issue_state} onChange={(e)=>{setIssueState(e.target.value)}}>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button className="btn btn-warning" onClick={()=>{handleEdit(issue.number)}}>編輯</button>
              <button className="btn btn-danger" onClick={()=>{deleteIssue(issue.number)}}>刪除</button>
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