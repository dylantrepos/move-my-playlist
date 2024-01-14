# Move My Playlist

## Overview

Move My Playlist is a service that allows users to transfer their music playlists between different streaming platforms. This tool aims to make the process of switching between music services seamless, without losing your favorite playlists.

## Supported Platforms

Currently, the service supports the following music streaming platforms:

- Deezer
- Spotify

(Add or remove platforms based on your application's capabilities)

## Features

- Transfer playlists from Deezer to Spotify and vice versa.
- User-friendly interface for easy navigation and operation.
- Secure handling of user data.

## Installation

To install the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/move-my-playlist.git`
2. Navigate into the project directory: `cd move-my-playlist`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`

## Usage

To use Move My Playlist, you need to log in to both your Deezer and Spotify accounts. Then, select the playlist you want to transfer and the destination platform. Click on the "Transfer" button to start the process.

## Development

This project uses Vite with the official plugins `@vitejs/plugin-react` and `@vitejs/plugin-react-swc` for Fast Refresh during development.

## Required Tokens

To use Move My Playlist, users must have active accounts on both the source and destination platforms. This is necessary to access the platform-specific tokens, which are required for authenticating and interacting with the respective platform's API.

## ESLint Configuration

For production applications, we recommend enabling type aware lint rules. Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```
