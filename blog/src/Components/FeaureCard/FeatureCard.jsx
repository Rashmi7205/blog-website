import { TbCube } from "react-icons/tb";

function FeatureCard({feature}) {
  return (
    <div className='w-full md:w-2/5 flex items-start justify-around bg-[#f1814d8b] py-4 shadow-lg rounded-md'
    data-aos-duration="2000"
    data-aos="zoom-in"
    >
        <TbCube 
        className="font-bold text-4xl"
        />
        <div className="w-4/5">
            <h3 className="font-bold text-lg">{feature.title}</h3>
            <p className="text-sm my-2 text-white">{feature.desc}</p>
        </div>
    </div>
  )
}

export default FeatureCard