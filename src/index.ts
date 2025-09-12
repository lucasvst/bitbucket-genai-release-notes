import fs from 'fs';
import path from 'path';

import { getGitLog, listRepositories } from './lib/bitbucket';
import { getPrompt, PROMPT_ENUM } from './lib/prompts';
import { genAI } from './lib/gemini';

const distPath = path.resolve(__dirname, '..', 'dist');

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

async function main () {

  const repos = await listRepositories()

  const prompt = await getPrompt(PROMPT_ENUM.RELEASE_NOTES)

  for (const repo of repos) {

    const commits = await getGitLog({ repositoryName: repo.name });

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `
        ${prompt}

        repository: ${repo.name}
        commits: ${JSON.stringify(commits)}
      `,
    })

    console.log(response.text)

    // @TODO: save the response.text to the root dist folder using the repository.name (dist/repository-name.md)
  }
}

main();