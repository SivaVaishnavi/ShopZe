import { Link } from 'react-router-dom';
import { useState } from 'react';


const ProductCard = ({ product }) => {


  const [liked,setLiked] = useState(false);


  const finalPrice = Math.round(
    product.price -
    (product.price * (product.discount || 0)) / 100
  );


  return (

    <div className="product-card">


      <button

        className="wishlist-btn"

        onClick={()=>setLiked(!liked)}

      >

        {liked ? "❤️" : "🤍"}

      </button>



      {
        product.discount > 0 &&

        <span className="discount-badge">

          {product.discount}% OFF

        </span>

      }




      <div className="product-image-container">

        <img

          src={
            product.mainImg
            ?
            `http://localhost:8000${product.mainImg}`
            :
            "https://placehold.co/300"
          }

          alt={product.title}

          onError={(e)=>
            e.target.src="https://placehold.co/300?text=No+Image"
          }

        />


      </div>





      <div className="product-info">


        <div className="rating">

          ⭐⭐⭐⭐⭐

        </div>



        <h3>

          {product.title}

        </h3>



        <p className="product-desc">

          {product.description?.slice(0,70)}...

        </p>




        <div className="price-box">


          <span className="price">

            ₹{finalPrice}

          </span>



          {
            product.discount > 0 &&

            <span className="mrp">

              ₹{product.price}

            </span>

          }


        </div>





        <Link

          to={`/products/${product._id}`}

          className="shop-now-btn product-btn"

        >

          View Product

        </Link>



      </div>


    </div>

  );

};


export default ProductCard;