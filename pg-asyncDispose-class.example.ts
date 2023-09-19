import * as dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

// Because dispose and asyncDispose are so new, we need to manually 'polyfill' the existence of these functions in order for TypeScript to use them
// See: https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management
(Symbol as any).dispose ??= Symbol("Symbol.dispose");
(Symbol as any).asyncDispose ??= Symbol("Symbol.asyncDispose");

/**
 * disposable class
 */
class DBConnection implements AsyncDisposable {
  private client: Client;

  private constructor() {
    this.client = new Client({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
    });
  }

  /**
   * factory method
   * @returns : new instance of DBConnection
   */
  static async of() {
    const instance = new DBConnection();
    await instance.connect();

    return instance;
  }

  /**
   * implement by asyncDisposable interface
   */
  async [Symbol.asyncDispose]() {
    console.debug("try to client.end()");
    await this.client.end();
  }

  getClient() {
    return this.client;
  }

  private async connect() {
    await this.client.connect();
  }
}

/**
 * @throws Error : errors from pg
 */
const isAvailableDBConnection = async () => {
  // declear resource variable by `using keyword`
  await using db = await DBConnection.of();
  const client = db.getClient()
  
  const res = await client.query("SELECT $1::text as message", [
    "Hello world!",
  ]);
  
  console.log(res.rows[0].message);
  // ...
  // before out of scope, resource will be disposed by function of [Symbol.asyncDispose]
};

isAvailableDBConnection();
