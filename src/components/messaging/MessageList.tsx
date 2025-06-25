import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  foodId?: number;
  foodName?: string;
}

interface MessageListProps {
  currentUserId: number;
  otherUserId: number;
  foodId?: number;
  foodName?: string;
  otherUserName: string;
  currentUserName: string;
}

const MessageList = ({ 
  currentUserId, 
  otherUserId, 
  foodId, 
  foodName,
  otherUserName,
  currentUserName 
}: MessageListProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load messages from localStorage
    const messagesString = localStorage.getItem('messages');
    if (messagesString) {
      try {
        const allMessages = JSON.parse(messagesString);
        const conversationMessages = allMessages.filter(
          (msg: Message) =>
            (msg.senderId === currentUserId && msg.receiverId === otherUserId) ||
            (msg.senderId === otherUserId && msg.receiverId === currentUserId)
        );
        setMessages(conversationMessages);
      } catch (e) {
        console.error("Error parsing messages:", e);
      }
    }

    // Set up refresh interval to check for new messages
    const intervalId = setInterval(() => {
      const messagesString = localStorage.getItem('messages');
      if (messagesString) {
        try {
          const allMessages = JSON.parse(messagesString);
          const conversationMessages = allMessages.filter(
            (msg: Message) =>
              (msg.senderId === currentUserId && msg.receiverId === otherUserId) ||
              (msg.senderId === otherUserId && msg.receiverId === currentUserId)
          );
          setMessages(conversationMessages);
        } catch (e) {
          console.error("Error parsing messages:", e);
        }
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(intervalId);
  }, [currentUserId, otherUserId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      senderId: currentUserId,
      receiverId: otherUserId,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      foodId,
      foodName,
    };

    // Get existing messages
    const messagesString = localStorage.getItem('messages');
    let allMessages: Message[] = [];
    
    if (messagesString) {
      try {
        allMessages = JSON.parse(messagesString);
      } catch (e) {
        console.error("Error parsing messages:", e);
      }
    }

    // Add new message
    allMessages.push(message);
    localStorage.setItem('messages', JSON.stringify(allMessages));

    // Update local state
    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Create notification for the receiver
    const notificationsString = localStorage.getItem('notifications');
    let notifications = [];
    if (notificationsString) {
      try {
        notifications = JSON.parse(notificationsString);
      } catch (e) {
        console.error("Error parsing notifications:", e);
      }
    }

    // Create new notification
    const newNotification = {
      id: Date.now(),
      message: `${currentUserName} sent you a message${foodName ? ` about "${foodName}"` : ''}`,
      type: "message",
      read: false,
      timestamp: new Date().toISOString(),
      foodId,
      foodName,
      senderId: currentUserId,
      senderName: currentUserName
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // Show toast notification
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${otherUserName}`,
    });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle>Chat with {otherUserName}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderId === currentUserId
                    ? "bg-brand-green text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageList; 