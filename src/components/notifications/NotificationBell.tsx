
import { useState } from "react";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  message: string;
  type: "request" | "completion" | "message";
  read: boolean;
  timestamp: string;
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Hope Shelter requested your vegetable donation",
      type: "request",
      read: false,
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      message: "Children's Center completed pickup of bread donation",
      type: "completion",
      read: false,
      timestamp: new Date().toISOString(),
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-100'
                }`}
              >
                <p className="text-sm">{notification.message}</p>
                <span className="text-xs text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No notifications
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;

