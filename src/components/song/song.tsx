import { useMutation } from "@apollo/client";
import get from "lodash/get";
import React, { FC } from "react";
import { useAudio } from "../../context";
import { iconHeart, iconDownload } from "../../icon";
import { IMusic, ISong } from "../../interface";
import { SAVE_MUSIC, GET_MUSIC_SEARCH } from "../../query";
import { checkExpFile } from "../../utils";
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

const Download: FC<ISaveProps> = ({ music }) => {
  const [musicSearchGet, { loading }] = useMutation(GET_MUSIC_SEARCH);

  const downloadMusic = () => {
    if (loading) {
      return;
    }

    musicSearchGet({
      variables: { link: music.link, id: get(music, "_id") },
    }).then((res) => {
      window.open(res.data.musicSearchGet, "_blank");
    });
  };
  return (
    <Icon size={25} onClick={downloadMusic}>
      {iconDownload}
    </Icon>
  );
};

interface ISongProps {
  music: ISong | IMusic;
  hasSave?: boolean;
}

const Song: FC<ISongProps> = ({ music, hasSave = true }) => {
  const { selectAudio, selectSong } = useAudio();

  const playMusic = () => {
    const exp = get(music, "exp");
    const fileUrl = get(music, "fileUrl");

    selectSong(music);

    if (exp && !checkExpFile(exp) && !!fileUrl) {
      selectAudio(fileUrl);
    }
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
        <span className="mr-4">
          <Download music={music} />
        </span>

        {hasSave ? <Save music={music} /> : <Action song={music} />}
      </div>
    </div>
  );
};

export { Song };
