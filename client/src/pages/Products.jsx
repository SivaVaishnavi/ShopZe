import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const categoryOptions = [
  {
    name: 'Mobiles',
    icon: '📱'
  },
  {
    name: 'Electronics',
    icon: '💻'
  },
  {
    name: 'Sports-Equipment',
    icon: '⚽'
  },
  {
    name: 'Fashion',
    icon: '👕'
  },
  {
    name: 'Groceries',
    icon: '🛒'
  }
];


const genderOptions = [
  {
    name:"Men",
    icon:"👔"
  },
  {
    name:"Women",
    icon:"👗"
  },
  {
    name:"Unisex",
    icon:"🧑"
  }
];


const Products = () => {

  const [searchParams,setSearchParams] = useSearchParams();

  const [products,setProducts] = useState([]);

  const [loading,setLoading] = useState(true);

  const [error,setError] = useState("");



  const sort =
  searchParams.get("sort") || "popular";


  const category =
  searchParams.get("category") || "";


  const gender =
  searchParams.get("gender") || "";


  const search =
  searchParams.get("search") || "";



  useEffect(()=>{


    const fetchProducts = async()=>{


      try{


        setLoading(true);


        const params={};


        if(category)
        params.category=category;


        if(gender)
        params.gender=gender;


        if(sort !== "popular")
        params.sort=sort;



        const {data}=await api.get(
          "/products",
          {
            params
          }
        );



        const filtered =
        search
        ?
        data.filter(
          product =>
          product.title
          .toLowerCase()
          .includes(search.toLowerCase())
        )
        :
        data;



        setProducts(filtered);


      }
      catch(err){

        setError(
          "Unable to load products"
        );

      }
      finally{

        setLoading(false);

      }


    };


    fetchProducts();


  },[
    category,
    gender,
    sort,
    search
  ]);




  const updateParam=(key,value)=>{


    const params =
    new URLSearchParams(searchParams);



    if(value)
    params.set(key,value);

    else
    params.delete(key);



    setSearchParams(params);


  };




  const clearFilters=()=>{

    setSearchParams({});

  };



return (

<div className="products-page">


<aside className="filters">


<h2>
Filter Products
</h2>


<button 
className="clear-filter"
onClick={clearFilters}
>
Clear All
</button>



<div className="filter-group">


<h4>
Sort By
</h4>


{
[
["popular","🔥 Popular"],
["price_low","⬇ Price Low"],
["price_high","⬆ Price High"],
["discount","💰 Discount"]
]
.map(
(item)=>(

<label key={item[0]}>

<input

type="radio"

checked={
sort===item[0]
}

onChange={()=>
updateParam(
"sort",
item[0]
)
}

/>

{item[1]}

</label>


))
}



</div>





<div className="filter-group">


<h4>
Category
</h4>


{
categoryOptions.map(cat=>(


<label 
key={cat.name}
className={
category===cat.name
?
"active-filter"
:
""
}
>


<input

type="checkbox"

checked={
category===cat.name
}

onChange={()=>
updateParam(
"category",
category===cat.name
?
""
:
cat.name
)
}

/>


<span>

{cat.icon}

{cat.name}

</span>


</label>


))
}



</div>





<div className="filter-group">


<h4>
Gender
</h4>


{
genderOptions.map(g=>(


<label 
key={g.name}
className={
gender===g.name
?
"active-filter"
:
""
}
>


<input

type="checkbox"

checked={
gender===g.name
}

onChange={()=>
updateParam(
"gender",
gender===g.name
?
""
:
g.name
)
}

/>


<span>

{g.icon}

{g.name}

</span>


</label>


))
}



</div>


</aside>





<main className="product-list">


<h1 className="page-title">

All Products

</h1>


{
loading &&
<p>
Loading products...
</p>
}



{
error &&
<p className="error-text">
{error}
</p>
}



{
!loading &&
products.length===0 &&
<p>
No products found
</p>
}




<div className="product-grid">


{
products.map(product=>(

<ProductCard

key={product._id}

product={product}

/>

))
}



</div>


</main>



</div>

);


};


export default Products;