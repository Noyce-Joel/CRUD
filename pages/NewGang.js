import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

function NewGang() {

  const NEW_GANG = gql`
    mutation createGang($gangName: String!, $newPlayers: [NewPlayerInput]!) {
      newGang(newPlayers: $newPlayers, gangName: $gangName) {
        name
        players {
          name
          wins
          threes
          points
        }
      }
    }
  `;

  const [createGang] = useMutation(NEW_GANG);
  const router = useRouter();

  const [newPlayer1, setNewPlayer1] = useState("");
  const [newPlayer2, setNewPlayer2] = useState("");
  const [newPlayer3, setNewPlayer3] = useState("");
  const [newPlayer4, setNewPlayer4] = useState("");
  const [newGangName, setNewGangName] = useState("");

  const handleCreateGang = async () => {
    const newGangInput = {
      gangName: newGangName,
      newPlayers: [
        {
          name: newPlayer1,
          wins: 0,
          threes: 0,
          points: 0,
        },
        {
          name: newPlayer2,
          wins: 0,
          threes: 0,
          points: 0,
        },
        {
          name: newPlayer3,
          wins: 0,
          threes: 0,
          points: 0,
        },
        newPlayer4
          ? {
              name: newPlayer4,
              wins: 0,
              threes: 0,
              points: 0,
            }
          : null,
      ].filter(Boolean),
    };

    try {
      const gang = await createGang({
        variables: {
          gangName: newGangInput.gangName,
          newPlayers: newGangInput.newPlayers,
        },
      });

      router.push(`/Gang?name=${newGangName}`);
      

    } catch (error) {
      console.error("Error creating gang:", error);
    }
  };

  return (
    <div className="add-player-wrap">
      <div className="nav">
        <a href="/CreateProfile">
          <button>CREATE PLAYER</button>
        </a>
      </div>
      <div className="player-box">
        <input
          type="text"
          placeholder="Gang Name"
          onChange={(e) => setNewGangName(e.target.value)}
        />
      </div>
      <div className="player-box">
        <input
          type="text"
          placeholder="Player Name"
          onChange={(e) => setNewPlayer1(e.target.value)}
        />
      </div>
      <div className="player-box">
        <input
          type="text"
          placeholder="Player Name"
          onChange={(e) => setNewPlayer2(e.target.value)}
        />
      </div>
      <div className="player-box">
        <input
          type="text"
          placeholder="Player Name"
          onChange={(e) => setNewPlayer3(e.target.value)}
        />
      </div>
      <div className="player-box">
        <input
          type="text"
          placeholder="Player Name"
          onChange={(e) => setNewPlayer4(e.target.value)}
        />
      </div>
      <button onClick={handleCreateGang}>ADD PLAYERS</button>
    </div>
  );
}

export default NewGang;
