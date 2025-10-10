// components/NotificationsPopup.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, CheckCircle } from "lucide-react";

interface Notification {
  title: string;
  message: string;
  time: string;
  type: "approved" | "revision";
}

interface NotificationsPopupProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
}

export function NotificationsPopup({ open, onClose, notifications }: NotificationsPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Notifications</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-3">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No new notifications</p>
          ) : (
            notifications.map((notif, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  notif.type === "approved" ? "bg-green-50" : "bg-yellow-50"
                }`}
              >
                {notif.type === "approved" ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">{notif.title}</p>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
