import { NavLink } from "react-router-dom";
import 'styles/css/navbar.css'

export default function Navbar({ userData, Logout }){
  return(
    <>
      <nav class="navbar navbar-light bg-light justify-content-between">
        <NavLink className='navbar-brand' to='/main'>
          <img className="navbar_avatar" src={userData.avatar_url} alt="avatar" />
          <p>{userData.login}</p>
        </NavLink>
        {/* <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
        <button className='btn btn-danger' onClick={Logout} >登出</button>
      </nav>
    
    </>
  )
}