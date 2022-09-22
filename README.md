# EconomyKit Example App

## Setup

### Prerequisites

- Node.js
- Yarn
- EconomyKit Account

### Installation (Development)

1. `git clone` this repo
2. Run `yarn install` to install required dependencies
3. Provision an EconomyKit App and paste the app token in `.env`  
   _You can also copy the `.env` file to `.env.local` to ignore it from source control._
4. Run `yarn dev` to start the development server.

### Installation (Production)

Same as above, except instead of running the development server with `yarn dev`, build for production with `yarn build`.  
Once this is complete you can run `yarn start` to start the server listening on port 3000.
