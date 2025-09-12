import fs from 'fs';
import path from 'path';

import { checkbox } from '@inquirer/prompts';

import { getGitLog, listRepositories } from './lib/bitbucket';
import { getPrompt, PROMPT_ENUM } from './lib/prompts';
import { genAI } from './lib/gemini';

const distPath = path.resolve(__dirname, '..', 'dist');

const UPDATED_ON_LAST_DAYS = 7

if (!fs.existsSync(distPath)) {
  console.info('Creating dist folder...')
  fs.mkdirSync(distPath, { recursive: true });
}

async function main () {

  const prompt = await getPrompt(PROMPT_ENUM.RELEASE_NOTES)

  console.info('Listing repositories...')
  const _repos = await listRepositories({ updatedOnLastDays: UPDATED_ON_LAST_DAYS })

  const repos = await checkbox({
    message: 'Select repositories to generate release notes',
    choices: _repos.map(repo => ({ name: repo.name, value: repo.name }))
  })

  for (const repoName of repos) {

    console.info(`Listing logs for ${repoName}...`)
    const commits = await getGitLog({ repositoryName: repoName, updatedOnLastDays: UPDATED_ON_LAST_DAYS });

    const contents = `
      ${prompt}

      data de hoje: ${new Date().toISOString()}

      repository: ${repoName}

      commits: ${JSON.stringify(commits.map(commit => ({
        hash: commit.hash,
        message: commit.message,
        author: commit.author.raw,
        date: commit.date,
      })))}
    `

    console.info(`Generating release notes for ${repoName}...`)
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
    })

    console.info(`Saving release notes for ${repoName}...`)
    const filePath = path.resolve(distPath, `${repoName}.md`);
    fs.writeFileSync(filePath, response.text!);
  }
}

main();