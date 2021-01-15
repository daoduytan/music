import { useMutation } from "@apollo/client";
import React, { FC, useState } from "react";
import { useAudio } from "../../context";
import { iconHeart, iconPause, iconPlay } from "../../icon";
import { SAVE_MUSIC } from "../../query";
import { Icon } from "../icon";

const Play: FC<any> = ({ link }) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const { selectLink } = useAudio();

  const playMusic = () => {
    setIsPlay(!isPlay);
    selectLink(link);
  };

  return (
    <Icon size={30} onClick={playMusic}>
      {isPlay ? iconPause : iconPlay}
    </Icon>
  );
};

const Save: FC<any> = ({ music }) => {
  const [saveMusicSearch, { loading }] = useMutation(SAVE_MUSIC);
  const saveMusic = () => {
    saveMusicSearch({
      variables: {
        author: music.author,
        title: music.title,
        avatar: music.avatar,
        link: music.link,
      },
    })
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Icon size={30} onClick={saveMusic}>
      {iconHeart}
    </Icon>
  );
};

const Song: FC<any> = ({ music }) => {
  return (
    <div className="flex py-2 cursor-pointer justify-between items-center hover:bg-green-500 hover:text-white rounded">
      <div className="flex items-center p-2">
        <img
          src={music.avatar}
          className="block rounded-lg h-16 w-16"
          alt={music.title}
        />
        <div className="ml-4">
          <div className="font-semibold">{music.title}</div>
          <span className="text-xs">{music.author}</span>
        </div>
      </div>
      <div className="flex px-2">
        <Play link={music.link} />
        <Save music={music} />
      </div>
    </div>
  );
};
export { Song };
