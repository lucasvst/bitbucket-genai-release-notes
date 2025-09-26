import { marked } from "marked";

export function toHTML (content: string) {
    return marked.parse(content)
}