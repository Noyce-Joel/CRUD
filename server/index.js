'use server'

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import 'dotenv/config'
import mongoose from "mongoose";

// const key = process.env.local.MONGODB_URI

async function connect(){
  try{
  await mongoose.connect('mongodb+srv://noycejoel:Kierkegaard12@big2.d9b8whz.mongodb.net/?retryWrites=true&w=majority');
  } catch (error) {
    console.error
  }
};

connect();

const Schema = mongoose.Schema;
const Player = new Schema({
  name: String,
  wins: Number,
  threes: Number,
  points: Number,
});

const Game = new Schema({
  gang: String,
  date: String,
  players: [Player],
});

const Gang = new Schema({
  name: String,
  players: [Player],
  games: [Game],
});

const playerModel = mongoose.model("playerModel", Player);
const gameModel = mongoose.model("gameModel", Game);
const gangModel = mongoose.model("gangModel", Gang);
//

const typeDefs = `#graphql
  type Player {
    id: ID
    name: String
    wins: Int
    threes: Int
    points: Int
  }

type Game {
  id: ID
  gang: String
  date: String!
  players: [Player]!
}

type Gang {
    name: String
    players: [Player] 
    games: [Game]
  }

  type Query {
   players(name: String!): [Player]
   player(name: String!): Player
   games(id: ID!): [Game]
   game(date: String!): Game
   gangs: [Gang]
   gang(name: String!) : Gang
   
  }

  type Mutation {
  updatePlayerScores(playerScores: [PlayerScoreInput]!): [Player]
  newGang(newPlayers: [NewPlayerInput]!, gangName: String!): Gang
  newGame(gameDetails: GameInput!): Game
}

  input NewPlayerInput {
    id: ID
    name: String!
    wins: Int
    threes: Int
    points: Int

  }

  input PlayerScoreInput {
  name: String
  wins: Int
  threes: Int
  points: Int
  id: ID!
}

input GameInput {
  id: ID
  gang: String
  date: String!
  players: [NewPlayerInput]!
}


  
`;

const resolvers = {
  Query: {
    player: async (parent, args) => {
      try {
        const player = playerModel.findOne({ name: args.name });
        return player;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
    players: async (parent, args) => {
      try {
        const players = playerModel.find({});
        return players;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
    gangs: async (parent, args) => {
      try {
        const gangs = gangModel.find({});
        return gangs;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
    gang: async (parent, args) => {
      try {
        const gang = gangModel.findOne({ name: args.name }).populate("players");
        return gang;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
    game: async (parent, args) => {
      try {
        const game = gameModel.findOne({ date: args.date });
        return game;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
  },

  Mutation: {
    newGang: async (_, args) => {
      try {
        const { newPlayers, gangName } = args;

        const createdPlayers = await Promise.all(
          newPlayers.map(async (player) => {
            const { name, wins, threes, points } = player;
            return await playerModel.create({
              name,
              wins,
              threes,
              points,
            });
          })
        );

        const gang = await gangModel.create({
          name: gangName,
          players: createdPlayers,
        });

        return gang;
      } catch (error) {
        throw new Error(`Error adding players: ${error.message}`);
      }
    },

    newGame: async (_, args) => {
      try {
        const { gameDetails } = args;
        const gang = await gangModel.findOne({ name: gameDetails.gang });

        const players = gameDetails.players;
        const newGame = await gameModel.create({
          gang: gang,
          date: gameDetails.date,
          players: players,
        });

        gang.games.push(newGame);

        await gang.save();

        return newGame;
      } catch (error) {
        throw new Error(`Error creating game: ${error.message}`);
      }
    },
    updatePlayerScores: async (_, args) => {
      try {
        const { playerScores, game, gang } = args;
        for (const playerScore of playerScores) {
          const { id, wins, threes, points } = playerScore;
          const player = await playerModel.findById(id);
          player.wins += wins;
          player.threes += threes;
          player.points += points;
          await player.save();
        }
    
        
    
        const updatedGame = await gameModel.findOne({ game });
        for (const playerScore of playerScores) {
          const { id, wins, threes, points } = playerScore;
          const player = updatedGame.players.find(player => player.id === id);
          if (player) {
            player.wins += wins;
            player.threes += threes;
            player.points += points;
          }
        }
        await updatedGame.save();
    
       
    
        const updatedGang = await gangModel.findOne({ gang });
        for (const playerScore of playerScores) {
          const { id, wins, threes, points } = playerScore;
          const player = updatedGang.players.find(player => player.id === id);
          if (player) {
            player.wins += wins;
            player.threes += threes;
            player.points += points;
          }
        }
        await updatedGang.save();
    
        
      } catch (error) {
        console.error(`Error updating player scores: ${error.message}`);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
