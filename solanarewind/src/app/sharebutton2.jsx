'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ShareButton = ({ containerRef, publicKey }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  // Check if we're in browser environment on mount
  useEffect(() => {
    setIsBrowser(true);
  }, []); 

  const handleShare = async () => {
    if (isExporting || !isBrowser) return;
    
    try {
      setIsExporting(true);
      
      const container = containerRef.current;
      if (!container) return;

      // Prepare container for capture
      const prepareForCapture = () => {
        const shareButton = container.querySelector('button');
        if (shareButton) {
          shareButton.style.display = 'none';
        }

        const fixedImages = container.querySelectorAll('img');
        const originalStyles = new Map();

        fixedImages.forEach(img => {
          originalStyles.set(img, {
            position: img.style.position,
            top: img.style.top,
            bottom: img.style.bottom,
            left: img.style.left,
            right: img.style.right,
            className: img.className
          });

          img.style.position = 'absolute';
          img.className = img.className.replace('fixed', 'absolute');
        });

        const originalPosition = container.style.position;
        container.style.position = 'relative';

        const tokenElements = container.querySelectorAll('.token-data');
        tokenElements.forEach(el => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        });

        return { originalStyles, originalPosition, shareButton };
      };

      // Restore original styles
      const restoreStyles = (originalStyles, originalPosition, shareButton) => {
        const fixedImages = container.querySelectorAll('img');
        fixedImages.forEach(img => {
          const originalStyle = originalStyles.get(img);
          if (originalStyle) {
            Object.assign(img.style, {
              position: originalStyle.position,
              top: originalStyle.top,
              bottom: originalStyle.bottom,
              left: originalStyle.left,
              right: originalStyle.right
            });
            img.className = originalStyle.className;
          }
        });

        container.style.position = originalPosition;

        if (shareButton) {
          shareButton.style.display = '';
        }
      };

      // Prepare container and get original styles
      const { originalStyles, originalPosition, shareButton } = prepareForCapture();

      // Dynamically import html2canvas only in browser
      const html2canvas = (await import('html2canvas')).default;
      
      // Wait for images to load
      await Promise.all(
        Array.from(container.querySelectorAll('img')).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      // Capture the container
      const canvas = await html2canvas(container, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FEF102',
        width: container.offsetWidth,
        height: container.offsetHeight,
        onclone: (clonedDoc, element) => {
          element.style.backgroundColor = '#FEF102';
        }
      });

      // Restore original styles
      restoreStyles(originalStyles, originalPosition, shareButton);

      // Create and trigger download
      const downloadImage = () => {
        const link = document.createElement('a');
        link.download = 'solana-rewind.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      // Share on X (Twitter) in a new window
      const shareOnX = () => {
        const text = "bruh, solana rewind roasted ☹️ me hard, try only if you got guts. ☠️ ";
        const url = publicKey ? `https://solanarewind.fun/${publicKey}` : 'https://solanarewind.fun';
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        if (typeof window !== "undefined") {

        window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
      };

      // Execute download and share
      downloadImage();
      shareOnX();

    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Don't render button during SSR
  if (!isBrowser) return null;

  return (
    <button
      onClick={handleShare}
      disabled={isExporting}
      className="absolute top-4 right-4 z-20 bg-[#1DA1F2] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#1a91da] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      {isExporting ? 'Processing...' : 'Share on X'}
    </button>
  );
};

// Use dynamic import with ssr disabled for the component
export default dynamic(() => Promise.resolve(ShareButton), { ssr: false });