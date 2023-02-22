# Repotran
A simple transaction processing system that enables ventures with business functions linked to payment processing, inventory management and so on

## How to use
- Local development
1. Either clone this repository or download the repository
2. In the root directory of the project using the terminal, run the command `npm i` to install the dependencies
3. Create a postgres database instance using a local installation, docker or any PAAS or CAAS such heroku or railway
4. Populate the environment variables: `DATABASE_USERNAME`, `DATABASE_NAME`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, `JWT_SECRET_KEY`, `HASH_SALT`, `GENERIC_SECRET_KEY`
5. To start up the project in development mode, run the command `npm run start:dev`
