import axios from 'axios';

async function analyzeTokenTradings(walletAddress) {
    try {
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
                'cookie': '_ga=GA1.1.1884159000.1734303582; _ga_0XM0LYXGC8=GS1.1.1734303581.1.1.1734303612.0.0.0; cf_clearance=Lqr2._v7uby1KVJu7XBhiVbHU6m.sbmgD1OlwW3.gQk-1734356823-1.2.1.1-1EGtUeaoA3sQgdDWHSYt5yIMPYlsn2FpYyj1VRdC85DYUlGZeK_HqoQdfo1OLIeshDhKCcmUujhKr.ZQkxQ9e73GNtpEWJtBvH99v6OLxFUgsYTEKpQbWIG275WXrI4Nnte4ZrfI3RsdNGfXbyUtVM.rTWSuw7_mw9Mjkn8TxlmaV.TcxnM.va8KIA9yzOdiyH6YLrf8PiMJ3UOzG3Q1tO.35cjUVR8WC4V93SftLgv0rCHc9ny6nk201nUwCpcK9aukY93T97QPARgxg2bIrb2RnvSPUK1sftZRELsMTeUuJt04tfMF51.l4Qa8WIxIbO5yCsG9negVLr8blgA2Noq9Mvwqwg2bSkUDBUoBHs9_B.6K5dtcpQYimXiJpe0mGc9JtB8vYUEDbBL7TOLnCAAJJFl6fAYptfx.zrWhRoiYQX3fpP7V97ku7u7cLdWk; __cf_bm=rc9xbgVJkTrR2Ycg2jZw_f2ulEcFYs5iyBSch1hn.KU-1734356828-1.0.1.1-QWMJftnR4bE4hn3Cl6dNLbcsM1hT2JZQA4X5oUeLYiYMh874M7px3J4xS5Knft96wrHnN35iO7wunWBZ7UZOvA',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
            }
        });

        const holdings = response.data.data.holdings;

        // Analyze token trades
        const analysis = {
            totalTokensTradedCount: holdings.length,
            tokenNames: holdings.map(holding => holding.token.symbol),
            mostProfitableToken: getMostProfitableToken(holdings),
            mostLossToken: getMostLossToken(holdings),
            mostBoughtToken: getMostBoughtToken(holdings),
            mostSoldToken: getMostSoldToken(holdings),
            mostActiveToken: getMostActiveToken(holdings)
        };

        return analysis;
    } catch (error) {
        console.error('Error fetching token data:', error);
        throw error;
    }
}

function getMostProfitableToken(holdings) {
    return holdings.reduce((most, current) => {
        const currentProfit = parseFloat(current.total_profit);
        const mostProfit = most ? parseFloat(most.total_profit) : -Infinity;
        return currentProfit > mostProfit ? current : most;
    }, null);
}

function getMostLossToken(holdings) {
    return holdings.reduce((most, current) => {
        const currentLoss = parseFloat(current.total_profit);
        const mostLoss = most ? parseFloat(most.total_profit) : Infinity;
        return currentLoss < mostLoss ? current : most;
    }, null);
}

function getMostBoughtToken(holdings) {
    return holdings.reduce((most, current) => {
        return (current.buy_30d > (most?.buy_30d || 0)) ? current : most;
    }, null);
}

function getMostSoldToken(holdings) {
    return holdings.reduce((most, current) => {
        return (current.sell_30d > (most?.sell_30d || 0)) ? current : most;
    }, null);
}

function getMostActiveToken(holdings) {
    return holdings.reduce((most, current) => {
        const currentActivity = current.buy_30d + current.sell_30d;
        const mostActivity = most ? most.buy_30d + most.sell_30d : 0;
        return currentActivity > mostActivity ? current : most;
    }, null);
}

// Example usage
const walletAddress = 'HViWJEPY2BYdi8JCaoLiPKHFaEByfPgk1LpknmBSpgVR';
analyzeTokenTradings(walletAddress)
    .then(analysis => {
        console.log('Token Trading Analysis:');
        console.log('Total Tokens Traded:', analysis.totalTokensTradedCount);
        console.log('Token Names:', analysis.tokenNames);
        
        console.log('\nMost Profitable Token:');
        console.log(analysis.mostProfitableToken 
            ? {
                symbol: analysis.mostProfitableToken.token.symbol,
                totalProfit: analysis.mostProfitableToken.total_profit
            } 
            : 'No profitable token found');
        
        console.log('\nMost Loss Token:');
        console.log(analysis.mostLossToken 
            ? {
                symbol: analysis.mostLossToken.token.symbol,
                totalLoss: analysis.mostLossToken.total_profit
            } 
            : 'No loss token found');
        
        console.log('\nMost Bought Token:');
        console.log(analysis.mostBoughtToken 
            ? {
                symbol: analysis.mostBoughtToken.token.symbol,
                buyCount: analysis.mostBoughtToken.buy_30d
            } 
            : 'No most bought token found');
        
        console.log('\nMost Sold Token:');
        console.log(analysis.mostSoldToken 
            ? {
                symbol: analysis.mostSoldToken.token.symbol,
                sellCount: analysis.mostSoldToken.sell_30d
            } 
            : 'No most sold token found');
        
        console.log('\nMost Active Token:');
        console.log(analysis.mostActiveToken 
            ? {
                symbol: analysis.mostActiveToken.token.symbol,
                totalActivity: analysis.mostActiveToken.buy_30d + analysis.mostActiveToken.sell_30d
            } 
            : 'No most active token found');
    })
    .catch(error => {
        console.error('Failed to analyze token tradings:', error);
    });