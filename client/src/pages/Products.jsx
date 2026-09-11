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


const isCategoryMatch = (optionName, currentCategory) => {
  if (!optionName || !currentCategory) return false;
  const opt = String(optionName).trim().toLowerCase();
  const cur = String(currentCategory).trim().toLowerCase();
  if (opt === cur) return true;
  if (
    (opt === 'sports' || opt === 'sports-equipment') &&
    (cur === 'sports' || cur === 'sports-equipment')
  ) {
    return true;
  }
  return false;
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sort = searchParams.get('sort') || 'popular';
  const category = searchParams.get('category') || '';
  const gender = searchParams.get('gender') || '';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let dataset = [];

        if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
          dataset = fallbackProducts;
        } else {
          try {
            const params = {};
            if (category) params.category = category;
            if (gender) params.gender = gender;
            if (sort !== 'popular') params.sort = sort;

            const { data } = await api.get('/products', { params });
            if (Array.isArray(data) && data.length > 0) {
              dataset = data;
            } else {
              dataset = fallbackProducts;
            }
          } catch {
            dataset = fallbackProducts;
          }
        }

        // Apply client-side filtering on dataset
        let result = dataset;

        if (category) {
          result = result.filter((p) => isCategoryMatch(p.category, category));
        }

        if (gender) {
          result = result.filter(
            (p) => p.gender && String(p.gender).toLowerCase() === gender.toLowerCase()
          );
        }

        if (search) {
          result = result.filter(
            (p) => p.title && String(p.title).toLowerCase().includes(search.toLowerCase())
          );
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
        setError('');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, gender, sort, search]);




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