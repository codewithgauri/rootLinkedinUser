const db = require('../../models/index');

const createSubscription = async (req, res) => {
  try {
    const { planName, validity, price, providerKey, validFrom, validUpto, userId } = req.body;

    const activeSubscription = await db.Subscription.findOne({
      where: {
        userId: userId,
        isActive: true,
      },
    });

    if (activeSubscription) {
      return res.status(400).json({ error: 'User already has an active subscription. Deactivate it first.' });
    }

    const newSubscription = await db.Subscription.create({
      planName,
      validity,
      price,
      providerKey,
      validFrom,
      validUpto,
      isActive: true,
      userId,
    });

    res.status(201).json(newSubscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createSubscription,
};
