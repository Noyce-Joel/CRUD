import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Link from "next/link";
function CurrentGangs() {
  const GET_GANGS = gql`
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
    }
  `;

  const { data, loading, error } = useQuery(GET_GANGS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);
  return (
    <div className="gangs-grid-wrap">
    <div className="gangs-grid">
      {data.gangs.map((gang, idx) => (
        <Link
          key={idx}
          href={{
            pathname: "/Gang",
            query: { name: gang.name },
          }}
          passHref
          
        >
          <table className="gang-card" >
            <thead>
              <tr className="row-heads">
                <td className="td-data"></td>
                <td className="td-data">WINS</td>
                <td className="td-data">THREES</td>
                <td className="td-data">POINTS</td>
              </tr>
            </thead>

            <tbody>
              {gang.players.map((player) => (
                <tr key={player.id} className="row-heads">
                  <td className="td-data">{player.name}</td>
                  <td className="td-data">{player.wins}</td>
                  <td className="td-data">{player.threes}</td>
                  <td className="td-data">{player.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Link>
      ))}
    </div>
    </div>
  );
}

export default CurrentGangs;
