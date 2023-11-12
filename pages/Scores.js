import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

function Scores() {
  const GET_PLAYERS = gql`
    query {
      players(name: "") {
        name
        wins
        threes
        points
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PLAYERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const players = data.players;

  return (
    <>
      
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr className="row-heads">
              <td>PLAYER</td>
              <td>WINS</td>
              <td>THREES</td>
              <td>POINTS</td>
            </tr>
          </thead>
          <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="row-heads">{player.name}</td>
              <td value={player.wins}>{player.wins}</td>
              <td value={player.threes}>{player.threes}</td>
              <td value={player.points}>{player.points}</td>
            </tr>
          ))}
          </tbody>
        </table>

        <div>
          
            <a href="/Game">EDIT SCORES</a>
         
        </div>
      </div>
    </>
  );
}

export default Scores;
