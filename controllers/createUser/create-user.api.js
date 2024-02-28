const db = require('../../models/index'); 

const createUser = async (req, res) => {
  try {
    const { name, email, subscriptionId, licenceKey } = req.body;

    const newUser = await db.User.create({ name, email, subscriptionId, licenceKey });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createUser,
};
