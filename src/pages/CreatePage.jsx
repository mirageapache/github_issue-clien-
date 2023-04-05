import axios from "axios";
import Navbar from "components/Navbar";
import { useMain } from "context/MainContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'styles/css/create.css'

export default function CreatePage(){
  const { userData, rerender, setRerender, setIssueList } = useMain();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [repo, setRepo] = useState('');
  const [repoList, setRepoList] = useState();
  const navigate = useNavigate();

  // 取得Repo清單
  useEffect(()=>{
    async function getRepoList(){
      try {
        const result = await axios.get(`http://localhost:5000/getRepoList`,{
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('access_token')
          }
        });
        setRepoList(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRepoList()
  },[])

  // 建立labels
  async function createLabels(){
    const label = ['open','in_progress','done'];
    for(let i = 0; i<=2; i++){
      const result = await axios.get(`http://localhost:5000/createLabels?username=${userData.login}&repo=${repo}&label_name=${label[i]}`,{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token')
        }
      }); 
      console.log(result)
    }
  }

  // 加入labels 至issue
  async function addLabels(number){
    console.log(number);
    const result = await axios.get(`http://localhost:5000/addLabelsToIssue?username=${userData.login}&repo=${repo}&nubmer=${number}`,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('access_token')
      }
    }); 
    console.log(result)
  }

  // 建立Issue
  async function CreateIssue(){
    if(title.length === 0){
      alert('請輸入標題！');
      return
    }
    if(body.length === 0){
      alert('請輸入內容！');
      return
    }
    if(body.length < 30){
      alert('內容至少需要30字以上！');
      return
    }

    try {
      // 建立新的issue
      const result = await axios.get(`http://localhost:5000/createIssue?username=${userData.login}&repo=${repo}&title=${title}&body=${body}`,{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token')
        }
      });
      console.log(result)
      if(result.status === 200){
        // 建立新的label 狀態
        createLabels();
        // 將新建立的issue 加入state
        addLabels(result.data.number);
        setIssueList((prevData)=>{
          return[result.data,...prevData]
        });
        alert('新增成功！')
        navigate('/main');
      }
    } catch (error) {
      console.log(error);
    }

  }

  return(
    <>
      <Navbar />
      <div className="create_page">
        <h3 className="create_title">建立新主題</h3>

        <div className="create_form form-group">
          {/* Title */}
          <input 
            className="title_input form-control" 
            placeholder="請輸入標題" 
            value={title} 
            onChange={(e)=>{setTitle(e.target.value)}}
          />
      
          {/* Body */}
          <input 
            className="body_input form-control" 
            placeholder="請輸入內容" 
            value={body} 
            onChange={(e)=>{setBody(e.target.value)}}
          />
          
          {/* Repo */}
          <div className="select_div">
            <label>選擇一個Repository：</label>
            <select className="repo_select" value={repo} onChange={(e) => {setRepo(e.target.value)}}>
              {repoList !== null && repoList !== undefined?
                <RepoItem repoList={repoList} />
                :
                <></>
              }
            </select>
          </div>
        </div>

        <div className="form_btn">
          <button className="cancel_btn btn btn-secondary" onClick={()=>{window.history.back()}}>取消</button>
          <button className="submit_btn btn btn-success" onClick={CreateIssue}>建立</button>
        </div>
      </div>
    </>
  )
}

function RepoItem({ repoList }){
  const item = repoList.map(item => {
    return <option key={item.id} value={item.name}>{item.name}</option>
  });

  return(
    <>
      {item}
    </>
  )
}