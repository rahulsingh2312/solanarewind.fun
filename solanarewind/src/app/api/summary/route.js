import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
        return NextResponse.json({ 
            error: 'Wallet address is required' 
        }, { status: 400 });
    }

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
                'cookie': '_ga=GA1.1.1884159000.1734303582; _ga_0XM0LYXGC8=GS1.1.1.1734303581.1.1.1734303612.0.0.0; cf_clearance=Lqr2._v7uby1KVJu7XBhiVbHU6m.sbmgD1OlwW3.gQk-1734356823-1.2.1.1-1EGtUeaoA3sQgdDWHSYt5yIMPYlsn2FpYyj1VRdC85DYUlGZeK_HqoQdfo1OLIeshDhKCcmUujhKr.ZQkxQ9e73GNtpEWJtBvH99v6OLxFUgsYTEKpQbWIG275WXrI4Nnte4ZrfI3RsdNGfXbyUtVM.rTWSuw7_mw9Mjkn8TxlmaV.TcxnM.va8KIA9yzOdiyH6YLrf8PiMJ3UOzG3Q1tO.35cjUVR8WC4V93SftLgv0rCHc9ny6nk201nUwCpcK9aukY93T97QPARgxg2bIrb2RnvSPUK1sftZRELsMTeUuJt04tfMF51.l4Qa8WIxIbO5yCsG9negVLr8blgA2Noq9Mvwqwg2bSkUDBUoBHs9_B.6K5dtcpQYimXiJpe0mGc9JtB8vYUEDbBL7TOLnCAAJJFl6fAYptfx.zrWhRoiYQX3fpP7V97ku7u7cLdWk; __cf_bm=rc9xbgVJkTrR2Ycg2jZw_f2ulEcFYs5iyBSch1hn.KU-1734356828-1.0.1.1-QWMJftnR4bE4hn3Cl6dNLbcsM1hT2JZQA4X5oUeLYiYMh874M7px3J4xS5Knft96wrHnN35iO7wunWBZ7UZOvA',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
            }
        });

        const holdings = response.data.data.holdings;

        // Utility functions
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

        // Calculate total profit and loss
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

        return NextResponse.json(analysis);
    } catch (error) {
        console.error('Error fetching token data:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch token data' 
        }, { status: 500 });
    }
}