import React from "react";
import './NavBar.css'
import '../Cities/Cities'
import '../LogIn/LogIn'
import '../LogOut/LogOut'
import '../Register/Register'
import { Link , useNavigate } from "react-router-dom"
import { BiLogOut } from "react-icons/bi";
import { GiCamel } from "react-icons/gi";




const NavBar = () =>{

  const navigate = useNavigate();
  const getLocalStorage = localStorage.getItem("token")
  const logout=(e)=>{
      e.preventDefault()
      localStorage.removeItem('token')
      navigate('/')
  }
    return(
<container>
    <div className="rapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand"> <GiCamel/></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    {!getLocalStorage ?(
        <>
        <li class="nav-item active">
        <a class="nav-link" ><Link to='/Register'> Register </Link><span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" ><Link to='/login'> login</Link> </a>
        
      </li>
</>
        ) : null}
     
      {getLocalStorage ?(
        <li class="nav-item">
    <form class="form-inline my-2 my-lg-0">
    <a class="nav-link" ><Link to='/LogOut'> <BiLogOut onClick={(e)=>logout(e)}/></Link> </a>
    </form>
    </li> 
        ) : null}
   

    
    {getLocalStorage ?(
        <li class="nav-item">
    <form class="form-inline my-2 my-lg-0">
    <a class="nav-link" ><Link to='/Admin'> Admin</Link> </a>
    </form>
    </li> 
        ) : null}
    </ul>


  </div>
</nav>


    </div>
</container>





    )

}

export default NavBar;