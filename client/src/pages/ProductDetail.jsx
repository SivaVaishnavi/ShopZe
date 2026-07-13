import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';


const ProductDetail = () => {

  const { id } = useParams();

  const { user } = useAuth();

  const navigate = useNavigate();


  const [product,setProduct] = useState(null);

  const [selectedImage,setSelectedImage] = useState('');

  const [size,setSize] = useState('');

  const [quantity,setQuantity] = useState(1);

  const [message,setMessage] = useState('');

  const [error,setError] = useState('');




  useEffect(()=>{


    api.get(`/products/${id}`)

    .then((res)=>{


      setProduct(res.data);


      setSelectedImage(
        res.data.mainImg
      );


      if(res.data.sizes?.length){

        setSize(res.data.sizes[0]);

      }


    })

    .catch(()=>{

      setError("Could not load product");

    });


  },[id]);





  const handleAddToCart = async()=>{


    if(!user){

      navigate('/login');

      return;

    }


    try{


      await api.post('/cart',{

        productId:product._id,

        title:product.title,

        mainImg:product.mainImg,

        size,

        quantity,

        price:product.price,

        discount:product.discount

      });


      setMessage("Added to cart successfully");


    }

    catch(err){

      setError(
        err.response?.data?.message ||
        "Cart error"
      );

    }


  };





  const handleShopNow = async()=>{


    await handleAddToCart();

    navigate('/cart');


  };





  if(!product)

  return (

    <p style={{padding:"2rem"}}>

      Loading...

    </p>

  );





  const finalPrice=Math.round(

    product.price -

    (product.price*(product.discount||0))/100

  );



  const images=[

    product.mainImg,

    ...(product.carousel || [])

  ];





return (

<div className="product-page">


<div className="product-gallery">



<div className="thumbnail-list">


{

images.map((img,index)=>(


<img

key={index}

src={`http://localhost:8000${img}`}

onClick={()=>setSelectedImage(img)}

onError={(e)=>

e.target.src="https://placehold.co/100"

}

/>


))

}


</div>





<img

className="main-product-image"

src={`http://localhost:8000${selectedImage}`}

alt={product.title}

onError={(e)=>

e.target.src="https://placehold.co/400"

}

/>


</div>






<div className="product-detail-info">


<h1>

{product.title}

</h1>


<div className="rating">

⭐⭐⭐⭐⭐

</div>



<p className="detail-description">

{product.description}

</p>





<div className="detail-price">


<span className="price">

₹{finalPrice}

</span>



{

product.discount>0 &&

<>

<span className="mrp">

₹{product.price}

</span>


<span className="discount">

{product.discount}% OFF

</span>

</>

}


</div>






{
product.sizes?.length>0 &&


<div className="size-selector">


<h3>Select Size</h3>


{

product.sizes.map(s=>(


<button

key={s}

className={
size===s?
"size-btn active":
"size-btn"
}

onClick={()=>setSize(s)}

>

{s}

</button>


))

}


</div>

}






<div className="qty-selector">


<h3>Quantity</h3>


<button

onClick={()=>setQuantity(
Math.max(1,quantity-1)
)}

>

-

</button>


<span>

{quantity}

</span>


<button

onClick={()=>setQuantity(quantity+1)}

>

+

</button>


</div>





{
message &&
<p className="success-text">

{message}

</p>
}



{
error &&
<p className="error-text">

{error}

</p>
}




<div className="detail-actions">


<button

className="secondary-btn"

onClick={handleAddToCart}

>

Add To Cart

</button>



<button

className="shop-now-btn"

onClick={handleShopNow}

>

Buy Now

</button>


</div>



</div>


</div>

);


};


export default ProductDetail;