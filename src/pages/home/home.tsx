import { useQuery } from "@apollo/client";
import { FC, useEffect } from "react";
import { Song } from "../../components";
import { useAudio } from "../../context";
import { ISong } from "../../interface";
import { MUSICS } from "../../query";

interface Props {}

export const Home: FC<Props> = () => {
  const { audios, addAudio } = useAudio();
  const { loading, data, error } = useQuery(MUSICS);
  console.log("loading", loading, data, error);

  useEffect(() => {
    if (data) {
      addAudio(data.getMusicList);
    }
  }, [data]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {audios.map((music: ISong) => {
        return <Song key={music._id} music={music} />;
      })}
    </div>
  );
};

export default Home;
