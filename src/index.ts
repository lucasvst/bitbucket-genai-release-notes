import fs from 'fs';
import path from 'path';

import { getGitLog, listRepositories } from './lib/bitbucket';
import { getPrompt, PROMPT_ENUM } from './lib/prompts';
import { genAI } from './lib/gemini';

const distPath = path.resolve(__dirname, '..', 'dist');

if (!fs.existsSync(distPath)) {
  console.info('Creating dist folder...')
  fs.mkdirSync(distPath, { recursive: true });
}

async function main () {

  console.info('Listing repositories...')
  const repos = await listRepositories()

  const prompt = await getPrompt(PROMPT_ENUM.RELEASE_NOTES)

  for (const repo of repos) {

    console.log(`Listing logs for ${repo.name}...`)
    const commits = await getGitLog({ repositoryName: repo.name });

    const contents = `
      ${prompt}

      repository: ${repo.name}

      commits: ${JSON.stringify(commits.map(commit => ({
        hash: commit.hash,
        message: commit.message,
        author: commit.author.raw,
        date: commit.date,
      })))}
    `

    console.info(`Generating release notes for ${repo.name}...`)
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
    })

    console.info(`Saving release notes for ${repo.name}...`)
    const filePath = path.resolve(distPath, `${repo.name}.md`);
    fs.writeFileSync(filePath, response.text!);
  }
}

main();