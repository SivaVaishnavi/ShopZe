import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    mainImg: null,
    category: '',
    gender: '',
    price: '',
    discount: '',
    sizes: '',
  });

  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({
        ...form,
        mainImg: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();

      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('mainImg', form.mainImg);
      formData.append('category', form.category);
      formData.append('gender', form.gender);
      formData.append('price', form.price);
      formData.append('discount', form.discount || 0);

      formData.append(
        'sizes',
        JSON.stringify(
          form.sizes
            ? form.sizes.split(',').map((s) => s.trim())
            : []
        )
      );

      await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product Added Successfully!');

      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "180px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "10px",
              margin: "10px auto",
              display: "block",
              border: "1px solid #ddd"
            }}
          />
        )}

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="gender"
          placeholder="Gender (Men/Women/Unisex)"
          value={form.gender}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount %"
          value={form.discount}
          onChange={handleChange}
        />

        <input
          type="text"
          name="sizes"
          placeholder="Sizes (S,M,L,XL)"
          value={form.sizes}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;