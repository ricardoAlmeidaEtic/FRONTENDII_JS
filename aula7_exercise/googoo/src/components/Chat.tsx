interface ChatMessageProps {
  position: 'start' | 'end';
  imageSrc: string;
  name: string;
  time: string;
  message: string;
  footer: string;
}

function ChatMessage({ position, imageSrc, name, time, message, footer }: ChatMessageProps) {
  return (
    <div className={`chat chat-${position}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Chat avatar" src={imageSrc} />
        </div>
      </div>
      <div className="chat-header">
        {name}
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className="chat-bubble">{message}</div>
      <div className="chat-footer opacity-50">{footer}</div>
    </div>
  );
}

function Chat() {
  return (
    <>
      <ChatMessage
        position="start"
        imageSrc="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        name="Obi-Wan Kenobi"
        time="12:45"
        message="You were the Chosen One!"
        footer="Delivered"
      />
      <ChatMessage
        position="end"
        imageSrc="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        name="Anakin"
        time="12:46"
        message="I hate you!"
        footer="Seen at 12:46"
      />
    </>
  );
}

export default Chat;
