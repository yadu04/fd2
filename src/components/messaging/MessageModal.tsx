import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MessageList from "./MessageList";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: number;
  otherUserId: number;
  foodId?: number;
  foodName?: string;
  otherUserName: string;
  currentUserName: string;
}

const MessageModal = ({
  isOpen,
  onClose,
  currentUserId,
  otherUserId,
  foodId,
  foodName,
  otherUserName,
  currentUserName,
}: MessageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[700px]">
        <DialogHeader>
          <DialogTitle>Message {otherUserName}</DialogTitle>
        </DialogHeader>
        <MessageList
          currentUserId={currentUserId}
          otherUserId={otherUserId}
          foodId={foodId}
          foodName={foodName}
          otherUserName={otherUserName}
          currentUserName={currentUserName}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal; 