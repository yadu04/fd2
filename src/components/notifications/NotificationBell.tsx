import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  message: string;
  type: "claim" | "completion" | "message";
  read: boolean;
  timestamp: string;
  foodId?: number;
  foodName?: string;
  quantity?: string;
  location?: string;
  receiverName?: string;
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  // Load notifications from localStorage on mount
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (e) {
        console.error("Error parsing notifications:", e);
      }
    }
  };

  // Listen for new notifications
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'notifications') {
        loadNotifications();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
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
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b last:border-b-0 ${
                  !notification.read ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    {notification.type === "claim" && (
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Food: {notification.foodName}</p>
                        <p>Quantity: {notification.quantity}</p>
                        <p>Location: {notification.location}</p>
                        <p>Claimed by: {notification.receiverName}</p>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                  {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-brand-green" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;

