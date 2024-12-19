const express = require('express');
const { ChatXAI } = require('@langchain/xai');
const dotenv = require('dotenv');
const axios = require('axios');

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
    systemPrompt: `You are an Indian crypto expert but the roaster like the Elon Musk. Analyze the provided wallet data and give a detailed but concise roast of the wallet's activity.
    Be witty, darker, roasting, fun, and dark humor with no limit but maintain technical accuracy. Do relate it with some Indian memes or blockchain memes. Roast too hard and one-liner concise. Provide in 10 pointers`,

    async fetchAndStoreData(walletAddress) {
        try {
            const response = await axios.get(`http://localhost:3000/api/final?walletAddress=${walletAddress}`);
            this.setResponse(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

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

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Model server running' });
});

// Endpoint to fetch and store wallet data
app.post('/fetch-wallet/:walletAddress', async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const data = await model.fetchAndStoreData(walletAddress);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get AI analysis
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

// Try different ports if default is in use
const startServer = (initialPort) => {
    const server = app.listen(initialPort)
        .on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${initialPort} is busy, trying ${initialPort + 1}...`);
                startServer(initialPort + 1);
            }
        })
        .on('listening', () => {
            const port = server.address().port;
            console.log(`Model server running on port ${port}`);
        });
};

// Start server with initial port
const PORT = process.env.MODEL_PORT || 3001;
startServer(PORT);

module.exports = model;
