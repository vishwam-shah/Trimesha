'use client';

import { Chatbot } from '@/components/ui/chatbot';

export default function ChatbotPage() {
  const handleSendMessage = async (message: string) => {
    // You can implement your custom logic here
    // For example, call an API endpoint
    console.log('User sent:', message);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return response (you would typically get this from your API)
    return `I received your message: "${message}"`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Chatbot
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Chat with our intelligent assistant
          </p>
        </div>

        <div className="h-[600px] md:h-[700px]">
          <Chatbot
            onSendMessage={handleSendMessage}
            botName="Trimesha AI"
            welcomeMessage="Hello! I'm Trimesha AI. How can I assist you today?"
            placeholder="Ask me anything..."
          />
        </div>
      </div>
    </div>
  );
}
