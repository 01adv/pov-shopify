import AllWorkWear from "@/components/Allworkwear";
import { AssistantChat } from "@/components/chatbot/Assistant";

export default function Home() {
  return (
    <main className="h-full w-full relative">
      <AllWorkWear />
      <AssistantChat />
    </main>
  );
}
