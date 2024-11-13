import React from "react";
import "./chat.css";
import { ChatMessage } from "../api/api";

interface Props {
  chatMessage: ChatMessage;
  isSenderSelf?: boolean;
}

const ChatBubble: React.FC<Props> = ({ chatMessage, isSenderSelf }) => {
  return (
    <div className={`chat-message sender-${isSenderSelf ? "self" : "other"}`}>
      {/* TODO: This is a user-unfriendly timestamp that doesn't match the spec. Look int using Moment.js or a more modern equivalent to pretty it up and make it context sensitive (e.g. "Today" etc.) */}
      <span className="timestamp">{chatMessage.timestamp}</span>
      <div className="chat-bubble">
        <span className="dice-notation">/r {chatMessage.notation}</span>
        <span className="breakdown">
          {/* TODO: This is not quite matching the spec formatting, due to the
          interspersing of bold values. Will need to use a less string-oriented
          approach. */}
          {chatMessage.results
            .map((result) =>
              result.type === "dice"
                ? `( ${result.allRolls.join(" | ")} )`
                : result.type === "constant"
                ? result.result
                : ""
            )
            .join(" + ")}
        </span>
        <span className="sum">
          = <b>{chatMessage.sum}</b>
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
