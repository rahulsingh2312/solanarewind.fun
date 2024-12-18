const express = require('express');
const { ChatXAI } = require('@langchain/xai');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
app.use(express.json());

const llm = new ChatXAI({
    model: "grok-beta",
    temperature: 0.7,
    maxTokens: 1000,
    maxRetries: 2,
});


const model = {
    context: null,

    systemPrompt: `You are an Indian crypto expert but the roaster like the elon musk. Analyze the provided wallet data and give a detailed but concise roast of the wallet's activity. 
Be witty, darket, roasting, fun and dark humor with no limit but maintain technical accuracy. Do relate it with some indian memes or blockchain memes. Roast to hard and one liner concise. Provide in 10 pointers`,

    setResponse(data) {
        console.log('Setting data:', data);
        this.context = data;
        return this.context;
    },

    getContext() {
        return this.context;
    },

    clear() {
        this.context = null;
    }
};

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.post('/analyze-wallet', async (req, res) => {
    try {
        const context = model.getContext();
        
        if (!context) {
            return res.status(400).json({ 
                success: false, 
                error: 'No wallet data available' 
            });
        }

        const response = await llm.invoke([
            ["system", model.systemPrompt],
            ["human", `Please analyze this wallet data: ${JSON.stringify(context)}`]
        ]);

        res.json({
            success: true,
            analysis: response.content,
            metadata: {
                tokenUsage: response.response_metadata?.tokenUsage,
                modelFingerprint: response.response_metadata?.system_fingerprint
            }
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


app.post('/store-data', (req, res) => {
    try {
        const context = model.setResponse(req.body);
        res.json({ success: true, context });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Model server running on port ${PORT}`);
});

module.exports = model;