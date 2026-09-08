import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { fallbackProducts } from '../assets/fallbackProducts';

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


const isCategoryMatch = (val1, val2) => {
  if (!val1 || !val2) return false;
  const normalize = (str) =>
    String(str)
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/s$/, '');

  const n1 = normalize(val1);
  const n2 = normalize(val2);

  if (n1 === n2) return true;
  if (n1.startsWith('sport') && n2.startsWith('sport')) return true;
  if (n1.startsWith('mobile') && n2.startsWith('mobile')) return true;
  if (n1.startsWith('grocer') && n2.startsWith('grocer')) return true;
  if (n1.startsWith('fashion') && n2.startsWith('fashion')) return true;
  if (n1.startsWith('electronic') && n2.startsWith('electronic')) return true;

  return false;
};

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



        let dataset = [];

        try {
          const { data } = await api.get("/products", { params });
          if (Array.isArray(data) && (data.length >= 10 || category || gender || search)) {
            dataset = data;
          } else {
            dataset = fallbackProducts;
          }
        } catch {
          dataset = fallbackProducts;
        }

        // Apply client-side filtering on dataset
        let result = dataset;

        if (category) {
          result = result.filter(p => isCategoryMatch(p.category, category));
        }

        if (gender) {
          result = result.filter(p => p.gender?.toLowerCase() === gender.toLowerCase());
        }

        if (search) {
          result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
        }

        if (sort === 'price_low') {
          result = [...result].sort((a, b) => a.price - b.price);
        } else if (sort === 'price_high') {
          result = [...result].sort((a, b) => b.price - a.price);
        } else if (sort === 'discount') {
          result = [...result].sort((a, b) => (b.discount || 0) - (a.discount || 0));
        }

        setProducts(result);
      } catch {
        setError("");
      } finally {
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
isCategoryMatch(cat.name, category)
?
"active-filter"
:
""
}
>


<input

type="checkbox"

checked={
isCategoryMatch(cat.name, category)
}

onChange={()=>
updateParam(
"category",
isCategoryMatch(cat.name, category)
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