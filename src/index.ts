import fs from 'fs';
import path from 'path';

import { checkbox, number, select } from '@inquirer/prompts';

import { getGitLog, listBranches, listRepositories } from './lib/bitbucket';
import { getPrompt, PROMPT_ENUM } from './lib/prompts';
import { genAI } from './lib/gemini';
import pdf from './lib/pdf';
import { toHTML } from './lib/markdown';

const distPath = path.resolve(__dirname, '..', 'dist');

if (!fs.existsSync(distPath)) {
  console.info('Creating dist folder...')
  fs.mkdirSync(distPath, { recursive: true });
}

const TODAY = (new Date()).toISOString()

async function main () {

  const prompt = await getPrompt(PROMPT_ENUM.RELEASE_NOTES)

  const updatedOnLastDays = await number({
    message: "How many days you want to include in the release notes?",
    default: 7,
    min: 1,
    max: 365,
  })

  console.info('Listing repositories...')
  const _repos = await listRepositories({ updatedOnLastDays: updatedOnLastDays })

  const repos = await checkbox({
    message: 'Select repositories to generate release notes',
    choices: _repos.map(repo => ({ name: repo.name, value: repo.name }))
  })

  for (const repoName of repos) {

    console.info(`Listing branches for repository ${repoName}...`)
    const _branches = await listBranches({ repositoryName: repoName });
    const branch = await select({
      message: `Select a branch to generate release notes for ${repoName}`,
      choices: _branches.map(branch => ({ name: branch.name, value: branch.name }))
    })

    console.info(`Listing logs for repository ${repoName} branch ${branch}...`)
    const commits = await getGitLog({
      repositoryName: repoName,
      updatedOnLastDays: updatedOnLastDays,
      branchName: branch,
    });

    const contents = `
      ${prompt}

      $today: ${TODAY}
      $updatedOnLastDays: ${updatedOnLastDays}
      $branch: ${branch}
      $repository: ${repoName}

      commits: ${JSON.stringify(commits.map(commit => ({
        hash: commit.hash,
        message: commit.message,
        author: commit.author.raw,
        date: commit.date,
      })))}
    `

    console.info(`Generating release notes for repository ${repoName} branch ${branch}...`)
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
    })

    const generatePdf = await select({
      message: `Do you want to generate a PDF file along markdown?`,
      choices: [
        {
          name: 'Yes',
          value: true,
        },
        {
          name: "No",
          value: false,
        },
      ]
    })

    if (generatePdf) {
      console.info(`Generating PDF file for ${repoName}...`)
      const html = await toHTML(response.text!)
      try {
        await pdf(html, path.resolve(distPath, `${repoName}_${TODAY}_${updatedOnLastDays}_days.pdf`))
      } catch (e) {
        console.error(e)
      }
    }

    console.info(`Saving release notes for ${repoName}...`)
    const filePath = path.resolve(distPath, `${repoName}_${TODAY}_${updatedOnLastDays}_days.md`);
    fs.writeFileSync(filePath, response.text!);
  }
}

main();