import { useMutation } from "@apollo/client";
import React, { FC } from "react";
import { useAudio } from "../../context";
import { iconHeart } from "../../icon";
import { IMusic, ISong } from "../../interface";
import { SAVE_MUSIC } from "../../query";
import { Action } from "../action";
import { Icon } from "../icon";

interface ISaveProps {
  music: IMusic | ISong;
}

const Save: FC<ISaveProps> = ({ music }) => {
  const [saveMusicSearch, { loading }] = useMutation(SAVE_MUSIC);
  const saveMusic = () => {
    if (loading) {
      return;
    }

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
    <Icon size={25} onClick={saveMusic}>
      {iconHeart}
    </Icon>
  );
};

interface ISongProps {
  music: ISong | IMusic;
  hasSave?: boolean;
}

const Song: FC<ISongProps> = ({ music, hasSave = true }) => {
  const { selectLink } = useAudio();
  const playMusic = () => {
    selectLink(music.link);
  };

  return (
    <div className="flex cursor-pointer justify-between items-center hover:bg-green-500 hover:text-white rounded">
      <div className="flex items-center p-2">
        <img
          onClick={playMusic}
          src={music.avatar}
          className="block rounded-lg h-14 w-14"
          alt={music.title}
        />
        <div className="ml-4">
          <div className="font-semibold text-sm">{music.title}</div>
          <span className="text-xs">{music.author}</span>
        </div>
      </div>
      <div className="flex px-2">
        {hasSave ? <Save music={music} /> : <Action song={music} />}
      </div>
    </div>
  );
};

export { Song };
