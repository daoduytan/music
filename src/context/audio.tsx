import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { IMusic, ISong } from "../interface";

interface IAction {
  type: string;
  payload?: any;
}

interface IState {
  audios: any[];
  audio?: string;
  link?: string;
  _id?: string;
  exp: number;
  loading: boolean;
  song?: IMusic | ISong;
}

interface IContext {
  state: IState;
  dispatch: React.Dispatch<any>;
}

const initialState = {
  audios: [],
  audio: undefined,
  link: undefined,
  _id: undefined,
  exp: 0,
  loading: false,
  song: undefined,
};

const types = {
  ADD_AUDIOS: "add/audios",
  SELECT_AUDIO: "audio/select-audio",
  SELECT_LINK: "audio/select_link",
  SELECT_SONG: "audio/select_song",
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case types.ADD_AUDIOS:
      return {
        ...state,
        audios: action.payload,
      };

    case types.SELECT_LINK:
      return {
        ...state,
        ...action.payload,
      };

    case types.SELECT_SONG:
      return {
        ...state,
        song: action.payload,
      };

    case types.SELECT_AUDIO:
      return {
        ...state,
        audio: action.payload,
      };

    default:
      return state;
  }
};

const initialContext = {
  state: initialState,
  dispatch: () => {},
};
const AudioContext = createContext<IContext>(initialContext);

interface Props {
  children: ReactNode;
}
const ProviderAudioContext: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

const useAudio = () => {
  const { state, dispatch } = useContext(AudioContext);

  const addAudio = (audios: any[]) => {
    dispatch({
      type: types.ADD_AUDIOS,
      payload: audios,
    });
  };

  const selectLink = (payload: {
    link: string;
    _id?: string;
    exp?: number;
  }) => {
    dispatch({
      type: types.SELECT_LINK,
      payload,
    });
  };

  const selectSong = (song: ISong | IMusic) => {
    dispatch({
      type: types.SELECT_SONG,
      payload: song,
    });
  };

  const selectAudio = (audio: string) => {
    dispatch({
      type: types.SELECT_AUDIO,
      payload: audio,
    });
  };

  return {
    ...state,
    selectAudio,
    addAudio,
    selectLink,
    selectSong,
  };
};

export { ProviderAudioContext, useAudio };
