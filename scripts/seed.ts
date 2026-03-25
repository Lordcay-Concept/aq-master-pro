import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env file from root
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

// Define User Schema (temporary for seeding)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['customer', 'staff', 'admin'], default: 'customer' },
  isApproved: { type: Boolean, default: false },
  phone: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now }
});

// Define Service Schema
const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: Number,
  price: Number,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  console.log('Please make sure your .env.local file exists with:');
  console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/appointment-system');
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Ask if user wants to clear existing data
    const clearData = await question('Do you want to clear existing data? (yes/no): ');
    
    if (clearData.toLowerCase() === 'yes') {
      console.log('🗑️ Clearing existing data...');
      await User.deleteMany({});
      await Service.deleteMany({});
      console.log('✅ Cleared existing data');
    }

    // Create Admin Account with custom details
    console.log('\n📝 Let\'s create your admin account:');
    const adminName = await question('Admin Full Name: ');
    const adminEmail = await question('Admin Email: ');
    const adminPassword = await question('Admin Password (min 8 characters): ');
    
    if (adminPassword.length < 8) {
      console.error('❌ Password must be at least 8 characters');
      process.exit(1);
    }

    const adminPhone = await question('Admin Phone (optional): ');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('⚠️ Admin with this email already exists. Skipping admin creation.');
    } else {
      console.log('👤 Creating admin account...');
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isApproved: true,
        phone: adminPhone || ''
      });
      console.log('✅ Admin account created:', admin.email);
    }

    // Create Services - YOUR EXACT MOCK SERVICES
    console.log('\n🛠️ Creating services...');
    
    // First, check if services already exist
    const existingServices = await Service.countDocuments();
    if (existingServices > 0 && clearData.toLowerCase() !== 'yes') {
      console.log(`⚠️ ${existingServices} services already exist. Skipping service creation.`);
    } else {
      // In seed.ts, just let MongoDB generate the IDs
const services = await Service.create([
  {
    name: 'General Consultation',
    description: 'General inquiry and consultation with our experts',
    duration: 30,
    price: 5000,
    isActive: true
  },
  {
    name: 'Cashier / Payments',
    description: 'Bill payments, deposits and financial transactions',
    duration: 15,
    price: 2000,
    isActive: true
  },
  {
    name: 'Technical Support',
    description: 'Technical assistance and troubleshooting',
    duration: 45,
    price: 10000,
    isActive: true
  },
  {
    name: 'Account Opening',
    description: 'New account registration and verification',
    duration: 60,
    price: 0,
    isActive: true
  },
  {
    name: 'Document Processing',
    description: 'Document verification and certification',
    duration: 25,
    price: 3500,
    isActive: true
  }
]);
      
      console.log(`✅ Created ${services.length} services:`);
      services.forEach(s => console.log(`   - ${s.name}: ₦${s.price} (${s.duration} min)`));
    }

    // Display all services in database
    const allServices = await Service.find({});
    console.log('\n📋 All services in database:');
    allServices.forEach((s, index) => {
      console.log(`   ${index + 1}. ${s.name} - ₦${s.price} - ${s.duration}min - ${s.isActive ? 'Active' : 'Inactive'}`);
    });

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Your Admin Login:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: [the password you entered]`);
    
    await mongoose.disconnect();
    console.log('\n📡 Database connection closed');
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    rl.close();
    process.exit(1);
  }
};

seedDatabase();