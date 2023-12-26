"use client";

import ChatBox from "@components/organisms/ChatBox";
import SidePanel from "@components/organisms/SidePanel";
import ChatHeader from "@molecules/chat/ChatHeader";
import Layout from "@templates/Layout";

function ChatPage() {
  return (
    <Layout>
      <div className="flex space-x-1 p-9 space-y-1">
        <div className="border-2">
          <SidePanel image="/totoro.jpg" />
        </div>
        <div className="flex flex-col w-5/6 border-2">
          <ChatHeader image="/anime.jpg" status="ONLINE" username="noface" />
          <ChatBox
            friendImage="/anime.jpg"
            message="Hello how are you?"
            response="I am fine thnk you"
            userImage="/totoro.jpg"
          />
        </div>
      </div>
    </Layout>
  );
}

export default ChatPage;
