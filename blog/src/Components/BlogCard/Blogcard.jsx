import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Blogcard({ data,onclick }) {
  const navigate = useNavigate();
  return (
    <div className="w-[350px] md:w-[330px] h-[170px] md:h-[400px] p-2 md:p-5 border-3  border-slate-500 rounded-lg  shadow-lg hover:shadow-lg flex items-center justify-around  md:flex-col gap-2"
    data-aos="fade-up" data-aos-duration="2000"
    >
      {/* Blog thumbnail */}
      <img
        src={data?.image?.secure_url || "#"}
        alt=""
        className="rounded-lg w-2/5 h-[90%] md:h-[50%]  md:w-full"
      />
      <div className="w-3/2 md:w-full h-full  md:h-1/2 flex items-center justify-around flex-col">
        <h2 className="font-bold capitalize md:p-2 md:text-md  text-sm">{data.title}</h2>
        <p className="font-semibold capitalize md:p-3 md:text-sm text-[10px] text-slate-400">
          {data.description}
        </p>
          <button className="bg-purple-600 px-5  md:h-[40px]  font-bold text-white rounded-lg"
          onClick={onclick}
          >
            Read
          </button>
      </div>
    </div>
  );
}

export default Blogcard;
