export const maxDuration = 60;
import { NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'edge';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');
    const network = searchParams.get('network') || 'mainnet-beta';
    const page = searchParams.get('page') || '1';
    const size = searchParams.get('size') || '100'; // Increased size to get more stake accounts

    if (!walletAddress) {
        return NextResponse.json({
            error: 'Wallet address is required'
        }, { status: 400 });
    }

    try {
        const apiKey = "p83nIt9xRfQbYjx8";
        
        // Fetch portfolio data
        const portfolioUrl = `https://api.shyft.to/sol/v1/wallet/get_portfolio?network=${network}&wallet=${walletAddress}`;
        const portfolioPromise = axios.get(portfolioUrl, {
            headers: { "x-api-key": apiKey }
        });
        
        // Fetch stake accounts
        const stakeUrl = `https://api.shyft.to/sol/v1/wallet/stake_accounts?network=${network}&wallet_address=${walletAddress}&page=${page}&size=${size}`;
        const stakePromise = axios.get(stakeUrl, {
            headers: { "x-api-key": apiKey }
        });
        
        // Fetch SOL price
        const solPricePromise = axios.get('https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112');

        // Wait for initial requests to complete
        const [portfolioResponse, stakeResponse, solPriceResponse] = await Promise.allSettled([
            portfolioPromise, 
            stakePromise,
            solPricePromise
        ]);

        // Process portfolio data
        let portfolioData = null;
        if (portfolioResponse.status === 'fulfilled' && portfolioResponse.value.data) {
            portfolioData = portfolioResponse.value.data;
        }
        
        // Process stake accounts data
        let stakeData = null;
        if (stakeResponse.status === 'fulfilled' && stakeResponse.value.data) {
            stakeData = stakeResponse.value.data;
        }
        
        // If both portfolio and stake APIs failed
        if (!portfolioData && !stakeData) {
            return NextResponse.json({ wallet: 'too new' });
        }

        // Get SOL price
        let solPrice = 0;
        if (solPriceResponse.status === 'fulfilled' && solPriceResponse.value.data && 
            solPriceResponse.value.data.data && 
            solPriceResponse.value.data.data.So11111111111111111111111111111111111111112) {
            solPrice = parseFloat(solPriceResponse.value.data.data.So11111111111111111111111111111111111111112.price);
        }

        // Process tokens with balances > 0
        const tokensWithBalance = [];
        let totalTokenValue = 0;
        
        if (portfolioData && portfolioData.result && portfolioData.result.tokens) {
            // Filter tokens with balance > 0
            const tokensToFetch = portfolioData.result.tokens.filter(token => token.balance > 0);
            
            if (tokensToFetch.length > 0) {
                // Get token IDs
                const tokenIds = tokensToFetch.map(token => token.address).join(',');
                
                // Fetch token prices from Jupiter
                const tokenPricesResponse = await axios.get(`https://api.jup.ag/price/v2?ids=${tokenIds}&showExtraInfo=true`);
                
                // Process token prices and calculate values
                if (tokenPricesResponse.data && tokenPricesResponse.data.data) {
                    tokensToFetch.forEach(token => {
                        const priceData = tokenPricesResponse.data.data[token.address];
                        const price = priceData ? parseFloat(priceData.price) : 0;
                        const decimals = token.info && token.info.decimals ? token.info.decimals : 9;
                        const adjustedBalance = token.balance ;
                        const value = price * adjustedBalance;
                        
                        if (value > 0) {
                            tokensWithBalance.push({
                                address: token.address,
                                balance: adjustedBalance,
                                price: price,
                                value: value,
                                decimals: decimals
                            });
                            
                            totalTokenValue += value;
                        }
                    });
                }
            }
        }
        
        // Calculate staked value
        let totalStakedAmount = 0;
        let totalStakedValue = 0;
        const stakedAccounts = [];
        
        if (stakeData && stakeData.result && stakeData.result.data) {
            stakeData.result.data.forEach(stake => {
                if (stake.status === 'delegated' && stake.state === 'active') {
                    const stakeAmount = parseFloat(stake.delegated_amount);
                    totalStakedAmount += stakeAmount;
                    
                    stakedAccounts.push({
                        address: stake.stake_account_address,
                        validator: stake.vote_account_address,
                        amount: stakeAmount,
                        value: stakeAmount * solPrice
                    });
                }
            });
            
            totalStakedValue = totalStakedAmount * solPrice;
        }
        
        // Calculate SOL value
        let solBalance = 0;
        if (portfolioData && portfolioData.result && portfolioData.result.sol_balance) {
            solBalance = parseFloat(portfolioData.result.sol_balance);
        }
        const solValue = solBalance * solPrice;
        
        // Calculate total portfolio value
        const totalPortfolioValue = solValue + totalTokenValue + totalStakedValue;
        
        // Prepare summary response
        const summary = {
            wallet: walletAddress,
            sol: {
                balance: solBalance,
                price: solPrice,
                value: solValue
            },
            tokens: {
                list: tokensWithBalance,
                count: tokensWithBalance.length,
                totalValue: totalTokenValue
            },
            staking: {
                accounts: stakedAccounts,
                count: stakedAccounts.length,
                totalAmount: totalStakedAmount,
                totalValue: totalStakedValue
            },
            nfts: {
                count: portfolioData?.result?.nfts?.length || 0,
                list: portfolioData?.result?.nfts || []
            },
            total: {
                portfolioValue: totalPortfolioValue,
                breakdown: {
                    solPercentage: (solValue / totalPortfolioValue) * 100,
                    tokensPercentage: (totalTokenValue / totalPortfolioValue) * 100,
                    stakingPercentage: (totalStakedValue / totalPortfolioValue) * 100
                }
            },
            rawData: {
                portfolio: portfolioData,
                stakeAccounts: stakeData
            }
        };
        
        return NextResponse.json(summary);
        
    } catch (error) {
        console.error('Error fetching wallet data:', error);
        return NextResponse.json({ 
            error: 'Failed to analyze wallet',
            message: error.message,
            wallet: 'too new'
        });
    }
}