import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

function Table() {
  const router = useRouter();
  const nameQuery = router.query.name;
  const dateQuery = router.query.date;

  const GET_GAME = gql`
    query GetGame($date: String!) {
      game(date: $date) {
        date
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

  const UPDATE_SCORES = gql`
    mutation UpdatePlayerScores($playerScores: [PlayerScoreInput]!) {
      updatePlayerScores(playerScores: $playerScores) {
        name
        wins
        threes
        points
        id
      }
    }
  `;

  const {
    loading: gameLoading,
    error: gameError,
    data: gameData,
  } = useQuery(GET_GAME, {
    variables: { date: dateQuery },
  });
  const {
    loading: gangLoading,
    error: gangError,
    data: gangData,
  } = useQuery(GET_GANG, {
    variables: { name: nameQuery },
  });
  const [updateScores] = useMutation(UPDATE_SCORES);
  const [players, setPlayers] = useState([
    { wins: 0, threes: 0, points: 0 },
    { wins: 0, threes: 0, points: 0 },
    { wins: 0, threes: 0, points: 0 },
    { wins: 0, threes: 0, points: 0 },
  ]);

  if (gameLoading || gangLoading) return <p>Loading...</p>;
  if (gameError || gangError)
    return (
      <p>
        Error: {gangError?.message}
        {gameError?.message}
      </p>
    );

  const handleInputChange = (index, field) => (e) => {
    const newPlayers = [...players];
    newPlayers[index][field] = parseInt(e.target.value, 10);
    setPlayers(newPlayers);
  };

  return (
    <div style={{ width: "55vw" }}>
      <div className="leaderboard-wrap">
        <div className="leaderboard-table">
          <table>
            <thead>
              <tr className="row-heads">
                <td className="td-data"></td>
                <td className="td-data">WINS</td>
                <td className="td-data">THREES</td>
                <td className="td-data">POINTS</td>
              </tr>
            </thead>
            <tbody>
              {gameData.game.players.map((player, index) => (
                <tr className="row-heads" key={player.name}>
                  <td className="td-data">{player.name.toUpperCase()}</td>
                  <td className="td-data">
                    <input
                      type="number"
                      onChange={handleInputChange(index, "wins")}
                    />
                  </td>
                  <td className="td-data">
                    <input
                      type="number"
                      onChange={handleInputChange(index, "threes")}
                    />
                  </td>
                  <td className="td-data">
                    <input
                      type="number"
                      onChange={handleInputChange(index, "points")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              const gang = nameQuery;
              const game = dateQuery;
              const playerScores = players.map((player, index) => ({
                name: gameData.game.players[index].name,
                wins: player.wins,
                threes: player.threes,
                points: player.points,
                id: gameData.game.players[index].id,
              }));

              try {
                const result = await updateScores({
                  variables: {
                    gang: gang,
                    game: game,
                    playerScores: playerScores,
                  },
                });

                window.location.href = "/";
              } catch (error) {
                console.error("Error updating scores:", error);
              }
            }}
          >
            SUBMIT FINAL SCORES
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
