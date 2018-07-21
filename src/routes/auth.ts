import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();

router.get("/auth/github", passport.authenticate("github"));

router.get("/auth/github/callback", passport.authenticate("github", {
    failureRedirect: "/failure",
    session: false // TODO(@harrydrippin): Should discuss using session, may differ what we want
}), (req, res) => {
    // After onAuthSuccess: do some user flow logic
    // TODO(@harrydrippin): Should discuss the user flow, just redirect to home for now
    res.redirect("/");
});

export default router;
