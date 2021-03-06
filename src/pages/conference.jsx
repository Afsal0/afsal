import React, { useEffect, useContext, useState, useCallback } from "react";
import { AppContext } from "../store/AppContext";
import { useHistory, useParams } from "react-router-dom";
import { ConferenceHeader } from "../views/headerView";
import { ConferenceFooter } from "../views/footerView";
import { ConferenceMainView } from "../views/mainView";
import { Notifications } from "../views/components/notifications";

export const Conference = () => {
  const history = useHistory();
  const { roomId, role } = useParams();
  const context = useContext(AppContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantListOpen, setIsParticipantListOpen] = useState(false);
  const toggleChat = useCallback(() => {
    setIsChatOpen(open => !open);
  }, []);

  const onParticipantListOpen = useCallback(value => {
    setIsParticipantListOpen(value);
  }, []);

  const { loginInfo, leave } = context;

  useEffect(() => {
    if (!roomId || !role) {
      history.push(`/`);
    }

    if (!loginInfo.token) {
      // redirect to join if token not present
      history.push(`/preview/${loginInfo.roomId || roomId || ""}/${role}`);
    }

    return () => {
      leave();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-full flex flex-col dark:bg-black">
      <div className="h-14 md:h-16">
        <ConferenceHeader onParticipantListOpen={onParticipantListOpen} />
      </div>
      <div className="w-full flex flex-1 flex-col md:flex-row">
        <ConferenceMainView
          isChatOpen={isChatOpen}
          isParticipantListOpen={isParticipantListOpen}
          toggleChat={toggleChat}
        />
        <Notifications />
      </div>
      <div className="dark:bg-black" style={{ height: "10%" }}>
        <ConferenceFooter isChatOpen={isChatOpen} toggleChat={toggleChat} />
      </div>
    </div>
  );
};
