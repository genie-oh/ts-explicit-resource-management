# Overview

Describe `using` keyword and `asyncDispose` for explicit-resource-management on typescript 5.2

Example files are on below.

- `pg-try-finally.example.ts`
  - example of traditional-resource-management on try-catch-finally
- `pg-asyncDispose-func.example.ts`
  - example of `using` explicit-resource-management with `asyncDispose` composed in function
- `pg-asyncDispose-class.example.ts`
  - example of `using` explicit-resource-management with `asyncDispose` composed in class

# How to use

- check `package.json` for you to see what packages need to install. `typescript 5.2` will be installed if you run `npm i`
- check `tsconfig.json` for you to see how to config to use `using keyword`

```sh
# set dotenv file for postgresql
mv .env_sample .env

# run docker-compose for postgresql
docker-compose up -d

# npm
npm i
npm run build

# run compiled files with node
node ./dist/pg-try-finally.example.js
node ./dist/pg-asyncDispose-func.example.js
node ./dist/pg-asyncDispose-class.example.js

# run with ts-node
npx ts-node pg-try-finally.example.ts
npx ts-node pg-asyncDispose-func.example.ts
npx ts-node pg-asyncDispose-class.example.ts
```

# References

[ECMAScript:proposal-explicit-resource-management](https://github.com/tc39/proposal-explicit-resource-management#status)
[Announcing TypeScript 5.2: using Declarations and Explicit Resource Management](https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management)
[Resource management in TypeScript with the using keyword](https://blog.logrocket.com/resource-management-typescript-using-keyword/)
