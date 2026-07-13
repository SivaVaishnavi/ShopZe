import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [search, setSearch] = useState('');


  const handleSearch = (e) => {

    e.preventDefault();

    if(search.trim()){

      navigate(`/products?search=${encodeURIComponent(search)}`);

    }

  };


  return (

    <nav className="navbar">


      {/* LOGO */}

      <Link 
        to="/"
        className="navbar-logo"
      >
        ShopEZ
      </Link>



      {/* SEARCH */}

      <form 
        className="navbar-search"
        onSubmit={handleSearch}
      >

        <input

          type="text"

          placeholder="Search products..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />


        <button>

          🔍

        </button>


      </form>



      {/* LINKS */}

      <div className="navbar-links">


        <Link to="/products">
          🛍 Products
        </Link>



        {
          user && (

            <Link to="/cart">

              🛒 Cart

            </Link>

          )
        }



        {
          user ? (

            <>


            <Link to="/profile">

              👤 {user.username}

            </Link>



            {
              user.usertype === "Admin" &&

              <Link to="/admin">

                ⚙ Admin

              </Link>

            }



            <button

              className="link-btn"

              onClick={logout}

            >

              Logout

            </button>


            </>


          ) : (


            <Link

              to="/login"

              className="login-btn"

            >

              Login

            </Link>


          )

        }


      </div>


    </nav>

  );

};


export default Navbar;