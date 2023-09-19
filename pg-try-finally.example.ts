import * as dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

/**
 * @throws Error : errors from pg
 */
const isAvailableDBConnection = async () => {
  let client: Client;
  try {
    //try to connect
    client = new Client({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
    });
    await client.connect();

    //query
    const res = await client.query("SELECT $1::text as message", [
      "Hello world!",
    ]);
    console.info(res.rows[0].message); // Hello world!

    //return true if query is successful
    return true;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    console.debug("try to client.end()");
    await client.end();
  }
};

isAvailableDBConnection();
