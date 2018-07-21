import * as passport from 'passport';
import {Strategy as GitHubStrategy, Profile}  from 'passport-github';
import * as config from './config';
import Axios, { AxiosInstance } from 'axios';
import { GithubUserInfo, GithubRepository, GithubUserInfoAllowed, cleanObject, GithubRepositoryAllowed } from './models/github';

class AuthManager {
    /**
     * Initialize function
     */
    public static init() {
        // TODO(@harrydrippin): Need to configure scopes
        passport.use(new GitHubStrategy({
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: config.SERVER_HOST + "/auth/github/callback",
            scope: ["read:user", "user:email"]
          }, AuthManager.onAuthSuccess
        ));
    }

    /**
     * Calls when authentication succeed first time
     * @param accessToken 
     * @param refreshToken 
     * @param profile Profile object from Github
     * @param cb Need to call when authorization process ends
     */
    public static async onAuthSuccess(accessToken: string, refreshToken: string, profile: Profile, cb: (error: any, user?: any) => void) {
        console.log("[Auth: %s] Success to authenticate", profile.username!);
        
        const username: string = profile.username!;

        AuthManager.fetchInformations(username, accessToken);

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

    public static fetchInformations(username: string, accessToken: string) {
        const instance: AxiosInstance = Axios.create({
            baseURL: 'https://api.github.com',
            headers: {
                "Authorization": "token " + accessToken
            }
        });

        Promise.all([
            AuthManager.getUserInformations(instance, username),
            AuthManager.getAdminableRepositories(instance, username),
            AuthManager.getStarredRepositories(instance, username)
        ]).then((values) => {
            const [userInfo, adminableRepos, starredRepos] = values;
            console.log("[Auth: %s] Crawlings are done", userInfo.login);

            const user: GithubUserInfo = cleanObject(userInfo, GithubUserInfoAllowed) as GithubUserInfo;
            const adminable: Array<GithubRepository> = [];
            const starred: Array<GithubRepository> = [];

            adminableRepos.forEach((v) => {
                adminable.push(cleanObject(v, GithubRepositoryAllowed) as GithubRepository);
            });

            starredRepos.forEach((v) => {
                starred.push(cleanObject(v, GithubRepositoryAllowed) as GithubRepository);
            });

            // TODO(@harrydrippin): Store datas to database here
            // TODO(@harrydrippin): Send invitation email here
        }).catch(AuthManager.onRequestError);
    }

    /**
     * Returns Promise for fetching & organizing user informations
     * @param username Github username
     */
    public static async getUserInformations(axios: AxiosInstance, username: string) {
        return new Promise<GithubUserInfo>((resolve, reject) => {
            axios.get("/users/" + username).then(async (response) => {
                resolve(response.data as GithubUserInfo);
            }).catch(() => reject("Failed to get user information from response"));
        });
    }

    /**
     * Returns Promise for fetching & organizing adminable repositories
     * @param username Github username
     */
    public static async getAdminableRepositories(axios: AxiosInstance, username: string) {
        return new Promise<Array<GithubRepository>>(async (resolve, reject) => {
            const result: Array<GithubRepository> = [];

            let response: any;
            let count: number = 1;
            while (true) {
                await axios.get("/users/" + username + "/repos?page=" + count)
                    .then((resp) => {
                        response = resp.data;
                    }).catch((resp => {
                        reject("Failed to get repositories from response");
                    }));
                const data = response as GithubRepository[];
                if (data.length === 0) {
                    resolve(result);
                    break;
                } else {
                    data.forEach((v) => {
                        result.push(v);
                    });
                    count += 1;
                }
            }
        });
    }

    /**
     * Returns Promise for fetching & organizing starred repositories
     * @param username Github username
     */
    public static async getStarredRepositories(axios: AxiosInstance, username: string) {
        return new Promise<Array<GithubRepository>>(async (resolve, reject) => {
            const result: Array<GithubRepository> = [];

            let response: any;
            let count: number = 1;
            while (true) {
                await axios.get("/users/" + username + "/starred?page=" + count)
                    .then((resp) => {
                        response = resp.data;
                    }).catch((resp => {
                        reject("Failed to get repositories from response");
                    }));
                const data = response as GithubRepository[];
                if (data.length === 0) {
                    resolve(result);
                    break;
                } else {
                    data.forEach((v) => {
                        result.push(v);
                    });
                    count += 1;
                }
            }
        });
    }
}

export default AuthManager;