import { Link } from 'react-router-dom';

import fashion from '../assets/categories/fashion.jpg';
import electronics from '../assets/categories/electronics.jpg';
import mobiles from '../assets/categories/mobiles.jpg';
import groceries from '../assets/categories/groceries.jpg';
import sports from '../assets/categories/sports.jpg';


const categories = [
  {
    name: 'Fashion',
    img: fashion
  },
  {
    name: 'Electronics',
    img: electronics
  },
  {
    name: 'Mobiles',
    img: mobiles
  },
  {
    name: 'Groceries',
    img: groceries
  },
  {
    name: 'Sports',
    img: sports
  }
];


const Landing = () => {

  return (

    <div className="landing">


      {/* HERO SECTION */}

      <section className="hero-banner">

        <div className="hero-content">

          <h1>
            Mega Sale
          </h1>

          <p>
            Discover the latest products at unbeatable prices
          </p>


          <Link
            to="/products"
            className="shop-now-btn"
          >
            Shop Now
          </Link>


        </div>

      </section>



      {/* CATEGORY SECTION */}


      <section className="category-section">

        <h2 className="section-title">
          Shop By Category
        </h2>


        <div className="category-grid">


          {
            categories.map((cat)=>(

              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className="category-card"
              >


                <img
                  src={cat.img}
                  alt={cat.name}
                />


                <div className="category-overlay">

                  <p>
                    {cat.name}
                  </p>

                </div>


              </Link>

            ))
          }


        </div>

      </section>




      {/* FEATURE SECTION */}

      <section className="feature-section">


        <div className="feature-card">

          <h3>
            🚚 Free Delivery
          </h3>

          <p>
            On orders above ₹499
          </p>

        </div>



        <div className="feature-card">

          <h3>
            🔒 Secure Payment
          </h3>

          <p>
            100% safe transactions
          </p>

        </div>



        <div className="feature-card">

          <h3>
            ⭐ Quality Products
          </h3>

          <p>
            Verified products
          </p>

        </div>


      </section>


    </div>

  );

};


export default Landing;