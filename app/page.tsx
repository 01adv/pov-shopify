import AllWorkWear from "@/components/Allworkwear";
import ChatBot from "@/components/chatbot/ChatBot";

export default function Home() {
  return (
    <main className="h-full w-full relative">
      <AllWorkWear />

      <div className="hidden md:block">
        <ChatBot />
      </div>

    </main>
  );
}
