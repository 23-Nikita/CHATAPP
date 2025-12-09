import { IoSend } from "react-icons/io5";

export default function Typesend(){
    return (
        <div className="flex space-x-1  h-[8vh]  bg-gray-800">
         <div className="w-[70%] mx-4">
        <input type="text" placeholder="Type here" className="border border-gray-700 rounded-xl mt-1 outline-none px-4 py-3  w-full" />
        </div>
        <button>
            <IoSend className="text-3xl" />
        </button>
        </div>
    )
}