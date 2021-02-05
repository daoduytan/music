import { useMutation } from "@apollo/client";
import { findIndex, get } from "lodash";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useAudio } from "../../context";
import { iconDown } from "../../icon";
import { IMusic, ISong } from "../../interface";
import { GET_MUSIC_SEARCH } from "../../query";
import { checkExpFile } from "../../utils";
import { Icon } from "../icon";
import { Play } from "./play";
import { Time } from "./time";
import { formatTime } from "./util";

interface Props {}

const HEIGHT = 80;

interface PlayerProps {
  toggleShow: () => void;
  song: ISong | IMusic;
  isPlay: boolean;
  togglePlayMusic: () => void;
}

const SmallPlayer: FC<PlayerProps> = ({
  toggleShow,
  togglePlayMusic,
  song,
  isPlay,
}) => {
  const height = HEIGHT;
  return (
    <div
      className="container flex w-full px-4 items-center mx-auto"
      style={{ height, color: "#fff" }}
      onClick={toggleShow}
    >
      <img
        src={song.avatar}
        className="block rounded-lg h-12 w-12"
        alt={song.title}
      />
      <div style={{ flex: 1 }}>
        <div className="ml-4">
          <div className="font-semibold text-sm">{song.title}</div>
          <span className="text-xs">{song.author}</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Play onClick={togglePlayMusic} isPlay={isPlay} />
      </div>
    </div>
  );
};

interface LargePlayerProps extends PlayerProps {
  timeStart: number;
  timeEnd: number;
  duration?: number;
}

const LargePlayer: FC<LargePlayerProps> = ({
  toggleShow,
  togglePlayMusic,
  song,
  isPlay,
  timeStart,
  timeEnd,
  duration,
}) => {
  const height = "100vh";
  const width = duration ? Number((timeStart / duration).toFixed(2)) * 100 : 0;
  return (
    <div
      className="container flex w-full flex-col"
      style={{ height, color: "#fff" }}
    >
      <div className="p-4 bg-gray-600">
        <Icon onClick={toggleShow}>{iconDown}</Icon>
      </div>

      <div
        className="p-4 flex flex-col items-center justify-center bg-gray-800"
        style={{
          flex: 1,
        }}
      >
        <img
          src={song.avatar}
          className="block rounded-lg h-40 w-40 mb-7"
          alt={song.title}
        />

        <div className="text-center">
          <div className="font-semibold text-lg">{song.title}</div>
          <span className="text-xs">{song.author}</span>
        </div>

        <div className="flex  w-full max-w-screen-sm items-center my-5">
          <Time>
            <span className="text-sm">{`${formatTime(timeStart)[0]}:${
              formatTime(timeStart)[1]
            }`}</span>
          </Time>
          <div className="flex-1 mx-1 rounded h-1 bg-gray-400">
            <div
              className="rounded h-1 bg-green-500"
              style={{
                width: `${width}%`,
                transition: "all .3s",
              }}
            />
          </div>
          <Time>
            <span className="text-sm">{`${formatTime(timeEnd)[0]}:${
              formatTime(timeEnd)[1]
            }`}</span>
          </Time>
        </div>

        <div className="flex items-center justify-center ">
          <Play onClick={togglePlayMusic} isPlay={isPlay} />
        </div>
      </div>
    </div>
  );
};

const Player: FC<Props> = () => {
  const [show, setShow] = useState<boolean>(true);
  const audioRef = useRef<any>();
  const [duration, setDuration] = useState<number>();
  const [timeStart, setTimeStart] = useState<number>(0);
  const [timeEnd, setTimeEnd] = useState<number>(0);
  const [p, setP] = useState<any>();
  const { song, selectSong, audios, audio, selectAudio } = useAudio();
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const [musicSearchGet] = useMutation(GET_MUSIC_SEARCH);

  const toggleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (song) {
      const exp = get(song, "exp");

      if (song.link && ((exp && checkExpFile(exp)) || !exp)) {
        musicSearchGet({
          variables: { link: song.link, id: get(song, "_id") },
        }).then((res) => {
          selectAudio(res.data.musicSearchGet);
        });
      }
    }
  }, [song]);

  const onLoad = useCallback(
    (e: any) => {
      const time = Number(e.target.duration.toFixed(2));
      setTimeEnd(time);
      setDuration(time);
    },
    [audio]
  );

  let m = timeStart;

  const togglePlayMusic = () => {
    const prosessTime = () => {
      const t = setInterval(() => {
        m = m + 1;
        setTimeStart(m);
      }, 1000);

      setP(t);
    };

    if (!isPlay) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      prosessTime();
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      clearInterval(p);
    }

    setIsPlay(!isPlay);
  };

  useEffect(() => {
    setTimeStart(0);
    clearInterval(p);

    if (audio) {
      togglePlayMusic();
      setIsPlay(true);
      if (audioRef.current) {
        setTimeout(() => {
          audioRef.current.play();
        }, 1000);
      }
    }
  }, [audio]);

  // end song
  useEffect(() => {
    if (duration && duration <= timeStart) {
      setTimeStart(0);
      clearInterval(p);
      setIsPlay(!isPlay);

      const index = findIndex(audios, (o) => o.link === get(song, "link"));
      const lengthAudios = audios.length;

      if (index + 1 === lengthAudios) {
        selectSong(audios[0]);
      } else {
        selectSong(audios[index + 1]);
      }
    }
  }, [duration, timeStart, p]);

  if (!song) return <div />;

  return (
    <div className="bg-gray-800">
      {show ? (
        <SmallPlayer
          song={song}
          toggleShow={toggleShow}
          togglePlayMusic={togglePlayMusic}
          isPlay={isPlay}
        />
      ) : (
        <LargePlayer
          song={song}
          toggleShow={toggleShow}
          togglePlayMusic={togglePlayMusic}
          isPlay={isPlay}
          timeStart={timeStart}
          timeEnd={timeEnd}
          duration={duration}
        />
      )}
      <audio
        style={{ display: "none" }}
        ref={audioRef}
        onLoadedMetadata={onLoad}
        src={audio}
        controls
        autoPlay={false}
      ></audio>
    </div>
  );
};

export { Player };
