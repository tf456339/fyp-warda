import Link from 'next/link'
import {useRouter} from 'next/router'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
const NavBar = ()=>{
   const router = useRouter()
   const cookieuser = parseCookies()
   const user =  cookieuser.user ? JSON.parse(cookieuser.user) : ""
 

   function isActive(route){
     if(route== router.pathname){
         return "active"
     }
     else ""
  }
 function handleKeyPress (event){
  if(event.key === 'Enter'){
    console.log(event.target.value)
    window.open("http://localhost:3000/books?search="+event.target.value)
  }
}

    return(
      <nav>
        
        
        <Link href="/"><a ><i className="logo fab  fa-accusoft"> Store</i> </a></Link>
          <input className="menu-toggle" id="menu-toggle" type="checkbox"/>
          <label className="menu-toggle-button fas fa-bars" htmlFor="menu-toggle">
          </label>
          
          <ul className="main-nav">
          
            <li><a href="#"><input onKeyPress={handleKeyPress} id="header_search_query" type="text" placeholder="Search"/>
            </a></li>

            <li className={isActive('/cart')}><Link href="/cart"><a className="menus"><i className="fas fa-lg fa-shopping-cart"></i> Cart</a></Link></li>
            <li className={isActive('/')}><Link href="/books"><a className="menus"><i className="fas fa-lg fa-credit-card"></i> Purchase Books</a></Link></li>
            {
            (user.role == 'admin' || user.role == 'root') &&
              <li className={isActive('/create')}><Link href="/create"><a className="menus"><i className="fas fa-book"></i> Sale Books</a></Link></li>
            }

          {user ?
            <>
                <li className={isActive('/account')}><Link href="/account"><a className="menus"><i className="fas fa-lg fa-user"></i> Account</a></Link></li>
                <li><button className="btn red logout" onClick={()=>{
                  cookie.remove('token')
                  cookie.remove('user')
                  router.push('/login')
                }}>logout</button></li>  
             </>   
            :
            <>
            
            <li className={isActive('/signup')}><Link href="/signup"><a className="menus"><i className="fas fa-lg fa-user-plus"></i> Sign Up</a></Link></li>
            <li className={isActive('/login')}><Link href="/login"><a className="menus"><i className="fas fa-lg fa-user-circle"></i> Sign In</a></Link></li>
            </>
            }
           
          </ul>
       
         
         
      </nav>
     
    )
}


export default NavBar