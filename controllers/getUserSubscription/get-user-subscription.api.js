const db = require('../../models/index');

const getActiveSubscription = async (req, res) => {
    try {
        const { userId, mobileNo, email } = req.body;

        let user;

        if (userId) {
            user = await db.User.findByPk(userId);
        } else if (mobileNo) {
            user = await db.User.findOne({
                where: {
                    mobileNo: mobileNo,
                },
            });
        } else if (email) {
            user = await db.User.findOne({
                where: {
                    email: email,
                },
            });
        }

        if (!user) {
            return res.status(400).json({ error: 'User not found with the provided information' });
        }

        const { id, name, email: userEmail, mobileNo: userMobileNo } = user;

        const activeSubscription = await db.Subscription.findOne({
            where: {
                userId: id,
                isActive: true,
            },
        });

        if (!activeSubscription) {
            return res.status(400).json({ error: 'User does not have an active subscription' });
        }

        const {
            token,
            price,
            validFrom,
            validUpto,
            planName
        } = activeSubscription;

        res.status(200).json({
            user: {
                id,
                name,
                email: userEmail,
                mobileNo: userMobileNo,
            },
            subscription: {
                token,
                price,
                validFrom,
                validUpto,
                planName
            },
        });
    } catch (error) {
        console.error('Error getting active subscription:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getActiveSubscription,
};
