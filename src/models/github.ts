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

/**
 * Github provided interface for repositories
 */
export interface GithubRepository {
    /** Name of repository */
    name: string;

    /** Commit count on default branch, usually `master` */
    size: number;

    /** 
     * Language which has been used mostly on the repo 
     * @desc may not provided, or `Unavailable`
     */
    language: string;
}