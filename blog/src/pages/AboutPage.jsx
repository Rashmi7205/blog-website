import React from 'react'

function AboutPage() {
  return (
    <div className='w-full flex items-center justify-around flex-col p-4 '>
        <div className='w-full md:w-2/3 '>
        <p className='text-lg font-semibold py-5 first-letter:text-9xl first-letter:text-yellow-600 '>Welcome to justwrite blog., your go-to destination for all things justwrite blog.. We're thrilled you've stumbled upon our corner of the internet, and we can't wait to share our passion, knowledge, and insights with you.</p>
        </div>
        <div className='w-full md:w-2/3 my-5 '>
          <h1 className='text-3xl font-bold text-red-600'>Who we are ?</h1>
          <p className='font-semibold py-5 '>
          At justwrite blog., we're a team of  dedicated individuals who are united by a common love for justwrite blog. . We come from diverse backgrounds, each bringing a unique perspective and expertise to the table. Our combined experiences and interests make our justwrite blog a dynamic hub for justwrite blog. enthusiasts.
          </p>
        </div>
        <h1 className='text-4xl font-bold '>Why Choose Us ?</h1>
        <div className='w-full md:w-2/3 my-5 flex items-center justify-around md:flex-row flex-col h-[950px] md:h-auto'>
            <div className='w-[200px] h-[150px]'>
                  <h1 className='my-3 text-5xl  py-2 px-3 font-bold text-[#2BB79D]
                  border-l-8 border-l-[#2BB79D]
                  '>Quality</h1>
                  <p className='text-lg font-semibold'>We are committed to delivering high-quality, well-researched, and informative content that adds value to your life.</p>
            </div>
            <div className='w-[200px] h-[150px]'>
                  <h1 className='my-3 text-5xl py-2 px-3 font-bold text-[#0132E0]
                  border-l-8 border-l-[#0132E0]
                  '>Diversity</h1>
                  <p className='text-lg font-semibold'>With a diverse group of contributors, we offer a wide range of perspectives and expertise to cater to various interests within justwrite blog.</p>
            </div>
            <div className='w-[200px] h-[150px]'>
                  <h1 className='my-3 text-5xl py-2 px-3 font-bold text-[#F00]
                  border-l-8 border-l-[#F00]
                  '>Engagement</h1>
                  <p className='text-lg font-semibold'> We value our readers and actively encourage interaction. Your comments and feedback shape the direction of our content.</p>
            </div>
        </div>
    </div>
  )
}

export default AboutPage