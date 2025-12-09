function ChatUser(){
  return (
    <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
      
      <div className="avatar avatar-online">
        <div className="w-16 rounded-full">
          <img src="https://i.pravatar.cc/150" alt="user" />
        </div>
      </div>

      <div>
        <h2 className="text-white font-semibold">Aditi</h2>
        <p className="text-gray-400">aditi@gmail.com</p>
      </div>

    </div>
  );
}

export default ChatUser;
