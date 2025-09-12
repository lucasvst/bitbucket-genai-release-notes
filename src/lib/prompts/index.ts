import { readFile } from 'fs/promises';
import path from 'path';

export enum PROMPT_ENUM {
    RELEASE_NOTES,
}

const PROMPTS = {
    [PROMPT_ENUM.RELEASE_NOTES]: './release_notes.md'
}

export async function getPrompt (prompt: PROMPT_ENUM) {
    console.log(prompt)
    const fileContents = await readFile(path.join(__dirname, PROMPTS[prompt]), 'utf8');
    return fileContents
}