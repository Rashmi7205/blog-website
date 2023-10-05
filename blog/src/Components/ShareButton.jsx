import React from 'react';

function ShareButton() {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Your sharing title',
          text: 'Your sharing text',
          url: 'https://your-shareable-url.com',
        });
      } else {
        console.log('Web Share API not supported on this browser');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <button onClick={handleShare}>
      Share
    </button>
  );
}

export default ShareButton;
