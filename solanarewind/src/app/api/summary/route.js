export const maxDuration = 60; 

import { NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'edge';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
        return NextResponse.json({ 
            error: 'Wallet address is required' 
        }, { status: 400 });
    }

    try {
        const apiUrl = `https://server.solanawrapped.me/analyze/${walletAddress}`;
        const response = await axios.get(apiUrl, {
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive',
                'DNT': '1',
                'Host': 'server.solanawrapped.me',
                'If-None-Match': 'W/"e3d-rcaMFHTDDzjLaIUcA6MOnijkQo0"',
                'Origin': 'https://www.solanawrapped.me',
                'Referer': 'https://www.solanawrapped.me/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not?A_Brand";v="99", "Chromium";v="130"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"'
            }
        });

         // Check if response.data is null
         if (response.data === null) {
            return NextResponse.json({ wallet: 'too new' });
        }
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ wallet: 'too new' });

    }
}
