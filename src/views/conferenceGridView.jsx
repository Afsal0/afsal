import { selectPeers, useHMSStore } from "@100mslive/hms-video-react";
import React, { useContext } from "react";
import { AppContext } from "../store/AppContext";
import {ROLES} from "../common/roles";
import {GridCenterView, GridSidePaneView} from "./components/gridView";
import {ChatView} from './components/chatView'

export const GridView = ({ isChatOpen, toggleChat }) => {
    const { maxTileCount } = useContext(AppContext);
    const peers = useHMSStore(selectPeers);
    return <React.Fragment>
        <GridCenterView
            peers={peers}
            maxTileCount={8}
            allowRemoteMute={false}
        ></GridCenterView>
    {isChatOpen && (
            <div className="flex absolute h-3/4 items-end p-2">
                <div className="w-full h-full">
                    <ChatView toggleChat={toggleChat}></ChatView>
                </div>
            </div>
        )}
    </React.Fragment>
};
