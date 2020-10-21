import {createConnection} from 'typeorm';
import {AnimeRank} from './entities/AnimeRank';

export const connectDB = async () => {
  console.log("connecting to db")
  const connection = await createConnection()
  return connection
}//.then( async connection => {

  // //Methods for Entity Manager: https://github.com/typeorm/typeorm/blob/master/docs/entity-manager-api.md
  // // This is using connection.manager.{methodName}

  // /**
  //  * Testing creating an Animerank elements
  //  */
  // let animeranker = new AnimeRank();
  // animeranker.id = 1;
  // animeranker.title = "Attack on Titan";
  // animeranker.rank = 1314;
  // await connection.manager.save(animeranker);
  // console.log("First animerank saved.")

  // let animeranker2 = new AnimeRank();
  // animeranker2.id = 2;
  // animeranker2.title = "One Punch Man"
  // animeranker2.rank = 22214;
  // await connection.manager.save(animeranker2);
  // console.log("Second animerank saved.")

  // let animeranker3 = new AnimeRank();
  // animeranker3.id = 3;
  // animeranker3.title = "Promised Neverland"
  // animeranker3.rank = 2143;
  // await connection.manager.save(animeranker3);
  // console.log(" animerank saved.");

  // /**
  //  * Testing finding an element
  //  */
  //  let savedAnime = await connection.manager.find(AnimeRank, { title: "Promised Neverland"});
  //  console.log(savedAnime);
  // })};