import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

import { Repository, Commit, PaginatedList } from './types';

dotenv.config();

const BITBUCKET_WORKSPACE = process.env.BITBUCKET_WORKSPACE;

const BITBUCKET_API_TOKEN = process.env.BITBUCKET_API_TOKEN;
const BITBUCKET_USER_EMAIL = process.env.BITBUCKET_USER_EMAIL;

const BITBUCKET_API_URL = 'https://api.bitbucket.org/2.0';

const credentials = Buffer.from(`${BITBUCKET_USER_EMAIL}:${BITBUCKET_API_TOKEN}`).toString('base64');

// LIST REPOSITORIES
interface GetBitbucketReposParams {
    updatedOnLastDays?: number;
}
export async function listRepositories(params: GetBitbucketReposParams = {}): Promise<Repository[]> {

    const _todayDate = new Date();
    const _updatedOnLastDays = params.updatedOnLastDays || 7;
    const _requestDate = new Date(_todayDate.getTime() - _updatedOnLastDays * 24 * 60 * 60 * 1000);

    const url = `${BITBUCKET_API_URL}/repositories/${BITBUCKET_WORKSPACE}?pagelen=100&q=updated_on>${encodeURIComponent(_requestDate.toISOString())}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json() as PaginatedList<Repository>;

        return data.values
    } catch (error) {
        console.error('Error fetching Bitbucket repositories:', error);
        return []
    }
}

// GET COMMITS BY REPOSITORY
interface gitLogParams {
    repositoryName: string
    updatedOnLastDays?: number;
}
export async function getGitLog(params: gitLogParams): Promise<Commit[]> {

    const _todayDate = new Date();
    const _updatedOnLastDays = params.updatedOnLastDays || 7;
    const _requestDate = new Date(_todayDate.getTime() - _updatedOnLastDays * 24 * 60 * 60 * 1000);

    let url: string | undefined = `${BITBUCKET_API_URL}/repositories/${BITBUCKET_WORKSPACE}/${params.repositoryName}/commits?pagelen=2`;
    const allCommits: Commit[] = [];

    try {
        while (url) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            const data = await response.json() as PaginatedList<Commit>;
            const commits = data.values || [];

            let shouldContinue = true;
            for (let commit of commits) {
                const commitDate = new Date(commit.date);
                if (commitDate >= _requestDate) {
                    allCommits.push(commit);
                } else {
                    shouldContinue = false;
                    break;
                }
            }

            if (!shouldContinue) {
                break;
            }

            url = data.next;
        }
        return allCommits;
    } catch (error) {
        console.error(`Error fetching Bitbucket commits for ${params.repositoryName}:`, error);
        return [];
    }
}