import * as dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

// Because dispose and asyncDispose are so new, we need to manually 'polyfill' the existence of these functions in order for TypeScript to use them
// See: https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management
(Symbol as any).dispose ??= Symbol("Symbol.dispose");
(Symbol as any).asyncDispose ??= Symbol("Symbol.asyncDispose");

/**
 * @returns : {client: pg.Client, [Symbol.asyncDispose] : dispose function}
 */
const getDBConnection = async () => {
  //try to connect
  const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT,
  });
  await client.connect();

  //return resource as disposable
  return {
    client,
    [Symbol.asyncDispose]: async () => {
      console.debug("try to client.end()");
      await client.end();
    },
  };
};

/**
 * @throws Error : errors from pg
 */
const isAvailableDBConnection = async () => {
  // declear resource variable by `using keyword`
  await using db = await getDBConnection();
  const res = await db.client.query("SELECT $1::text as message", [
    "Hello world!",
  ]);
  console.log(res.rows[0].message);
  // ...
  // before out of scope, resource will be disposed by function of [Symbol.asyncDispose]
};

isAvailableDBConnection();
