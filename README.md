# Bitbucket Release Notes Generator

This is a command-line tool that automatically generates release notes for your Bitbucket repositories using the Gemini API.

## How it works

The tool fetches the most recently updated repositories from your Bitbucket workspace and allows you to select which ones you want to generate release notes for.

For each selected repository, it fetches the commit history from the last 7 days and uses the Gemini API to generate a well-structured release notes document in Markdown format.

The generated release notes are divided into three sections:

1.  **Overview (for Stakeholders):** A high-level summary of the most important updates.
2.  **Feature Highlights (for Product Managers/Area):** A list of the main features or improvements implemented.
3.  **Technical Details (for Developers):** A complete list of commits, including hash, date, full message, and author's name.

## Prerequisites

- Node.js
- A Bitbucket account with API access
- A Gemini API key

## Setup

1.  Clone this repository:
    ```bash
    git clone https://github.com/lucasvst/bitbucket-release-notes.git
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the project and add the following variables:
    ```bash
    BITBUCKET_WORKSPACE=<YOUR_BITBUCKET_WORKSPACE>
    BITBUCKET_API_TOKEN=<YOUR_BITBUCKET_API_TOKEN>
    BITBUCKET_USER_EMAIL=<YOUR_BITBUCKET_USER_EMAIL>
    GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
    ```
    > You can use the `.env_example` file as a template.

## Usage

To run the tool, use the following command:

```bash
npm start
```

The generated release notes will be saved as individual `.md` files in the `dist` directory.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.
