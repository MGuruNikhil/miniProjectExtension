# Mini Project

An AI-powered extension that summarizes YouTube videos.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Build and Deployment](#build-and-deployment)
- [Contributing](#contributing)

## Introduction

Mini Project is a browser extension that leverages AI to provide summaries of YouTube videos. This extension is built using React and Plasmo framework.

## Features

- Summarizes YouTube videos with a single click.
- Displays the summary directly in the popup.
- Easy to use and lightweight.

## Installation

To install the extension, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/mini-project.git
    cd mini-project
    ```

2. Install dependencies:
    ```sh
    pnpm install
    ```

## Usage

1. Open the extension popup by clicking on the extension icon in the browser toolbar.
2. Click the "Get Summary" button to fetch the summary of the currently active YouTube video.

## Development

To start developing the extension, run:

```sh
pnpm dev
```

This will start the development server and watch for changes.

## Build and Deployment

To build the extension for production, run:

```sh
pnpm build
```
To package the extension into a zip file, run:

```sh
pnpm package
```

The extension can be submitted to the web store using the GitHub Actions workflow defined in [`.github/workflows/submit.yml`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2FminiProject%2FminiExtension%2F.github%2Fworkflows%2Fsubmit.yml%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/miniProject/miniExtension/.github/workflows/submit.yml").

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
