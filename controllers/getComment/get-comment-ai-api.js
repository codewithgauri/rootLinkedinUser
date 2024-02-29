const db = require('../../models/index');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const generateComment = async (req, res) => {
    try {
        const { licenceKey, prompt } = req.body;

        const user = await db.User.findOne({
            attributes: ['id', 'subscriptionId'],
            where: {
                licenceKey: licenceKey,
            },
        });

        if (!user) {
            return res.status(400).json({ error: 'User not found with the provided licenceKey' });
        }

        const { id, subscriptionId } = user;
        const activeSubscription = await db.Subscription.findOne({
            where: {
                id: subscriptionId,
                isActive: true,
                token: {
                    [db.Sequelize.Op.gt]: 0, 
                },
            },
        });

        if (!activeSubscription) {
            return res.status(400).json({ error: 'User does not have an active subscription or has no tokens remaining' });
        }

        const { providerKey, token } = activeSubscription;

        const geminiApiUrl = `${process.env.GEMINI_API_ENDPOINT}?key=${providerKey}`;

        const geminiApiResponse = await axios.post(geminiApiUrl, {
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        });

        if (geminiApiResponse.data.error) {
            console.error('Error from Gemini API:', geminiApiResponse.data.error);
            return res.status(500).json({ error: 'Error from Gemini API', details: geminiApiResponse.data.error });
        }

        await activeSubscription.update({
            token: token - 1,
        });

        const generatedComment = geminiApiResponse.data;
        res.status(200).json({ generatedComment });
    } catch (error) {
        console.error('Error generating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    generateComment,
};
