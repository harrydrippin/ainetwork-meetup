import * as passport from 'passport';
import {Strategy as GitHubStrategy, Profile}  from 'passport-github';
import * as config from './config';

class AuthManager {
    public static init() {
        passport.use(new GitHubStrategy({
            clientID: config.GITHUB_CLIENT_ID!,
            clientSecret: config.GITHUB_CLIENT_SECRET!,
            callbackURL: config.SERVER_HOST! + config.GITHUB_CALLBACK!
          }, AuthManager.onAuthSuccess
        ));
    }
    public static getAuthenticateLogic() {
        return passport.authenticate("github");
    }

    public static getCallbackLogic(success: string, failure: string) {
        return passport.authenticate("github", {
            successRedirect: success,
            failureRedirect: failure
        })
    }

    public static onAuthSuccess(accessToken: string, refreshToken: string, profile: Profile, cb: (error: any, user?: any) => void) {
        // TODO(@harrydrippin): Need some logic like sending email
        console.log("Success to authenticate: ", profile.id);
    }
}

export default AuthManager;