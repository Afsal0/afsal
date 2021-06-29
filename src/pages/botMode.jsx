import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../store/AppContext";

export const BotMode = () => {
    const history = useHistory();
    var { env, roomId, role } = useParams();
    const { setLoginInfo } = useContext(AppContext);
    role = role.toLowerCase()
    if (!env || !roomId) {
        history.push("/")
    }
    const username = "100ms-Beam-Bot"
    getToken(username, role, roomId, env)
        .then((token) => {
            setLoginInfo({
                token: token,
                username: username,
                role: role,
                roomId: roomId,
                endpoint: "https://qa-init.100ms.live/init",
                audioMuted: true,
                videoMuted: true,
                selectedVideoOutput: 'default',
                selectedAudioInput: 'default',
                selectedAudioOutput: 'default'
            })
            history.push(`/meeting/${roomId}/${role}`);
        })
        .catch((error) => {
            console.log("Token API Error", error);
            alert(error);
        });

    return (
        <div>
            Loading... Please wait
        </div>
    );
};


async function getToken(userId, role, roomId) {
    console.log("in otken",userId, role, roomId);
    console.log("in token","https://qa-in.100ms.live/hmsapi/internal.app.100ms.live/api/token");
    const response = await fetch(
        "https://qa-in.100ms.live/hmsapi/internal.app.100ms.live/api/token",
      {
        method: "POST",
        //TODO remove env
        body: JSON.stringify({
          env: "qa-in",
          role: role,
          room_id: roomId,
          user_id: userId
        })
      }
    );
  
    const { token } = await response.json();
  
    return token;
  }
  