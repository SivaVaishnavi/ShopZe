import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

<<<<<<< HEAD
const categoryOptions = ['Mobiles', 'Electronics', 'Sports-Equipment', 'Fashion', 'Groceries'];
const genderOptions = ['Men', 'Women', 'Unisex'];

=======
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6
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

<<<<<<< HEAD
  const [imageMode, setImageMode] = useState('upload'); // 'upload' | 'url'
  const [imageUrl, setImageUrl] = useState('');
=======
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  // Handle text/select input changes
=======
  // Handle text input changes
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

<<<<<<< HEAD
  // Handle image file selection
=======
  // Handle image selection
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6
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

<<<<<<< HEAD
  // Handle pasted image URL
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreview(url);
  };

  // Switch between upload / URL mode, clearing whichever isn't used
  const switchImageMode = (mode) => {
    setImageMode(mode);
    setPreview('');
    setForm({ ...form, mainImg: null });
    setImageUrl('');
  };

=======
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    setError('');

    if (imageMode === 'upload' && !form.mainImg) {
      setError('Please choose an image to upload.');
      return;
    }

    if (imageMode === 'url' && !imageUrl.trim()) {
      setError('Please paste an image URL.');
      return;
    }

    setLoading(true);
=======
    setLoading(true);
    setError('');
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6

    try {
      const formData = new FormData();

      formData.append('title', form.title);
      formData.append('description', form.description);
<<<<<<< HEAD
=======
      formData.append('mainImg', form.mainImg);
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6
      formData.append('category', form.category);
      formData.append('gender', form.gender);
      formData.append('price', form.price);
      formData.append('discount', form.discount || 0);

<<<<<<< HEAD
      if (imageMode === 'upload') {
        formData.append('mainImg', form.mainImg);
      } else {
        formData.append('mainImgUrl', imageUrl.trim());
      }

=======
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6
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

<<<<<<< HEAD
        {/* Image mode toggle */}
        <div className="image-mode-toggle">
          <button
            type="button"
            className={imageMode === 'upload' ? 'active-toggle' : ''}
            onClick={() => switchImageMode('upload')}
          >
            Upload File
          </button>
          <button
            type="button"
            className={imageMode === 'url' ? 'active-toggle' : ''}
            onClick={() => switchImageMode('url')}
          >
            Paste Image URL
          </button>
        </div>

        {imageMode === 'upload' ? (
          <input type="file" accept="image/*" onChange={handleImageChange} />
        ) : (
          <input
            type="text"
            placeholder="Paste image URL (e.g. https://... )"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
        )}
=======
        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
<<<<<<< HEAD
            onError={(e) => (e.target.style.display = 'none')}
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '10px',
              margin: '10px auto',
              display: 'block',
              border: '1px solid #ddd',
=======
            style={{
              width: "180px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "10px",
              margin: "10px auto",
              display: "block",
              border: "1px solid #ddd"
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6
            }}
          />
        )}

<<<<<<< HEAD
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          {genderOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
=======
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
>>>>>>> 8294d87f5105ce8cea917c033786d4b8f796c5d6

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