import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Blogcard({ data }) {
  const navigate = useNavigate();
  return (
    <div className="w-[350px] md:w-[360px] h-[150px] md:h-[400px] m-2 p-2 md:p-5 border-2  border-slate-700 rounded-lg  shadow-md hover:shadow-lg flex  md:flex-col gap-2">
      {/* Blog thumbnail */}
      <img
        src={data.image.secure_url}
        alt=""
        className="rounded-lg w-2/5 h-[90%] md:h-[50%]  md:w-full"
      />
      <div className="w-3/2 md:w-full h-full  md:h-1/2 flex flex-col">
        <h2 className="font-bold capitalize md:p-3 md:text-xl  text-sm">{data.title}</h2>
        <p className="font-semibold capitalize md:p-3 md:text-sm text-[10px]">
          {data.description}
        </p>
          <button className="bg-purple-600 px-5  md:h-[40px]  font-bold text-white rounded-lg"
          onClick={()=>navigate(`readblog/${data._id}`)}
          >
            Read
          </button>
      </div>
    </div>
  );
}

export default Blogcard;
