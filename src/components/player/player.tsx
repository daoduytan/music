import { useMutation } from "@apollo/client";
import { findIndex } from "lodash";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useAudio } from "../../context";
import { GET_MUSIC_SEARCH } from "../../query";
import { Play } from "./play";
import { Time } from "./time";
import { formatTime } from "./util";

interface Props {}

const HEIGHT = 100;

const Player: FC<Props> = () => {
  const audioRef = useRef<any>();
  const [duration, setDuration] = useState<number>();
  const [timeStart, setTimeStart] = useState<number>(0);
  const [timeEnd, setTimeEnd] = useState<number>(0);
  const [p, setP] = useState<any>();
  const { selectLink, audios, audio, link, selectAudio } = useAudio();
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const [musicSearchGet, { loading }] = useMutation(GET_MUSIC_SEARCH);

  useEffect(() => {
    if (link) {
      musicSearchGet({
        variables: { link },
      }).then((res) => {
        selectAudio(res.data.musicSearchGet);
      });
    }
  }, [link]);

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
      audioRef.current.play();
      prosessTime();
    } else {
      audioRef.current.pause();
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

      const index = findIndex(audios, (o) => o.link === link);
      const lengthAudios = audios.length;

      if (index + 1 === lengthAudios) {
        selectLink(audios[0].link);
      } else {
        selectLink(audios[index + 1].link);
      }

      /* setTimeout(() => { */
      /*   audioRef.current.play(); */
      /* }, 1000); */
    }
  }, [duration, timeStart, p]);

  if (!audio) return <div />;

  const width = duration ? Number((timeStart / duration).toFixed(2)) * 100 : 0;

  return (
    <div
      style={{
        background: "pink",
      }}
    >
      <div
        className="container flex w-full flex-col px-4 items-center mx-auto"
        style={{ height: HEIGHT }}
      >
        <div className="flex items-center justify-center">
          <Play onClick={togglePlayMusic} isPlay={isPlay} />
        </div>
        <div className="flex mx-auto w-full max-w-screen-sm items-center">
          <Time>
            <span>{`${formatTime(timeStart)[0]}:${
              formatTime(timeStart)[1]
            }`}</span>
          </Time>
          <div className="flex-1 mx-2 rounded h-1 bg-gray-400">
            <div
              className="rounded h-1 bg-green-500"
              style={{
                width: `${width}%`,
                transition: "all .3s",
              }}
            />
          </div>
          <Time>
            <span>{`${formatTime(timeEnd)[0]}:${formatTime(timeEnd)[1]}`}</span>
          </Time>
        </div>
      </div>
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
