import { NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'edge';

// Utility Functions
const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
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

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
        return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    try {
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

        // Process data and format summary
        const summaryData = {
            mostProfitableToken: {
                symbol: holdings[0]?.token?.symbol || 'Unknown',
                profit: parseFloat(holdings[0]?.total_profit || 0),
                percentageGain: parseFloat(holdings[0]?.pnl_pct || 0)
            },
            mostLossToken: {
                symbol: holdings[holdings.length - 1]?.token?.symbol || 'Unknown',
                loss: parseFloat(holdings[holdings.length - 1]?.total_profit || 0),
                percentageLoss: parseFloat(holdings[holdings.length - 1]?.pnl_pct || 0)
            },
            totalProfitLossSummary: {
                totalProfit: holdings.reduce((sum, holding) => {
                    const profit = parseFloat(holding.total_profit || 0);
                    return profit > 0 ? sum + profit : sum;
                }, 0),
                totalLoss: Math.abs(holdings.reduce((sum, holding) => {
                    const profit = parseFloat(holding.total_profit || 0);
                    return profit < 0 ? sum + profit : sum;
                }, 0)),
                netProfitLoss: holdings.reduce((sum, holding) => {
                    return sum + parseFloat(holding.total_profit || 0);
                }, 0)
            }
        };

        return NextResponse.json(summaryData);
    } catch (error) {
        console.error('Error fetching summary data:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch summary data' }, { status: 500 });
    }
}
