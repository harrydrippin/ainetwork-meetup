import * as passport from 'passport';
import {Strategy as GitHubStrategy, Profile}  from 'passport-github';
import * as config from './config';
import Axios from 'axios';

class AuthManager {
    /**
     * Axios client for requesting REST API to Github
     */
    protected static axios = Axios.create({
        baseURL: 'https://api.github.com'
    });

    /**
     * Initialize function
     */
    public static init() {
        // Set config defaults when creating the instance
        // TODO(@harrydrippin): Need to configure scopes
        passport.use(new GitHubStrategy({
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: config.SERVER_HOST + "/auth/github/callback"
          }, AuthManager.onAuthSuccess
        ));
    }

    /**
     * Calls when authentication succeed
     * @param accessToken 
     * @param refreshToken 
     * @param profile Profile object from Github
     * @param cb Need to call when authorization process ends
     */
    public static async onAuthSuccess(accessToken: string, refreshToken: string, profile: Profile, cb: (error: any, user?: any) => void) {
        console.log("[+] Success to authenticate: ", profile.username!);
        
        // Set accessToken to axios instance
        AuthManager.axios.defaults.headers.common['Authorization'] = "token " + accessToken;

        // Get username with removing nullability
        const username: string = profile.username!;

        // Fetch & organize informations and save to database
        Promise.all([
            this.getUserInformations(username),
            this.getAdminableRepositories(username),
            this.getStarredRepositories(username)
        ]).then(() => {
            // TODO(@harrydrippin): Send invitation email here
        }).catch(AuthManager.onRequestError);

        // Call cb to Github first for the user flow
        cb(undefined, { githubId: profile.id });
    }

    /**
     * Error handler for the axios request
     * @param error
     */
    public static async onRequestError(error: any) {
        console.log(error);
    }

    /**
     * Returns Promise for fetching & organizing user informations
     * @param username Github username
     */
    public static async getUserInformations(username: string) {
        return new Promise<void>((resolve, reject) => {

        });
    }

    /**
     * Returns Promise for fetching & organizing adminable repositories
     * @param username Github username
     */
    public static async getAdminableRepositories(username: string) {
        return new Promise<void>((resolve, reject) => {

        });
    }

    /**
     * Returns Promise for fetching & organizing starred repositories
     * @param username Github username
     */
    public static async getStarredRepositories(username: string) {
        return new Promise<void>((resolve, reject) => {

        });
    }
}

export default AuthManager;