import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Link from "next/link";
function CurrentGangs({gangs}) {
 

  return (
    <div className="gangs-grid-wrap">
    <div className="gangs-grid">
      {gangs.map((gang, idx) => (
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
