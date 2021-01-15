import React, {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useAudio } from "../../context";

interface Props {
  children: ReactNode;
}

interface IState {
  loading: boolean;
  audio?: string;
  isPlay: boolean;
  duration?: number;
  timeEnd: number;
  timeStart: number;
  interval?: any;
}

interface IAction {
  type: string;
  payload?: any;
}

interface IContext {
  state: IState;
  dispatch: React.Dispatch<any>;
}

const types = {
  SELECT_AUDIO: "player/select-audio",
  TOGGLE_PLAY: "player/toggle-play",
};

const initialState: IState = {
  loading: false,
  audio: undefined,
  duration: 0,
  timeEnd: 0,
  timeStart: 0,
  isPlay: false,
  interval: undefined,
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case types.SELECT_AUDIO:
      return {
        ...state,
        audio: action.payload,
      };
    case types.TOGGLE_PLAY:
      return {
        ...state,
        isPlay: action.payload,
      };
    default:
      return state;
  }
};

const initialContext = {
  state: initialState,
  dispatch: () => {},
};

const PlayerContext = React.createContext<IContext>(initialContext);

const ProviderPlayer: FC<Props> = ({ children }) => {
  const { audio } = useAudio();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: types.SELECT_AUDIO,
      payload: audio,
    });
  }, [audio]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

function usePlayer() {
  const { state, dispatch } = useContext(PlayerContext);

  function togglePlay(value: boolean) {
    dispatch({
      type: types.TOGGLE_PLAY,
      payload: value,
    });
  }
  return {
    ...state,
    togglePlay,
  };
}

export { ProviderPlayer, usePlayer };
