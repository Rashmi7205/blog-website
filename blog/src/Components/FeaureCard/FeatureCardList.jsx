import FeatureCard from "./FeatureCard";


function FeatureCardList() {
    const features = [
        {
            title:"User-friendly Interface",
            desc:"Intuitive and easy-to-use interface for a seamless user experience"
        },
        {
            title:"Responsive Design",
            desc:"Optimized for all devices, ensuring a consistent experience across desktop, tablet, and mobile"
        },
        {
            title:"Customizable Themes",
            desc:"Choose from a variety of themes to personalize the look and feel of your blog"
        },
        {
            title:"Social Sharing",
            desc:"Easily share your blog posts on popular social media platforms with just a click"
        },
    ] ;
  return (
    <div className="w-full max-h-max bg-[#F5B69D] flex flex-col items-center justify-around gap-2 p-4 rounded-lg my-8"
    data-aos="fade-up"
    >
        <h3 className="font-semibold" 
        data-aos="fade-right" data-aos-duration="1500"
        >Features</h3>
        <h1 className="font-bold text-xl md:text-4xl tracking-wider"
        data-aos="fade-left" data-aos-duration="1500"
        >Discover the Key Features</h1>
        <p className="font-semibold tracking-wide text-sm"
        data-aos="fade-right" data-aos-duration="1500"
        >Unlock the full potential of our blog website with these powerful features</p>
        <div className="w-full flex flex-wrap  gap-2 my-4 items-center justify-center">
            {
                features.map((featureData)=><FeatureCard feature={featureData}/>)
            }
        </div>
    </div>
  )
}

export default FeatureCardList