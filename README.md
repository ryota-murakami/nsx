[![CI](https://github.com/laststance/today-i-learned/actions/workflows/ci.yml/badge.svg)](https://github.com/laststance/today-i-learned/actions/workflows/ci.yml)
[![Depfu](https://badges.depfu.com/badges/21dd00bdaefaebe1957173b9bb2eba6f/overview.svg)](https://depfu.com/github/laststance/today-i-learned?project_id=17741)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://digitalstrength.dev/ )

# Today I Learned (Work in Progress 🚧 Not yet public release)

Prod ➡️ https://digitalstrength.dev  
Completely personal use for myself that small blog system for written what does I today learned.

[![img](https://digital3.nyc3.cdn.digitaloceanspaces.com/Kapture%202021-09-07%20at%2021.45.51.gif)](https://digitalstrength.dev)


# Getting start local development

1. `yarn install`
2. `docker-compose up -d`
3. `yarn db:reset`
4. `yarn start`
5. `yarn server:start`

# NPM Scripts

## `yarn start`

Start local front-end dev server by create-react-app.

## `yarn build`

Make production front-end bundle.

## `yarn deploy`

run deploy.sh

```bash
# only server code
yarn deploy -s

# only frontend code
yarn deploy -f
```

## `yarn workflow:deploy`

all in one command for deploy

## `yarn test`

Run create-react-app tests.

## `yarn typecheck`

TypeScript type check in front-end.

## `yarn lint`

Run ESLint on create-react-app.

## `yarn lint:fix`

Run ESlint with --fix option on create-react-app.

## `yarn server:build`

Build `backend/` dir Express server.

## `yarn server:start`

## `yarn db:hashgen`

generate password hash.

## CRA environment variables

These are storing `.env` and evaluate at build time.

### REACT_APP_API_ENDPOINT

- dev: `http://localhost:4000/api`
- prod: `https://digitalstrength.dev/api`

### REACT_APP_ENABLE_SIGNUP=false|true

### REACT_APP_ENABLE_LOGIN=false|true

Default false.  
Show each page link button at the `/` page.  
These only need initial setup of production admin user.

### REACT_APP_BUNDLE_ANALYZER=false|true

Default false. Switch enable|disable bundle-analyzer.

### REACT_APP_INTERACTIVE_ANALYZE=false|true

Default false. When true bundle-analizer open and jump new browser tab where showing bundle size graph.

### JWT_SECRET

set unique and hidden string for jwt.

# Production Operation

### `docker-compose exec db mysql -u root -p`

login mysql with terminal.

## pm2

- `pm2 start eco.system.config.js`
- `pm2 stop all`
- `pm2 ps`

check node server status.

## Let's Encrypt

- `certbot certonly` in `/root/letsencript` dir, renew certificate 3 month.
