import { useMutation } from "@apollo/client";
import { debounce } from "lodash";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { Icon, Song } from "../../components";
import { useAudio } from "../../context";
import { iconLeft } from "../../icon";
import { SEARCH_MUSIC } from "../../query";

interface IMusic {
  author: string;
  title: string;
  avatar: string;
  link: string;
}

interface Props {}

const SearchMusic: FC<Props> = () => {
  const history = useHistory();
  const { audios, addAudio } = useAudio();
  const [musicSearch, { loading }] = useMutation(SEARCH_MUSIC);

  const gotoHome = () => {
    history.push("/");
  };

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
    <div className="container m-auto">
      <div className="m-2">
        <div className="mt-4 flex justify-between items-center">
          <Icon onClick={gotoHome}>{iconLeft}</Icon>
          <div className="text-lg font-bold">Tìm kiếm</div>
          <div style={{ opacity: 0 }}>
            <Icon>{iconLeft}</Icon>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div style={{ flex: 1 }}>
            <input
              placeholder="Tìm kiếm bài hát theo tên"
              className="border my-6 rounded p-2 block w-full border-gray-200"
              onChange={(e: any) => onChangeText(e.target.value)}
            />
          </div>
        </div>

        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default SearchMusic;
