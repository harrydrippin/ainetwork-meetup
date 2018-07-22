import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();

/**
 * Authentication
 */
router.get("/github", passport.authenticate("github"));

/**
 * Callback after authentication
 */
router.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/failure",
}), (req, res) => {
    res.redirect("/signup");
});

export default router;
