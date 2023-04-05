import { NavLink, useNavigate } from "react-router-dom";
import 'styles/css/list.css'
import { ReactComponent as IconArrorUp} from 'assets/icons/caret_up.svg';
import { ReactComponent as IconArrorDown} from 'assets/icons/caret_down.svg';
import { useMain } from "context/MainContext";
import axios from "axios";

export default function IssueList({ getSearchList }){
  const { sortDate, searchString, setIssue, issueList, userData } = useMain();
  const navigate = useNavigate();

  const data_item = issueList.map((item,index) => {
    const link = `/detail?id=${item.number}`
    return <IssueItem key={item.id} index={index} data={item} link={link} handleDetail={handleDetail} />
  })

  // 取得詳細頁資料
  async function handleDetail(index, repo_url){
    const user_name = userData.login;
    let substring_from = 30 + user_name.length;
    const repo_name = repo_url.substring(substring_from);
    try {
      const result = await axios.get(`http://localhost:5000/getDetail?username=${user_name}&repo=${repo_name}&number=${index}`,{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token')
        }
      });
      setIssue(result.data);
      navigate(`/detail?id=${index}`)
    } catch (error) {
      console.log(error);
    }
  }

  // 排序
  function handleSort(){
    getSearchList(searchString, !sortDate);
  }

  return(
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="item_num" scope="col">#</th>
            <th className="item_title" scope="col">標題</th>
            <th className="item_content" scope="col">內容</th>
            <th className="item_state" scope="col">狀態</th>
            <th className="item_date" scope="col" onClick={handleSort}>
              建立日期
              {sortDate? <IconArrorDown className="sort_icon" /> : <IconArrorUp className="sort_icon" />}
            </th>
          </tr>
        </thead>
        <tbody>
          {data_item}
        </tbody>
      </table>
    </>
  )
}

function IssueItem({ index, data, link, handleDetail }){
  return(
    <>
      <tr>
        <th className="num" scope="row">{index+1}</th>
        <td className="title">
          <NavLink className='title_link' onClick={()=>{handleDetail(data.number, data.repository_url)}}>
            {data.title}
          </NavLink>
        </td>
        <td className="content">{data.body}</td>
        <td className="state">{data.state}</td>
        <td className="date">{data.created_at.substring(0,10)}</td>
      </tr>
    </>
  )
}