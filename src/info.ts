import * as passport from 'passport';
import {Strategy as GitHubStrategy, Profile}  from 'passport-github';
import * as config from './config';
import Axios, { AxiosInstance } from 'axios';
import { GithubUserInfo, GithubRepository, GithubUserInfoAllowed, cleanObject, GithubRepositoryAllowed } from './models/github';
import { Attendant } from './models/attendant.model';
import getDatabase, { Database, SequelizeCustomResult } from './database';

interface PassportGithub {
    id: string;
    username: string;
    email: string;
    profile_pic?: string;
}

class InfoManager {
    protected static db: Database = getDatabase();
    protected static limitation: number = 130;

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
          }, InfoManager.onAuthSuccess
        ));

        passport.serializeUser((user: PassportGithub, done) => {
            done(null, user);
        });
        
        passport.deserializeUser((user: string, done) => {
            done(null, user);
        });
    }

    /**
     * Calls when authentication succeed
     * @param accessToken 
     * @param refreshToken 
     * @param profile Profile object from Github
     * @param cb Need to call when authorization process ends
     */
    public static async onAuthSuccess(accessToken: string, refreshToken: string, profile: Profile, cb: (error: any, user?: any) => void) {
        console.log("[Info: %s] Success to authenticate", profile.username!);
        
        const username: string = profile.username!;

        let userObject = { 
            id: profile.id,
            email: profile.emails![0].value,
            profile_pic: profile.photos![0].value,
            username: profile.username
        };
        
        Attendant.findAndCountAll().then((result) => {
            if (result.count + 1 > InfoManager.limitation) {
                userObject["overLimit"] = true;
            } else {
                userObject["overLimit"] = false;
                InfoManager.triggerJobs(username, accessToken);
            }

            cb(undefined, userObject);
        });
    }

    /**
     * Trigger the crawling jobs
     * @param username Username of this user
     * @param accessToken Access token given by Github
     */
    public static triggerJobs(username: string, accessToken: string) {
        const instance: AxiosInstance = Axios.create({
            baseURL: 'https://api.github.com',
            headers: {
                "Authorization": "token " + accessToken
            }
        });

        Promise.all([
            InfoManager.getUserInformations(instance, username),
            InfoManager.getAdminableRepositories(instance, username),
            InfoManager.getStarredRepositories(instance, username)
        ]).then(InfoManager.onRequestSuccess).catch(InfoManager.onRequestError);
    }

    /**
     * When requests are done successfully
     * @param values return values of Promise
     */
    public static async onRequestSuccess(values: any[]) {
        const [userInfo, adminableRepos, starredRepos] = values;
        console.log("[Info: %s] Crawling jobs are done", userInfo.login);

        const user: GithubUserInfo = cleanObject(userInfo, GithubUserInfoAllowed) as GithubUserInfo;
        const adminable: Array<GithubRepository> = [];
        const starred: Array<GithubRepository> = [];

        adminableRepos.forEach((v) => {
            adminable.push(cleanObject(v, GithubRepositoryAllowed) as GithubRepository);
        });

        starredRepos.forEach((v) => {
            starred.push(cleanObject(v, GithubRepositoryAllowed) as GithubRepository);
        });

        // updateOrCreate will be safe for race condition with ethWallet submission
        await InfoManager.db.updateOrCreate(Attendant, {
            username: user.login
        }, {
            ...user,
            username: user.login,
            id: user.id,
            name: user.name,
            email: user.email,
            repos_admin: JSON.stringify(adminable),
            repos_starred: JSON.stringify(starred)
        }).then((result: SequelizeCustomResult) => {
            const { item, created } = result;

            if (created) {
                console.log("[Info: %s] Successfully created on DB", item.username);
            } else {
                console.log("[Info: %s] Already existing user, just updated", user.login);
            }
        });
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

export default InfoManager;