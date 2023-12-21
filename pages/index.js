import React from "react";
import Nav from "../components/Nav";
import CurrentGames from "../components/CurrentGames"
import LeaderBoard from "../components/LeaderBoard";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
function index() {
  const GET_PLAYERS_AND_GANGS = gql`
    query {
      gangs {
        name
        players {
          id
          name
          wins
          threes
          wins
          points
        }
      }
      players(name: "") {
        id
        name
        wins
        threes
        points
      }
    }
  `;
  

  const { loading, error, data } = useQuery(GET_PLAYERS_AND_GANGS, {
    fetchPolicy: "network-only",
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div className="homepage-wrap">
        <LeaderBoard players={data.players}/>
        <CurrentGames gangs={data.gangs}/>
      </div>
      <div className="nav">
        <Link href='/NewGang'>
          <button>NEW GANG</button>
          </Link>
      </div>
    </>
  );
}

export default index;
