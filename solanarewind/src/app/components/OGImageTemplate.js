// pages/api/og.js
import puppeteer from 'puppeteer';
import ReactDOMServer from 'react-dom/server';
import OGImageTemplate from '../../components/OGImageTemplate';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  const { wallet } = req.query;
  
  if (!wallet) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  try {
    // Fetch wallet data from Firebase
    const docRef = doc(getFirestore(), "walletData", wallet);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const walletData = docSnap.data();
    const conclusion = getConclusionContent(walletData.analysis);

    // Render React component to HTML
    const html = ReactDOMServer.renderToString(
      <OGImageTemplate 
        conclusion={conclusion}
        tokenData={walletData.tokenData}
      />
    );

    // Wrap the component HTML with necessary structure
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set viewport to match OG image dimensions
    await page.setViewport({ width: 1200, height: 630 });
    
    // Set content and wait for any resources to load
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    
    // Take screenshot
    const image = await page.screenshot({
      type: 'png'
    });
    
    await browser.close();

    // Set response headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
    
    // Send the image
    res.end(image);

  } catch (error) {
    console.error('Error generating OG image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}