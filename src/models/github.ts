/**
 * Github provided interface for user information
 */
export interface GithubUserInfo {
    /** Username */
    login: string;

    /** 
     * URL of profile picture
     * @desc may be empty string 
     */
    avatar_url: string;

    /** 
     * Name
     * @desc may be empty string
     */
    name: string; 

    /** 
     * Company
     * @desc may be empty string
     */
    company: string;

    /** 
     * Personal URL
     * @desc may be empty string
     */
    blog: string;

    /**
     * Location
     * @desc may be empty string
     */
    location: string;

    /**
     * Primary email address
     */
    email: string;

    /**
     * Is this user hireable
     * @desc may not provided from Github
     */
    hireable: boolean;

    /** 
     * Short text to explain this user 
     * @desc may be empty string
     */
    bio: string;

    /** 
     * Count of public repositories this user have 
     */
    public_repos: number;

    /** 
     * Count of followers 
     */
    followers: number;

    /** 
     * Count of following users
     */
    following: number;
}

export const GithubUserInfoAllowed: Array<string> = [
    "login", "avatar_url", "name", "company", "blog",
    "location", "email", "hireable","bio", 
    "public_repos", "followers", "following"
];

/**
 * Github provided interface for repositories
 */
export interface GithubRepository {
    /** Name of repository */
    name: string;

    /** Count of the stargazers */
    stargazers_count: number;

    /** 
     * Language which has been used mostly on the repo 
     * @desc may not provided, or `Unavailable`
     */
    language: string;
}

export const GithubRepositoryAllowed: Array<string> = [
    "name", "stargazers_count", "language"
]

/**
 * Filter object by allowance list
 * @param raw Unclean object
 * @param allowed Key array for allow
 */
export function cleanObject(raw: any, allowed: string[]) {
    return Object.keys(raw)
    .filter(key => allowed.indexOf(key) >= 0)
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});
}