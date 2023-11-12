import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'

function LeaderBoard() {
const GET_PLAYERS = gql `
query {
  players(name: "") {
    id
    name
    wins
    threes
    points
  }
}
`;
const [sortBy, setSortBy] = useState('points')
const {loading, error, data} = useQuery(GET_PLAYERS);
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

const handleSort = (e) => {
  setSortBy(e.target.value)
}
 
const players = [...data.players].sort((a, b) => {
  if (sortBy === 'points') return b.points - a.points
  else if (sortBy === 'wins') return b.wins - a.wins
  else if (sortBy === 'threes') return b.threes - a.threes

  return b.points - a.points
})



  return (
   <>
   <div>
      <select name='Sort By' id='sort' value={sortBy} onChange={handleSort}>
        <option value='Points'>Points</option>
        <option value='wins'>Wins</option>
        <option value='threes'>Threes</option>
      </select>
      </div>
    <div className='leaderboard-wrap'>
      
      <div className='leaderboard-table'>
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
          {players.map(player => (
            <tr key={player.id} className="row-heads">
              <td className='td-data'>{player.name}</td>
              <td className='td-data'>{player.wins}</td>
              <td className='td-data'>{player.threes}</td>
              <td className='td-data'>{player.points}</td>
            </tr>
             ))}
          </tbody>
        </table>
        </div>
   </div>
   </>
  )
}

export default LeaderBoard