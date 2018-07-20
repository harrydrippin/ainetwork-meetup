import * as passport from 'passport';
import {Strategy as GitHubStrategy, Profile}  from 'passport-github';
import * as config from './config';

class AuthManager {
    public static init() {
        passport.use(new GitHubStrategy({
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: config.SERVER_HOST + "/auth/github/callback"
          }, AuthManager.onAuthSuccess
        ));
    }

    public static onAuthSuccess(accessToken: string, refreshToken: string, profile: Profile, cb: (error: any, user?: any) => void) {
        // TODO(@harrydrippin): Need some logic like DB transactions and sending email
        console.log("Success to authenticate: ", profile.id);
    }
}

export default AuthManager;