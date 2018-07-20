import * as createHttpError from 'http-errors';
import { Server, createServer } from 'http';
import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as passport from 'passport';

import indexRouter from './routes';
import AuthManager from './auth';
import * as config from './config';

class BaseServer {
  protected app: express.Express;
  protected server: Server;
  protected port: any;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.port = config.PORT;
    this.setMiddlewares();
    this.setViewEngines();
    this.registerRoutes();
  }

  public listen() {
    this.server.listen(parseInt(this.port as string), '0.0.0.0', undefined, () => {
      console.log("[Server] Server starts to listen at port %s", this.port);
    });
  }

  protected setMiddlewares = () => {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));
    AuthManager.init();
  }

  protected setViewEngines = () => {
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view engine', 'ejs');
  }

  protected registerRoutes = () => {
    // Intercept oAuth requests
    this.app.get("/auth/github", passport.authenticate("github"));

    this.app.get("/auth/github/callback", passport.authenticate("github", {
      failureRedirect: "/failure"
    }), (req, res) => {
      // After onAuthSuccess: do some user flow logic
      // TODO(@harrydrippin): Should discuss the user flow, just redirect to home for now
      res.redirect("/");
    });

    this.app.use('*', indexRouter);

    this.app.use(function(req, res, next) {
      next(createHttpError(404));
    });

    this.app.use(function(err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
}

export default BaseServer;