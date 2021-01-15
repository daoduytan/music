import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

interface IAction {
  type: string;
  payload?: any;
}

interface IState {
  audios: any[];
  audio?: string;
  link?: string;
  loading: boolean;
}

interface IContext {
  state: IState;
  dispatch: React.Dispatch<any>;
}

const initialState = {
  audios: [],
  audio: undefined,
  link: undefined,
  loading: false,
};

const types = {
  ADD_AUDIOS: "add/audios",
  SELECT_AUDIO: "audio/select-audio",
  SELECT_LINK: "audio/select_link",
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
        link: action.payload,
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

  const selectLink = (link: string) => {
    dispatch({
      type: types.SELECT_LINK,
      payload: link,
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
  };
};

export { ProviderAudioContext, useAudio };
