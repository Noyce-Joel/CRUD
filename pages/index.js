import React from "react";
import Nav from "../components/Nav";
import CurrentGames from "../components/CurrentGames"
import LeaderBoard from "../components/LeaderBoard";

function index() {
  return (
    <>
      <div className="homepage-wrap">
        <LeaderBoard />
        <CurrentGames />
      </div>
      <div className="nav">
        <a href="/NewGangComp">
          <button>NEW GANG</button>
        </a>
      </div>
    </>
  );
}

export default index;
