import { useMutation } from "@apollo/client";
import { debounce } from "lodash";
import { FC } from "react";
import { Song } from "../../components";
import { useAudio } from "../../context";
import { SEARCH_MUSIC } from "../../query";

interface IMusic {
  author: string;
  title: string;
  avatar: string;
  link: string;
}

interface Props {}

const SearchMusic: FC<Props> = () => {
  const { audios, addAudio } = useAudio();
  const [musicSearch, { loading }] = useMutation(SEARCH_MUSIC);

  const onChangeText = debounce((text: string) => {
    musicSearch({
      variables: {
        text,
      },
    }).then((res) => {
      addAudio(res.data.musicSearch);
    });
  }, 500);

  const renderContent = () => {
    if (loading) {
      return <div>Loading</div>;
    }

    if (audios.length === 0) {
      return <div>No data</div>;
    }

    return audios.map((music: IMusic, index: number) => {
      return <Song key={index} music={music} />;
    });
  };

  return (
    <div className="w-9/12 mx-auto">
      <input
        className="border my-6 rounded p-2 block w-full border-gray-200"
        onChange={(e: any) => onChangeText(e.target.value)}
      />

      <div>{renderContent()}</div>
    </div>
  );
};

export default SearchMusic;
