const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('./models/Product');
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopzone';

const exportFallback = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(`Connected to MongoDB (${mongoURI})...`);

    const products = await Product.find({}).lean();
    console.log(`Found ${products.length} products in MongoDB.`);

    const formatted = products.map((p, idx) => ({
      _id: p._id.toString(),
      title: p.title,
      description: p.description,
      mainImg: p.mainImg,
      category: p.category,
      gender: p.gender || 'Unisex',
      price: p.price,
      discount: p.discount || 0,
      sizes: p.sizes || [],
    }));

    const fileContent = `export const fallbackProducts = ${JSON.stringify(formatted, null, 2)};\n`;

    const targetPath = path.join(__dirname, '../client/src/assets/fallbackProducts.js');
    fs.writeFileSync(targetPath, fileContent, 'utf-8');

    console.log(`Successfully exported ${formatted.length} products to ${targetPath}!`);
    process.exit(0);
  } catch (error) {
    console.error('Export error:', error);
    process.exit(1);
  }
};

exportFallback();
