import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from './ProductCard';

const RelatedProducts = ({ productId }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);

    api
      .get(`/products/${productId}/related`)
      .then(({ data }) => setRelated(data))
      .catch(() => setRelated([]))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading || related.length === 0) return null;

  return (
    <div className="related-products">
      <h2 className="section-title">You might also like</h2>
      <div className="product-grid">
        {related.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;