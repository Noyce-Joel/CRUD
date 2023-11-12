import { gql, useQuery, useMutation } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";

function Gang() {
  const router = useRouter();
  const selectedGang = router.query.name;

  console.log(selectedGang);
  const GET_GANG = gql`
    query GetGang($name: String!) {
      gang(name: $name) {
        name
        players {
          id
          name
          wins
          threes
          points
        }
      }
    }
  `;

  const NEW_GAME = gql`
    mutation NewGame($gameDetails: GameInput!) {
      newGame(gameDetails: $gameDetails) {
        date
        players {
          name
          wins
          threes
          points
        }
      }
    }
  `;
  const [newGame] = useMutation(NEW_GAME);
  const { data, loading, error } = useQuery(GET_GANG, {
    variables: { name: selectedGang },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const gang = data.gang;
  const gangName = gang.name;
  const players = data.gang.players;

  const handleNewGame = async () => {
    const players = gang.players.map((player) => ({
      id: player.id,
      name: player.name,
      wins: player.wins,
      threes: player.threes,
      points: player.points,
    }));

    const date = new Date().toISOString();

    const gameDetails = {
      gang: gangName,
      date: date,
      players: players,
    };

    try {
      const { data } = await newGame({
        variables: {
          gameDetails: gameDetails,
        },
      });

      router.push(`/Game?date=${date}&name=${gangName}`);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div className="curr-gang-wrap">
      <div className="curr-gang">
        <table className="gang-card">
          <thead>
            <tr className="row-heads">
              <td className="td-data">{gang.name}</td>
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
      </div>
      <div className="nav">
        <a>
          <button onClick={handleNewGame}>NEW GAME</button>
        </a>
      </div>
    </div>
  );
}

export default Gang;
