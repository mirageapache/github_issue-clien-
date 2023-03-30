import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function LoginPage(){


  // 取得資料
  async function getData(){
    try {
      const result = await axios.get('http://localhost:5000/api');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  getData();


  return(
    <>
      <h1>登入頁</h1>
      <div>
        <h2>登入您的Github帳號，並開始使用</h2>
        <button className='btn btn-primary' >登入</button>
      </div>

    </>
  )
}