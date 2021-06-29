import {selectLocalPeer, selectIsSomeoneScreenSharing, useHMSStore} from "@100mslive/hms-video-react";
import { GridView } from "./conferenceGridView";
import {ScreenShareView} from "./screenShareView";
import {ROLES} from "../common/roles";

export const ConferenceMainView = ({ isChatOpen, toggleChat }) => {
  const localPeer = useHMSStore(selectLocalPeer);
  const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);

  if (!localPeer) {  // we don't know the role yet to decide how to render UI
    return null;
  }

  const amIHost = localPeer.role === ROLES.HOST;
  let ViewComponent = GridView;

  if (isSomeoneScreenSharing) {
    ViewComponent = ScreenShareView;
  } 

  return ViewComponent && <ViewComponent isChatOpen={isChatOpen} toggleChat={toggleChat} />;
};
