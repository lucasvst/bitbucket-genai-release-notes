export type PaginatedList<T> = {
    values: Array<T>
    next?: string
}

export interface Link {
    href: string;
}

export interface CloneLink {
    name: string;
    href: string;
}

export interface RepositoryLinks {
    self: Link;
    html: Link;
    avatar: Link;
    pullrequests: Link;
    commits: Link;
    forks: Link;
    watchers: Link;
    branches: Link;
    tags: Link;
    downloads: Link;
    source: Link;
    clone: CloneLink[];
    hooks: Link;
}

export interface OwnerLinks {
    self: Link;
    avatar: Link;
    html: Link;
}

export interface Owner {
    display_name: string;
    links: OwnerLinks;
    type: "team";
    uuid: string;
    username: string;
}

export interface WorkspaceLinks {
    avatar: Link;
    html: Link;
    self: Link;
}

export interface Workspace {
    type: "workspace";
    uuid: string;
    name: string;
    slug: string;
    links: WorkspaceLinks;
}

export interface ProjectLinks {
    self: Link;
    html: Link;
    avatar: Link;
}

export interface Project {
    type: "project";
    key: string;
    uuid: string;
    name: string;
    links: ProjectLinks;
}

export interface MainBranch {
    name: string;
    type: "branch";
}

export interface OverrideSettings {
    default_merge_strategy: boolean;
    branching_model: boolean;
}

export interface Repository {
    type: "repository";
    full_name: string;
    links: RepositoryLinks;
    name: string;
    slug: string;
    description: string;
    scm: "git";
    website: null;
    owner: Owner;
    workspace: Workspace;
    is_private: boolean;
    project: Project;
    fork_policy: "no_public_forks";
    created_on: string;
    updated_on: string;
    size: number;
    language: string;
    uuid: string;
    mainbranch: MainBranch;
    override_settings: OverrideSettings;
    parent: null;
    enforced_signed_commits: null;
    has_issues: boolean;
    has_wiki: boolean;
}

export type Commit = {
    hash: string,
    date: string,
    //   author: [Object],
    message: string,
    //   summary: [Object],
    //   links: [Object],
    //   parents: [Array],
    //   rendered: [Object],
    //   repository: [Object]
}