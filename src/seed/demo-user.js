const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

async function createDemoUser() {
  const email = 'demo@diary.com';

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log('✅ Demo user already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash('A@1234', 10);

  await User.create({
    name: 'Demo User',
    email,
    password: hashedPassword
  });

  console.log('✅ Demo user created');
}

module.exports = createDemoUser;
