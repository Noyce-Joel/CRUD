import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

function Table() {
  const router = useRouter();
  const nameQuery = router.query.name;
  const dateQuery = router.query.date
  
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

  const { loading: gameLoading, error: gameError, data: gameData } = useQuery(GET_GAME, {
    variables: { date: dateQuery },
  });
  const {loading: gangLoading, error: gangError, data: gangData} = useQuery(GET_GANG, {
    variables: {name: nameQuery}
  })
  const [updateScores] = useMutation(UPDATE_SCORES);
  const [wins1, setWins1] = useState(0);
  const [wins2, setWins2] = useState(0);
  const [wins3, setWins3] = useState(0);
  const [wins4, setWins4] = useState(0);
  const [threes1, setThrees1] = useState(0);
  const [threes2, setThrees2] = useState(0);
  const [threes3, setThrees3] = useState(0);
  const [threes4, setThrees4] = useState(0);
  const [points1, setPoints1] = useState(0);
  const [points2, setPoints2] = useState(0);
  const [points3, setPoints3] = useState(0);
  const [points4, setPoints4] = useState(0);

  if (gameLoading || gangLoading) return <p>Loading...</p>;
  if (gameError || gangError) return <p>Error: {gangError?.message}{gameError?.message}</p>;
  const player1 = gameData.game.players[0];
  const player2 = gameData.game.players[1];
  const player3 = gameData.game.players[2];
  const player4 = gameData.game.players[3];
  

  return (
    <div style={{width: '55vw'}}>
      <div className="leaderboard-wrap">
        <div  className='leaderboard-table'>
          <table>
            <thead>
              <tr className="row-heads">
                <td className='td-data'></td>
                <td className='td-data'>WINS</td>
                <td className='td-data'>THREES</td>
                <td className='td-data'>POINTS</td>
              </tr>
            </thead>
            <tbody>
              <tr className="row-heads" key={player1.name}>
                <td className='td-data'>{player1.name.toUpperCase()}</td>
                <td className='td-data'>
                  <input type="number" 
                  onChange={(e) => setWins1(parseInt(e.target.value, 10))}
                  />
                </td>
                <td className='td-data'>
                  <input
                    type="number"
                    onChange={(e) => setThrees1(parseInt(e.target.value, 10))}
                  />
                </td>
                <td className='td-data'>
                  <input
                    type="number"
                    onChange={(e) => setPoints1(parseInt(e.target.value, 10))}
                  />
                </td>
              </tr>
              <tr className="row-heads" key={player2.name}>
                <td className='td-data'>{player2.name.toUpperCase()}</td>
                <td className='td-data'>
                  <input
                    type="number"
                    onChange={(e) => setWins2(parseInt(e.target.value, 10))}
                  />
                </td>
                <td className='td-data'>
                  <input
                    type="number"
                    onChange={(e) => setThrees2(parseInt(e.target.value, 10))}
                  />
                </td>
                <td className='td-data'>
                  <input
                    type="number"
                    onChange={(e) => setPoints2(parseInt(e.target.value, 10))}
                  />
                </td>
              </tr>
              <tr className="row-heads"key={player3.name}>
                <td className='td-data'>{player3.name.toUpperCase()}</td>
                <td className='td-data'>
                  <input
                    type="number"
                    onChange={(e) => setWins3(parseInt(e.target.value, 10))}
                  />
                </td>
                <td className='td-data'>
                  <input
                    type="number"
                    onChange={(e) => setThrees3(parseInt(e.target.value, 10))}
                  />
                </td>
                <td className='td-data'>
                  <input
                    type="number"
                    onChange={(e) => setPoints3(parseInt(e.target.value, 10))}
                  />
                </td>
              </tr>
              {player4 && (
                <tr className="row-heads" key={player4.name}>
                  <td className='td-data'>{player4.name.toUpperCase()}</td>
                  <td className='td-data'>
                    <input
                      type="number"
                      onChange={(e) => setWins4(parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td className='td-data'>
                    <input
                      type="number"
                      onChange={(e) => setThrees4(parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td className='td-data'>
                    <input
                      type="number"
                      onChange={(e) => setPoints4(parseInt(e.target.value, 10))}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              const gang = nameQuery;
              const game = dateQuery;
              const playerScores = [
                {
                  name: player1.name,
                  wins: wins1,
                  threes: threes1,
                  points: points1,
                  id: player1.id,
                },
                {
                  name: player2.name,
                  wins: wins2,
                  threes: threes2,
                  points: points2,
                  id: player2.id,
                },
                {
                  name: player3.name,
                  wins: wins3,
                  threes: threes3,
                  points: points3,
                  id: player3.id,
                },
                player4 && {
                  name: player4.name,
                  wins: wins4,
                  threes: threes4,
                  points: points4,
                  id: player4.id,
                },
              ].filter(Boolean)

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
