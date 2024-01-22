import React from 'react'
import Faq from './Faq';

function FaqList() {
    const faqs = [
        {
          question: "What is justwrite about?",
          answer: `Justwrite is a platform dedicated to content creators, providing valuable insights, tips, and information on various topics`
        },
        {
          question: "Can I share your content on my website or social media?",
          answer: "Yes, we encourage you to share our content! Feel free to share articles on your website or social media channels, but please provide proper attribution to justwrite and link back to the original post."
        },
        {
          question: "Are comments open on your blog posts?",
          answer: "Yes, we encourage readers to engage with our content by leaving comments. Your thoughts, questions, and feedback are highly valued. Please remember to follow our community guidelines when posting comments."
        },
        {
          question: "Are your blog posts available in multiple languages?",
          answer: "Currently, our content is primarily available in [main language], but we are exploring options for translations and multilingual content to make our posts accessible to a broader audience."
        },
        {
          question: "Do you have a mobile app for justwrite?",
          answer: "At the moment, we don't have a dedicated mobile app, but our website is optimized for mobile viewing. You can easily access and enjoy our content on your mobile devices by visiting our website from your mobile browser."
        }
      ];
  return (
    <div className='md:w-3/5 w-4/5 space-y-4'>
        {
            faqs.map((faq)=><Faq faqData={faq}/>)
        }
    </div>
  )
}

export default FaqList