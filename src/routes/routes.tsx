import { FC, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Loading, NotFound, Player } from "../components";

const Signin = lazy(() => import("../pages/signin/signin"));
const Home = lazy(() => import("../pages/home/home"));
const SearchMusic = lazy(() => import("../pages/search-music/search-music"));

interface Props {}

const Routes: FC<Props> = () => {
  return (
    <div className="flex flex-col h-screen" style={{ overflow: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Router>
          <Suspense fallback={<Loading full />}>
            <Switch>
              <Route component={Home} path="/" exact />
              <Route component={SearchMusic} path="/search" exact />
              <Route component={Signin} path="/signin" />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </div>
      <Player />
    </div>
  );
};

export { Routes };
