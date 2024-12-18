// src/app/api/wallet-analysis/route.js
import { processWalletData } from '../../lib/model';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const wallet = searchParams.get('wallet');

        if (!wallet) {
            return NextResponse.json(
                { error: 'Wallet address is required' }, 
                { status: 400 }
            );
        }

        const analysisResult = await processWalletData(wallet);
        
        return NextResponse.json(analysisResult);
    } catch (error) {
        console.error('Error analyzing wallet:', error);
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
        );
    }
}