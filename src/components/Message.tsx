import { memo } from "react";

interface MessageProps {
  message: {
    id: string;
    username: string;
    message: string;
    createdAt: string;
    userId: string;
  };
  isCurrentUser: boolean;
}

export const Message = memo(({ message, isCurrentUser }: MessageProps) => {
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`max-w-[70%] ${isCurrentUser ? "order-2" : "order-1"}`}>
        <div className="flex items-baseline gap-2 mb-1">
          <span
            className={`text-xs font-semibold ${
              isCurrentUser ? "text-blue-600" : "text-gray-700"
            }`}
          >
            {isCurrentUser ? "You" : message.username}
          </span>
          <span className="text-xs text-gray-400">{formattedTime}</span>
        </div>
        <div
          className={`rounded-lg px-4 py-2 ${
            isCurrentUser
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-gray-800 rounded-bl-none"
          }`}
        >
          <p className="text-sm wrap-break-word whitespace-pre-wrap">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
});

Message.displayName = "Message";
