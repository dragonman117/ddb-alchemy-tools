# D&D Beyond Alchemy Tools
### v. 0.5.0
----
## Description
This is a repo to provide tools to help convert D&D Beyond content to Alchemy's Json format. At the moment it only provides
support for downloading a specific monster (one url at a time) and is under development (missing several features). 

It requires a D&D Beyond account, and a valid Cobalt token.

To get a valid Cobalt token follow these steps:
1. Login to D&D Beyond
2. Open the developer console (F12)
3. Go to the Application tab
4. In the left sidebar, go to Storage > Cookies
5. Find the cookie named `CobaltSession` and copy the value

Or for an easier way to get the token you can use [this](https://github.com/MrPrimate/ddb-importer-chrome) tool provided by Mr. Primate. 

## Running
To run ensure you have the latest LTS version of node installed and run the following:
```bash
yarn install
yarn start
```

## Thanks
Special thanks to [Mr. Primate](https://github.com/MrPrimate) especially his work on the [D&D Beyond Proxy](https://github.com/MrPrimate/ddb-proxy). This project
builds on his work and is heavily inspired by it.