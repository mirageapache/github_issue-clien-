import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';

// const client_id = process.env.REACT_APP_CLIENT_ID;
const client_id = "56101bc6f878daff5d1e";

export default function LoginPage(){
  // const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
  
  // 測試取得資料
  // async function getData(){
  //   try {
  //     const result = await axios.get('http://localhost:5000/api');
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // 取回使用者的 "code"
  
  useEffect(()=>{  
    const query_string = window.location.search;
    const url_params = new URLSearchParams(query_string);
    const code = url_params.get("code");
    // 判斷local storage有沒有access token的資料
    if(code && localStorage.getItem('access_token') === null){
      // getAccessToken
      async function getAccessToken(){
        try {
          const result = await axios.get(`http://localhost:5000/getAccessToken?code=${code}`);
          localStorage.setItem('access_token', result.data.access_token);
          navigate('/main');
        } catch (error) {
          console.log(error);
        }
      }
      getAccessToken();
    }
  }, [navigate]);


  // 登入
  async function handleLogin(){
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`);
  }

  return(
    <div>
      {localStorage.getItem("access_token") ?
        <>
        </>
    :
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>登入您的Github並開始使用</h2>
        <button className='btn btn-primary' onClick={handleLogin} >登入Github</button>
      </>
    }
    </div>
  )
}