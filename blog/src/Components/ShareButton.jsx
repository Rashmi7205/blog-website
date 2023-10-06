import React from 'react';

function ShareButton({title,url}) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text:"See this amazing blog... ",
          url,
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
      <i className="fa-solid fa-share"></i>
    </button>
  );
}

export default ShareButton;
