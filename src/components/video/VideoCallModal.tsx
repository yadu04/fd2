import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff } from 'lucide-react';
import VideoCall from './VideoCall';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  otherPartyName: string;
  isIncomingCall?: boolean;
  onAcceptCall?: () => void;
  onRejectCall?: () => void;
}

const VideoCallModal = ({
  isOpen,
  onClose,
  otherPartyName,
  isIncomingCall = false,
  onAcceptCall,
  onRejectCall
}: VideoCallModalProps) => {
  const [isCallStarted, setIsCallStarted] = useState(false);

  const handleStartCall = () => {
    setIsCallStarted(true);
  };

  const handleEndCall = () => {
    setIsCallStarted(false);
    onClose();
  };

  const handleAcceptCall = () => {
    if (onAcceptCall) {
      onAcceptCall();
    }
    setIsCallStarted(true);
  };

  const handleRejectCall = () => {
    if (onRejectCall) {
      onRejectCall();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {isIncomingCall ? 'Incoming Call' : 'Start Video Call'}
          </DialogTitle>
        </DialogHeader>

        {!isCallStarted ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">
                {isIncomingCall
                  ? `${otherPartyName} is calling...`
                  : `Call ${otherPartyName}`}
              </h3>
              <p className="text-gray-500 mt-2">
                {isIncomingCall
                  ? 'Would you like to accept this video call?'
                  : 'Start a video call to discuss the donation details'}
              </p>
            </div>

            {isIncomingCall ? (
              <div className="flex gap-4">
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={handleRejectCall}
                >
                  <PhoneOff className="h-5 w-5 mr-2" />
                  Reject
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleAcceptCall}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Accept
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="lg"
                onClick={handleStartCall}
                className="bg-green-600 hover:bg-green-700"
              >
                <Phone className="h-5 w-5 mr-2" />
                Start Call
              </Button>
            )}
          </div>
        ) : (
          <VideoCall
            isInitiator={!isIncomingCall}
            onEndCall={handleEndCall}
            otherPartyName={otherPartyName}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoCallModal; 