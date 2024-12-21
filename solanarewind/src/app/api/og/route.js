import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { Cloudinary } from '@cloudinary/url-gen';
import { source } from "@cloudinary/url-gen/actions/overlay";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { scale } from "@cloudinary/url-gen/actions/resize"; // Added this import

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQqa0KjFo9OBH95G03fsTGNjUbEoU5JbA",
  authDomain: "emoji-buy.firebaseapp.com",
  projectId: "emoji-buy",
  storageBucket: "emoji-buy.firebasestorage.app",
  messagingSenderId: "329260816313",
  appId: "1:329260816313:web:34527cb53f22a512254868",
  measurementId: "G-D654LZE41V",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dcd3wt0bv'
  }
});

// Helper function to get conclusion content
const getConclusionContent = (analysis) => {
  if (!analysis) return { title: "", description: "" };
  
  try {
    const analysisPoints = JSON.parse(analysis).split("\n\n");
    const conclusionPoint = analysisPoints.find(point => 
      point.includes("Conclusion:") || 
      point.includes("### Conclusion:")
    );

    if (conclusionPoint) {
      const match = conclusionPoint.match(/\*\*([^*]+)\*\*\s*-\s*(.+)/);
      if (match) {
        return {
          title: match[1].trim(),
          description: match[2].trim()
        };
      }
    }
  } catch (error) {
    console.error('Error parsing analysis:', error);
  }

  return {
    title: "The Wallet of Woe",
    description: "Your saga of crypto adventures, featuring missed opportunities, questionable decisions, and a collection of tokens that tell quite a story."
  };
};

// Helper function to fetch and upload token icon to Cloudinary
async function uploadTokenIconToCloudinary(iconUrl) {
  try {
    const response = await fetch(iconUrl);
    const buffer = await response.arrayBuffer();
    
    const formData = new FormData();
    formData.append('file', new Blob([buffer]));
    formData.append('upload_preset', 'solanarewind');

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/dcd3wt0bv/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    const uploadResult = await uploadResponse.json();
    return uploadResult.public_id;
  } catch (error) {
    console.error('Error uploading icon to Cloudinary:', error);
    return null;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      return new Response('Wallet address is required', { status: 400 });
    }

    const docRef = doc(db, "walletData", walletAddress);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return new Response('Wallet not found', { status: 404 });
    }

    const walletData = docSnap.data();
    const { tokenData } = walletData;
    const conclusion = getConclusionContent(walletData.analysis);

    // Create base image with dimensions using the imported scale transformation
    let ogImage = cld.image('solana-rewind-background')
      .resize(scale().width(1200).height(630));

    // Add title
    ogImage = ogImage.overlay(
      source(
        text(conclusion.title, new TextStyle('Roboto', 64))
          .textColor('white')
      )
      .position(new Position().gravity(compass('north')).offsetY(50))
    );

    // Add description
    ogImage = ogImage.overlay(
      source(
        text(conclusion.description, new TextStyle('Roboto', 32))
          .textColor('rgba(255,255,255,0.8)')
      )
      .position(new Position().gravity(compass('center')).offsetY(0))
    );

    // If there's a most traded token icon, add it
    if (tokenData?.mostTraded?.icon) {
      ogImage = ogImage.overlay(
        source(text(tokenData.mostTraded.symbol, new TextStyle('Roboto', 48)))
          .position(new Position().gravity(compass('south')).offsetY(50))
      );
    }

    // Set PNG format
    ogImage.format('png');

    // Generate the URL
    const ogImageUrl = ogImage.toURL();
console.log(ogImageUrl);
    // Redirect to the Cloudinary-generated image
    return Response.redirect(ogImageUrl);

  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}