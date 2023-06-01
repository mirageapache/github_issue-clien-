import axios from "axios";
import Navbar from "components/Navbar";
import { useMain } from "context/MainContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'styles/css/edit.css'
import { baseUrl } from "api";

export default function EditPage(){
  const { userData, setIssueList } = useMain();
  const { issue } = useMain();
  const [title, setTitle] = useState(issue.title);
  const [body, setBody] = useState(issue.body);
  const navigate = useNavigate();

  // 建立labels
  async function createLabels(){
    let substring_from = 30 + userData.login.length;
    const repo = issue.repository_url.substring(substring_from);
    const label = ['open','in_progress','done'];
    for(let i = 0; i<=2; i++){
      const result = await axios.get(`${baseUrl}/createLabels?username=${userData.login}&repo=${repo}&label_name=${label[i]}`,{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token')
        }
      }); 
      console.log(result)
    }
  }

  // 編輯Issue
  async function EditIssue(){
    if(title.length === 0){
      alert('標題不能空白！');
      return
    }
    if(body.length === 0){
      alert('內容不能空白！');
      return
    }
    if(body.length < 30){
      alert('內容至少需要30字以上！');
      return
    }
    
    let substring_from = 30 + userData.login.length;
    const repo = issue.repository_url.substring(substring_from);
    try {
      // 編輯issue資料
      const result = await axios.get(`${baseUrl}/editIssue?username=${userData.login}&repo=${repo}&number=${issue.number}&title=${title}&body=${body}`,{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token')
        }
      });
      if(result.status === 200){
        //將新建立的issue 加入state
        createLabels();
        const new_data = result.data;
        setIssueList((prevData)=>{
          return prevData.map((item) => {
            if(item.id === new_data.id){
              return{
                ...item,
                title: new_data.title,
                body: new_data.body
              };
            }else{
              return item;
            }
          })
        });
        alert('修改成功！')
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