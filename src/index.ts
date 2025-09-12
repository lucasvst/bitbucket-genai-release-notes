import { getGitLog, listRepositories } from './lib/bitbucket';

async function main() {
  const repos = await listRepositories()
  console.log(repos.map(repo => repo.name))
  for (const repo of repos) {
    const commits = await getGitLog({ repositoryName: repo.name });
    console.log(commits.map(commit => commit.message))
  }
}

main();
