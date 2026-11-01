import React from 'react';
import { X, Bell, CheckCheck, MessageSquare, ShieldCheck, Tag } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const NotificationDrawer = () => {
  const { 
    isNotifDrawerOpen, 
    setIsNotifDrawerOpen, 
    notifications, 
    unreadCount, 
    markAllNotificationsAsRead 
  } = useMarketplace();

  if (!isNotifDrawerOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={() => setIsNotifDrawerOpen(false)}
    >
      <div 
        className="w-full max-w-md bg-white dark:bg-[#181728] h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-slideLeft border-l border-[#E8E7EE] dark:border-[#2C2A42]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E7EE] dark:border-[#2C2A42] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF] flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#171725] dark:text-[#F3F2FA]">Notifications</h3>
              <p className="text-xs text-[#77758A] dark:text-[#9E9BB2]">
                {unreadCount > 0 ? `${unreadCount} unread update(s)` : 'All caught up!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-xs font-semibold text-[#635BFF] dark:text-[#A59DFF] hover:underline flex items-center gap-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Read all
              </button>
            )}
            <button
              onClick={() => setIsNotifDrawerOpen(false)}
              className="p-1.5 rounded-lg text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137]"
              aria-label="Close notifications"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notif) => {
              let icon = <Bell className="w-4 h-4 text-[#635BFF] dark:text-[#A59DFF]" />;
              if (notif.type === 'message' || notif.type === 'inquiry') {
                icon = <MessageSquare className="w-4 h-4 text-[#22A06B] dark:text-[#2EC486]" />;
              } else if (notif.type === 'listing') {
                icon = <Tag className="w-4 h-4 text-[#635BFF] dark:text-[#A59DFF]" />;
              } else if (notif.type === 'system') {
                icon = <ShieldCheck className="w-4 h-4 text-[#635BFF] dark:text-[#A59DFF]" />;
              }

              return (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    notif.unread
                      ? 'bg-[#F8F7FC] dark:bg-[#222137] border-[#635BFF]/30 shadow-sm'
                      : 'bg-white dark:bg-[#1A192B] border-[#E8E7EE] dark:border-[#2C2A42]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#181728] border border-[#E8E7EE] dark:border-[#2C2A42] shrink-0">
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-[#171725] dark:text-[#F3F2FA] truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[10px] text-[#77758A] dark:text-[#9E9BB2] shrink-0 ml-2">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-[#77758A] dark:text-[#9E9BB2]">
              <Bell className="w-10 h-10 text-[#A3A1B2] dark:text-[#6C6885] mx-auto mb-2 opacity-50" />
              <p className="text-xs">No notifications yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
