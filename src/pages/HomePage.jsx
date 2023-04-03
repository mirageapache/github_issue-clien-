import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function HomePage(){
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    console.log()
    if(token){
      navigate('/main');
    }
    else{
      navigate('/login');
    }

  })

  return(
    <>
      <h2>HomePage</h2>
    </>
  )

}