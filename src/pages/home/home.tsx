import { useQuery } from "@apollo/client";
import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Icon, Loading, Song } from "../../components";
import { useAudio } from "../../context";
import { iconSearch } from "../../icon";
import { ISong } from "../../interface";
import { MUSICS } from "../../query";

interface Props {}

export const Home: FC<Props> = () => {
  const history = useHistory();
  const { audios, addAudio } = useAudio();
  const { loading, data, error } = useQuery(MUSICS);

  const gotoSearch = () => {
    history.push("/search");
  };

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
    <div className="container m-auto">
      <div className="m-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-3xl">Danh sách</div>
          <Icon onClick={gotoSearch} size={30}>
            {iconSearch}
          </Icon>
        </div>
      </div>
      <div className="m-2 justify-between">
        {audios.map((music: ISong) => {
          return <Song key={music._id} hasSave={false} music={music} />;
        })}
      </div>
    </div>
  );
};

export default Home;
