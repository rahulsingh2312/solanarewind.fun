// File: app.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Utility Functions
const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(
        { length }, 
        () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');
};

const generateDynamicCookie = () => {
    const timestamp = Date.now();
    return {
        '_ga': `GA1.1.${Math.floor(Math.random() * 1000000000)}.${timestamp}`,
        '_ga_0XM0LYXGC8': `GS1.1.1.${timestamp}.1.1.${timestamp}.0.0.0`,
        'cf_clearance': `${generateRandomString(32)}-${timestamp}-1.2.1.1-${generateRandomString(40)}`,
        '__cf_bm': `${generateRandomString(32)}-${timestamp}-1.0.1.1-${generateRandomString(40)}`
    };
};

const cookieToHeaderString = (cookieObj) => {
    return Object.entries(cookieObj)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
};

// Utility Analysis Functions
const getTopProfitableTokens = (holdings, count = 5) => {
    return holdings
        .map(holding => ({
            name: holding.token.symbol,
            totalProfit: parseFloat(holding.total_profit),
            details: holding
        }))
        .sort((a, b) => b.totalProfit - a.totalProfit)
        .slice(0, count);
};

const getTopLossTokens = (holdings, count = 5) => {
    return holdings
        .map(holding => ({
            name: holding.token.symbol,
            totalLoss: parseFloat(holding.total_profit),
            details: holding
        }))
        .sort((a, b) => a.totalLoss - b.totalLoss)
        .slice(0, count);
};

const getTopActiveTokens = (holdings, count = 5) => {
    return holdings
        .map(holding => ({
            name: holding.token.symbol,
            totalActivity: holding.buy_30d + holding.sell_30d,
            buyCount: holding.buy_30d,
            sellCount: holding.sell_30d,
            details: holding
        }))
        .sort((a, b) => b.totalActivity - a.totalActivity)
        .slice(0, count);
};

const calculateTotalProfitLoss = (holdings) => {
    const totalProfit = holdings.reduce((sum, holding) => {
        return sum + parseFloat(holding.total_profit);
    }, 0);

    const profitableTokens = holdings.filter(holding => 
        parseFloat(holding.total_profit) > 0
    );

    const lossTokens = holdings.filter(holding => 
        parseFloat(holding.total_profit) < 0
    );

    return {
        totalOverallProfit: totalProfit,
        totalProfitableTokens: profitableTokens.length,
        totalLossTokens: lossTokens.length,
        totalProfitAmount: profitableTokens.reduce((sum, holding) => 
            sum + parseFloat(holding.total_profit), 0),
        totalLossAmount: lossTokens.reduce((sum, holding) => 
            sum + parseFloat(holding.total_profit), 0)
    };
};

// Main Route Handler
app.get('/api/wallet-holdings', async (req, res) => {
    const { walletAddress } = req.query;

    if (!walletAddress) {
        return res.status(400).json({ 
            error: 'Wallet address is required' 
        });
    }

    try {
        // Generate dynamic cookies
        const dynamicCookies = generateDynamicCookie();

        const response = await axios.get(`https://gmgn.ai/api/v1/wallet_holdings/sol/${walletAddress}`, {
            params: {
                limit: 50000,
                orderby: 'last_active_timestamp',
                direction: 'desc',
                showsmall: true,
                sellout: true,
                tx360d: true
            },
            headers: {
                'authority': 'gmgn.ai',
                'accept': 'application/json, text/plain, */*',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'dnt': '1',
                'priority': 'u=1, i',
                'referer': `https://gmgn.ai/sol/address/${walletAddress}`,
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'cookie': cookieToHeaderString(dynamicCookies),
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
            }
        });

        const holdings = response.data.data.holdings;

        // Analysis results
        const analysis = {
            totalTokensTradedCount: holdings.length,
            tokenNames: holdings.map(holding => holding.token.symbol),
            
            top5ProfitableTokens: getTopProfitableTokens(holdings).map(token => ({
                name: token.name,
                totalProfit: token.totalProfit.toFixed(2)
            })),
            
            top5LossTokens: getTopLossTokens(holdings).map(token => ({
                name: token.name,
                totalLoss: token.totalLoss.toFixed(2)
            })),
            
            top5ActiveTokens: getTopActiveTokens(holdings).map(token => ({
                name: token.name,
                totalActivity: token.totalActivity,
                buyCount: token.buyCount,
                sellCount: token.sellCount
            })),
            
            mostProfitableToken: {
                name: getTopProfitableTokens(holdings, 1)[0]?.name,
                totalProfit: getTopProfitableTokens(holdings, 1)[0]?.totalProfit
            },
            mostLossToken: {
                name: getTopLossTokens(holdings, 1)[0]?.name,
                totalLoss: getTopLossTokens(holdings, 1)[0]?.totalLoss
            },
            mostActiveToken: {
                name: getTopActiveTokens(holdings, 1)[0]?.name,
                totalActivity: getTopActiveTokens(holdings, 1)[0]?.totalActivity
            },
            
            // New total profit/loss summary
            totalProfitLossSummary: calculateTotalProfitLoss(holdings)
        };

        res.json(analysis);
    } catch (error) {
        console.error('Error fetching token data:', error);
        res.status(500).json({ 
            error: error.message || 'Unknown error occurred',
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});