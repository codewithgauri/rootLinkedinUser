const db = require('../../models/index');
const axios = require('axios');

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

        // Check if there is an active subscription for the user
        const activeSubscription = await db.Subscription.findOne({
            where: {
                id: subscriptionId,
                isActive: true,
            },
        });

        if (!activeSubscription) {
            return res.status(400).json({ error: 'User does not have an active subscription' });
        }

        const { providerKey } = activeSubscription;

        // Use the obtained providerKey to make a request to the Google Gemini API
        const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${providerKey}`;

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
