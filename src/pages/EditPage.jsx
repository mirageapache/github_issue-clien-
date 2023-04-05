import axios from "axios";
import Navbar from "components/Navbar";
import { useMain } from "context/MainContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'styles/css/edit.css'

export default function EditPage(){
  const { userData, setRerender } = useMain();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [repo, setRepo] = useState('');
  const [repoList, setRepoList] = useState();
  const navigate = useNavigate();

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

  // 建立Issue
  async function EditIssue(){
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
      // return
    }

    try {
      // 編輯issue資料
      const result = await axios.get(`http://localhost:5000/editIssue?username=${userData.login}&repo=${repo}&title=${title}&body=${body}`,{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token')
        }
      });
      console.log(result);
      if(result.status === 200){
        //將新建立的issue 加入state
        createLabels();
        setRerender(true);
        navigate('/main');
      }
    } catch (error) {
      console.log(error);
    }

  }

  return(
    <>
      <Navbar />
      <div className="edit_page">
        <h3 className="edit_title">編輯內容</h3>

        <div className="edit_form form-group">
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

          </div>
        </div>

        <div className="form_btn">
          <button className="cancel_btn btn btn-secondary" onClick={()=>{window.history.back()}}>取消</button>
          <button className="submit_btn btn btn-success" onClick={EditIssue}>修改</button>
        </div>
      </div>
    </>
  )
}