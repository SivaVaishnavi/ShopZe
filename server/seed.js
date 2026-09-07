const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const Admin = require('./models/Admin');
const Order = require('./models/Order');

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopzone';

const masterCatalog = [
  // --- MOBILES ---
  {
    title: 'Smart Touchscreen Smartphone 5G',
    description: 'High performance 5G smartphone with crisp AMOLED display and long battery life.',
    mainImg: '/uploads/1784043697894.png',
    category: 'Mobiles',
    gender: 'Unisex',
    price: 34999,
    discount: 15,
    sizes: ['128GB', '256GB'],
  },
  {
    title: 'Flagship Smartphone Pro 256GB',
    description: 'Sleek glass back design with ultra-fast processor and high resolution camera.',
    mainImg: '/uploads/1784044018483.jpg',
    category: 'Mobiles',
    gender: 'Unisex',
    price: 54999,
    discount: 12,
    sizes: ['256GB', '512GB'],
  },
  {
    title: 'Foldable Ultra-Compact Smartphone',
    description: 'Next-gen dual screen foldable phone with revolutionary hinge technology.',
    mainImg: '/uploads/1784045139503.jpeg',
    category: 'Mobiles',
    gender: 'Unisex',
    price: 89999,
    discount: 8,
    sizes: ['256GB'],
  },
  {
    title: 'Slim Profile Quad-Camera Smartphone',
    description: 'Super thin body with high definition 64MP camera and fast charging.',
    mainImg: '/uploads/1784046427961.jpeg',
    category: 'Mobiles',
    gender: 'Unisex',
    price: 24999,
    discount: 15,
    sizes: ['128GB'],
  },
  {
    title: 'iPhone 15 Pro Max 256GB',
    description: 'Forged in titanium, featuring the groundbreaking A17 Pro chip and customizable Action button.',
    mainImg: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
    category: 'Mobiles',
    gender: 'Unisex',
    price: 134900,
    discount: 8,
    sizes: ['256GB', '512GB'],
  },
  {
    title: 'Samsung Galaxy S24 Ultra 5G',
    description: 'Galaxy AI is here. Epic camera with 200MP, Snapdragon 8 Gen 3 for Galaxy, and built-in S Pen.',
    mainImg: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600',
    category: 'Mobiles',
    gender: 'Unisex',
    price: 129999,
    discount: 10,
    sizes: ['256GB', '512GB'],
  },
  {
    title: 'OnePlus 12 5G (Silky Black)',
    description: 'Powered by Snapdragon 8 Gen 3 with 4th Gen Hasselblad Camera System for Mobile.',
    mainImg: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600',
    category: 'Mobiles',
    gender: 'Unisex',
    price: 64999,
    discount: 12,
    sizes: ['12GB+256GB', '16GB+512GB'],
  },

  // --- ELECTRONICS ---
  {
    title: 'Wireless Stereo Headphones',
    description: 'Immersive sound quality with active noise cancellation and soft ear cushions.',
    mainImg: '/uploads/1784043816777.webp',
    category: 'Electronics',
    gender: 'Unisex',
    price: 4999,
    discount: 20,
    sizes: ['Standard'],
  },
  {
    title: 'Smart Fitness Tracker Band',
    description: 'Track your heart rate, sleep quality, and daily fitness activities seamlessly.',
    mainImg: '/uploads/1784044161754.jpeg',
    category: 'Electronics',
    gender: 'Unisex',
    price: 2999,
    discount: 18,
    sizes: ['One Size'],
  },
  {
    title: '4K Ultra HD Smart LED Display',
    description: 'Vivid color contrast and HDR support for realistic movie viewing.',
    mainImg: '/uploads/1784045816822.jpeg',
    category: 'Electronics',
    gender: 'Unisex',
    price: 42990,
    discount: 22,
    sizes: ['50 Inch', '55 Inch'],
  },
  {
    title: 'Portable Bluetooth Soundbar Speaker',
    description: 'Rich bass and clear treble sound output in a compact soundbar design.',
    mainImg: '/uploads/1784046486554.webp',
    category: 'Electronics',
    gender: 'Unisex',
    price: 3499,
    discount: 14,
    sizes: ['Standard'],
  },
  {
    title: 'MacBook Pro 16" M3 Max',
    description: 'Mind-blowing performance with M3 Max 16-core CPU, 40-core GPU, and Liquid Retina XDR display.',
    mainImg: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
    category: 'Electronics',
    gender: 'Unisex',
    price: 249900,
    discount: 5,
    sizes: ['36GB/1TB', '48GB/1TB'],
  },
  {
    title: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise canceling headphones with Auto NC Optimizer and ultra-clear hands-free calling.',
    mainImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    category: 'Electronics',
    gender: 'Unisex',
    price: 29990,
    discount: 15,
    sizes: ['Standard'],
  },

  // --- SPORTS-EQUIPMENT ---
  {
    title: 'Professional Training Soccer Ball',
    description: 'Durable match-grade soccer ball designed for excellent grip and control.',
    mainImg: '/uploads/1784043912727.jpg',
    category: 'Sports-Equipment',
    gender: 'Unisex',
    price: 1899,
    discount: 10,
    sizes: ['Size 5'],
  },
  {
    title: 'Carbon Fiber Tennis Racket',
    description: 'Ultra-lightweight tennis racket engineered for maximum power and precision.',
    mainImg: '/uploads/1784044492918.webp',
    category: 'Sports-Equipment',
    gender: 'Unisex',
    price: 8999,
    discount: 15,
    sizes: ['Grip 2', 'Grip 3'],
  },
  {
    title: 'Adjustable Fitness Dumbbell Set 20kg',
    description: 'Complete home gym dumbbell set with non-slip grips and solid weight plates.',
    mainImg: '/uploads/1784046082985.jpeg',
    category: 'Sports-Equipment',
    gender: 'Unisex',
    price: 4499,
    discount: 20,
    sizes: ['20kg Set'],
  },
  {
    title: 'Vector X Training Resistance Bands Set',
    description: 'Set of 5 heavy duty stackable workout exercise bands for strength training.',
    mainImg: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600',
    category: 'Sports-Equipment',
    gender: 'Unisex',
    price: 799,
    discount: 20,
    sizes: ['Set of 5'],
  },
  {
    title: 'Boldfit Extra Thick Yoga Mat 6mm',
    description: 'Non-slip TPE eco-friendly yoga mat with carrying strap for exercise and Pilates.',
    mainImg: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
    category: 'Sports-Equipment',
    gender: 'Unisex',
    price: 1199,
    discount: 25,
    sizes: ['6mm Thick'],
  },

  // --- FASHION ---
  {
    title: 'Men Casual Cotton T-Shirt',
    description: 'Comfortable 100% organic cotton t-shirt for everyday wear.',
    mainImg: '/uploads/1784043866565.jpeg',
    category: 'Fashion',
    gender: 'Men',
    price: 1299,
    discount: 25,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    title: 'Women Elegant Summer Dress',
    description: 'Flowy stylish dress crafted from breathable fabric for sunny days.',
    mainImg: '/uploads/1784044257597.jpeg',
    category: 'Fashion',
    gender: 'Women',
    price: 2799,
    discount: 30,
    sizes: ['S', 'M', 'L'],
  },
  {
    title: 'Men Stylish Leather Jacket',
    description: 'Classic genuine leather jacket with durable zip closure and inner lining.',
    mainImg: '/uploads/1784045911527.webp',
    category: 'Fashion',
    gender: 'Men',
    price: 5999,
    discount: 25,
    sizes: ['M', 'L', 'XL'],
  },
  {
    title: 'Women Trendy Leather Shoulder Bag',
    description: 'Spacious handbag crafted with premium finish and gold accents.',
    mainImg: '/uploads/1784047216377.jpeg',
    category: 'Fashion',
    gender: 'Women',
    price: 3299,
    discount: 35,
    sizes: ['Standard'],
  },
  {
    title: 'Women Soft Silk Printed Saree',
    description: 'Elegant soft silk saree with intricate zari woven floral border.',
    mainImg: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
    category: 'Fashion',
    gender: 'Women',
    price: 3499,
    discount: 35,
    sizes: ['Free Size'],
  },
  {
    title: 'Men Casual Stretch Chino Trousers',
    description: 'Flat-front slim fit cotton stretch chinos tailored for work and weekends.',
    mainImg: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    category: 'Fashion',
    gender: 'Men',
    price: 2299,
    discount: 20,
    sizes: ['30', '32', '34', '36'],
  },

  // --- GROCERIES ---
  {
    title: 'Organic Green Tea Selection',
    description: 'Fresh aromatic green tea leaves rich in natural antioxidants.',
    mainImg: '/uploads/1784043959266.png',
    category: 'Groceries',
    gender: 'Unisex',
    price: 450,
    discount: 5,
    sizes: ['250g', '500g'],
  },
  {
    title: 'Extra Virgin Cold Pressed Olive Oil',
    description: 'Premium Mediterranean olive oil ideal for healthy cooking.',
    mainImg: '/uploads/1784044605885.jpeg',
    category: 'Groceries',
    gender: 'Unisex',
    price: 1199,
    discount: 10,
    sizes: ['500ml', '1L'],
  },
  {
    title: 'Aromatic Premium Basmati Rice 5kg',
    description: 'Long grain extra-aromatic Basmati rice aged to perfection.',
    mainImg: '/uploads/1784046237126.jpeg',
    category: 'Groceries',
    gender: 'Unisex',
    price: 799,
    discount: 12,
    sizes: ['5kg'],
  },
  {
    title: 'Raw California Whole Almonds 500g',
    description: 'Fresh crunchy California almonds loaded with healthy proteins.',
    mainImg: '/uploads/1784047830848.jpeg',
    category: 'Groceries',
    gender: 'Unisex',
    price: 649,
    discount: 18,
    sizes: ['500g'],
  },
  {
    title: 'Pure Raw Organic Honey 500g',
    description: '100% pure unprocessed wild forest honey harvested naturally.',
    mainImg: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=600',
    category: 'Groceries',
    gender: 'Unisex',
    price: 499,
    discount: 10,
    sizes: ['500g', '1kg'],
  },
  {
    title: 'Roasted & Salted California Cashews 500g',
    description: 'Handpicked premium jumbo cashews dry-roasted and lightly salted.',
    mainImg: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d96?w=600',
    category: 'Groceries',
    gender: 'Unisex',
    price: 699,
    discount: 20,
    sizes: ['250g', '500g'],
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(`Connected to MongoDB (${mongoURI}) for master seeding...`);

    // Reset Products, Cart & Admin settings
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await Admin.deleteMany({});

    // Ensure Admin & Customer Users exist
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const customerPassword = await bcrypt.hash('customer123', salt);

    let adminUser = await User.findOne({ email: 'admin@shopze.com' });
    if (!adminUser) {
      adminUser = await User.create({
        username: 'ShopZeAdmin',
        email: 'admin@shopze.com',
        password: adminPassword,
        usertype: 'Admin',
      });
    }

    let customerUser = await User.findOne({ email: 'john@example.com' });
    if (!customerUser) {
      customerUser = await User.create({
        username: 'JohnDoe',
        email: 'john@example.com',
        password: customerPassword,
        usertype: 'Customer',
      });
    }

    // Insert All 30 Master Products
    const inserted = await Product.insertMany(masterCatalog);
    console.log(`Seeded ${inserted.length} master products into shopzone database!`);

    // Create sample cart item for customer
    await Cart.create({
      userId: customerUser._id.toString(),
      productId: inserted[0]._id,
      title: inserted[0].title,
      mainImg: inserted[0].mainImg,
      size: '128GB',
      quantity: 1,
      price: inserted[0].price,
      discount: inserted[0].discount,
    });

    // Create Admin settings
    await Admin.create({
      banner: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
      categories: ['Mobiles', 'Electronics', 'Sports-Equipment', 'Fashion', 'Groceries'],
    });

    console.log('--- SEEDED PRODUCTS SUMMARY ---');
    console.log(`• Mobiles: ${await Product.countDocuments({ category: 'Mobiles' })}`);
    console.log(`• Electronics: ${await Product.countDocuments({ category: 'Electronics' })}`);
    console.log(`• Sports-Equipment: ${await Product.countDocuments({ category: 'Sports-Equipment' })}`);
    console.log(`• Fashion: ${await Product.countDocuments({ category: 'Fashion' })}`);
    console.log(`• Groceries: ${await Product.countDocuments({ category: 'Groceries' })}`);
    console.log(`• Total Products in shopzone: ${await Product.countDocuments()}`);
    console.log('Master database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
