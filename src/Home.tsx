import * as React from "react";
import { History } from "history";

interface IHomeProps {
  history: History;
}

const Home: React.FC<IHomeProps> = ({ history }) => {
  history.push("signin");

  return <div>Home</div>;
};

export default Home;
