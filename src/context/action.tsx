import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

interface IState {
  visible: boolean;
}

interface IAction {
  type: string;
  payload?: any;
}

const typesAction = {
  TOGGLE: "action/toggle",
};

const initialState = {
  visible: false,
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case typesAction.TOGGLE:
      return { ...state, visible: !state.visible };
    default:
      return state;
  }
};

const initialContext = {
  state: initialState,
  toggleAction: () => {},
};

interface IContext {
  state: IState;
  toggleAction: React.Dispatch<any>;
}

const Context = createContext<IContext>(initialContext);

interface Props {
  children: ReactNode;
}

const ProviderAction: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleAction = useCallback(() => {
    dispatch({ type: typesAction.TOGGLE });
  }, []);

  const value = useMemo(() => ({ state, toggleAction }), [state, toggleAction]);

  return (
    <Context.Provider value={value}>
      {children}
      {state.visible && <div>dadas</div>}
    </Context.Provider>
  );
};

const useAction = () => {
  const { state } = useContext(Context);

  return {
    ...state,
  };
};

export { ProviderAction, typesAction, useAction };
