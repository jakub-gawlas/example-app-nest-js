import { Middleware, NestMiddleware, HttpException, HttpStatus } from 'nest.js';
import { AuthService } from './auth.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
  ){}

  resolve(roles?: Array<string>){
    return async (req, res, next) => {
      if(req.user && !roles) return next();
      let user = req.user;
      if(!user){
        const name = req.headers['x-access-token'];
        user = await this.authService.authorize(name);
      }
      if(!user || (roles && !this.isAuthorized(user, roles))){
        throw new HttpException('User not authorized.', HttpStatus.UNAUTHORIZED);
      }
      if(!req.user) req.user = user;
      next();
    }
  }

  private isAuthorized(user, roles: Array<string>){
    if(!user || !user.roles || !Array.isArray(user.roles)){
      return false;
    }
    return roles.every(r => user.roles.includes(r));
  }
}