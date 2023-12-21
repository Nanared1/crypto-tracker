### `yarn`

Download packages required to run application

### `yarn env`

This will create a .env file in your root dir.
If you have a CMC key, assign it to `CMC_PRO_API_KEY="YOUR_API_KEY"`, if not, send me an email and I can share mine with you - certain conditions apply.

### `yarn server`

This will start the server on port 3001. A backend server was required because the CMC API has cors rules that prevents client side requests.
In order to access the API, I had to setup a small server to make request to CMC's APIs

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

