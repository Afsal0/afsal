import {
  Header,
  ParticipantList,
  useHMSStore,
  VolumeIcon,
  Text,
  selectDominantSpeaker,
} from "@100mslive/hms-video-react";
import React from "react";

const SpeakerTag = () => {
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  return dominantSpeaker && dominantSpeaker.name ? (
    <div className="self-center focus:outline-none text-lg flex items-center">
      <div className="inline-block">
        <VolumeIcon />
      </div>
      {/* TODO figure out why xs:hidden is needed */}
      <div className="md:pl-1 xs:hidden md:inline-block">
        <Text variant="body" size="md">
          {dominantSpeaker.name}
        </Text>
      </div>
    </div>
  ) : (
    <></>
  );
};

export const ConferenceHeader = ({ onParticipantListOpen }) => {
  return (
    <>
      <Header
        centerComponents={[<SpeakerTag key={0} />]}
        rightComponents={[
          <ParticipantList key={0} onToggle={onParticipantListOpen} />,
        ]}
        classes={{ root: "h-full" }}
      />
    </>
  );
};
