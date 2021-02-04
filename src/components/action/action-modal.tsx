import { useMutation } from "@apollo/client";
import React, { FC, useRef } from "react";
import { useAudio } from "../../context";
import { iconClose, iconPlay } from "../../icon";
import { IMusic, ISong } from "../../interface";
import { REMOVE_MUSIC } from "../../query";
import { Icon } from "../icon";

interface Props {
  song: ISong | IMusic;
  toggle: () => void;
}

const ActionModal: FC<Props> = ({ song, toggle }) => {
  const { selectLink } = useAudio();
  const [removeMusic, { loading }] = useMutation(REMOVE_MUSIC);

  const onPlay = () => {
    selectLink(song.link);
    toggle();
  };

  const onRemove = () => {
    if (loading) {
      return;
    }

    removeMusic({
      variables: { id: (song as ISong)._id },
    })
      .then((data) => {
        console.log(data);
        toggle();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-gray-800 fixed bottom-0 left-0 right-0 text-white">
      <div className="flex items-center px-4 py-3 border-b border-solid border-gray-700">
        <img
          src={song.avatar}
          className="block rounded-lg h-12 w-12"
          alt={song.title}
        />
        <div className="ml-4">
          <div className="font-semibold text-sm">{song.title}</div>
          <span className="text-xs text-gray-300">{song.author}</span>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center py-1 pl-3" onClick={onPlay}>
          <Icon>{iconPlay}</Icon>
          <span className="ml-4 font-semibold text-xs">Chơi bài hát</span>
        </div>
        <div className="flex items-center py-1 pl-3" onClick={onRemove}>
          <Icon>{iconClose}</Icon>
          <span className="ml-4 font-semibold text-xs">Xóa bài hát</span>
        </div>
      </div>
    </div>
  );
};

export { ActionModal };
