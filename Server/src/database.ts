import {createConnection} from 'typeorm';
import {AnimeRank} from './models/entities/AnimeRank';

export const connectDB = async () => {
  await createConnection().then( async connection => {
  console.log("Connection was made.")

  /**
   * Testing creating an Animerank Table
   */
  let animeranker = new AnimeRank();
  animeranker.title = "Attack on Titan";
  animeranker.rank = 1;
  await connection.manager.save(animeranker);
  console.log("First animerank saved.")

  let animeranker2 = new AnimeRank();
  animeranker2.title = "One Punch Man"
  animeranker2.rank = 22;
  await connection.manager.save(animeranker2);
  console.log("Second animerank saved.")

  let animeranker3 = new AnimeRank();
  animeranker3.title = "Promised Neverland"
  animeranker3.rank = 3;
  await connection.manager.save(animeranker3);
  console.log(" animerank saved.")

  })};