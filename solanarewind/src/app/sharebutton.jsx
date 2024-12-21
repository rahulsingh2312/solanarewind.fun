'use client'
import React, { useState, useEffect } from 'react';

const ShareButton = ({ containerRef }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleShare = async () => {
    if (isExporting || !isClient) return;
    
    try {
      setIsExporting(true);

      // Dynamically import html2canvas only on client side
      const html2canvas = (await import('html2canvas')).default;

      // Temporarily hide the button for screenshot
      const shareButton = containerRef.current.querySelector('#share-button');
      const originalDisplay = shareButton.style.display;
      shareButton.style.display = 'none';

      // Show all content for screenshot
      const elements = containerRef.current.querySelectorAll('.token-data, .content-element');
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        }
      });

      // Wait for images to load
      const images = containerRef.current.getElementsByTagName('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      // Create canvas
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 440,
        height: Math.max(600, containerRef.current.offsetHeight),
        logging: false
      });

      // Restore button display
      shareButton.style.display = originalDisplay;

      // Convert to blob and share
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            // Create file from blob
            const file = new File([blob], 'solana-rewind.png', { type: 'image/png' });
            
            // Share text
            const shareText = "bruh, solana rewind roasted me hard, try only if you got guts.\nhttps://solanarewind.fun/";
            
            // Download image
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'solana-rewind.png';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
          
            // Open Twitter share dialog
            const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
            if (typeof window !== "undefined") {

            window.open(tweetUrl, '_blank');
            }
            
          } catch (error) {
            console.error("Error sharing:", error);
          }
        }
      }, 'image/png');

    } catch (error) {
      console.error("Error exporting image:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Don't render anything during SSR
  if (!isClient) return null;

  return (
    <button
      id="share-button"
      onClick={handleShare}
      disabled={isExporting}
      className={`absolute top-4 right-4 z-20 bg-[#1DA1F2] text-white px-6 py-2 rounded-full text-sm transition-colors duration-200 ${
        isExporting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a91da]'
      }`}
    >
      {isExporting ? 'Processing...' : 'Share on X'}
    </button>
  );
};

export default ShareButton;