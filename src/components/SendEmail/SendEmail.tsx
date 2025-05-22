import React, { useState } from "react";

interface SendEmailProps {
  onSend?: () => void;
}

const SendEmail: React.FC<SendEmailProps> = ({ onSend }) => {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      if (onSend) {
        await onSend();
      }
    } catch (err) {
      console.error("Error sending email:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <button type="submit" disabled={sending}>
        <span className="text-gray-400">{sending ? "Sending..." : "Send Email Test"}</span>
      </button>
    </form>
  );
};

export default SendEmail;
