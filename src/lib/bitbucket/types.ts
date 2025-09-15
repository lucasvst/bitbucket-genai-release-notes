export interface PaginatedList<T> {
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

export interface Author {
    type: "author";
    raw: string;
}

export interface Summary {
    type: "rendered";
    raw: string;
    markup: "markdown";
    html: string;
}

export interface CommitLinks {
    self: Link;
    html: Link;
    diff: Link;
    approve: Link;
    comments: Link;
    statuses: Link;
    patch: Link;
}

export interface Parent {
    hash: string;
    links: {
        self: Link;
        html: Link;
    };
    type: "commit";
}

export interface RenderedMessage {
    type: "rendered";
    raw: string;
    markup: "markdown";
    html: string;
}

export interface Rendered {
    message: RenderedMessage;
}

export interface CommitRepository {
    type: "repository";
    full_name: string;
    links: {
        self: Link;
        html: Link;
        avatar: Link;
    };
    name: string;
    uuid: string;
}

export interface Commit {
    type: "commit";
    hash: string;
    date: string;
    author: Author;
    message: string;
    summary: Summary;
    links: CommitLinks;
    parents: Parent[];
    rendered: Rendered;
    repository: CommitRepository;
}

export interface Branch {
    name: string;
    type: "branch";
}