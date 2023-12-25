"use client";

import ChatBox from "@molecules/chat/ChatBox";
import ChatHeader from "@molecules/chat/ChatHeader";
import Layout from "@templates/Layout";

function ChatPage() {
  return (
    <Layout>
      <div className="flex flex-col p-9 space-y-1">
        <ChatHeader image="/anime.jpg" status="ONLINE" username="noface" />
        <ChatBox
          friendImage="/anime.jpg"
          message="Hello how are you?"
          response="I am fine thnk you"
          userImage="/totoro.jpg"
        />
      </div>
    </Layout>
  );
}

export default ChatPage;
