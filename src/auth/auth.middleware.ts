import { Middleware, NestMiddleware, HttpException, HttpStatus } from 'nest.js';
import { AuthService } from './auth.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
  ){}

  resolve(requiredRoles?: Array<string>){
    return async (req, res, next) => {
      if(req.user && !requiredRoles) return next();
      let user = req.user;
      if(!user){
        const name = req.headers['x-access-token'];
        user = await this.authService.authorize(name);
      }
      if(!user || (requiredRoles && !this.authService.hasPrivileges(user, requiredRoles))){
        throw new HttpException('User not authorized.', HttpStatus.UNAUTHORIZED);
      }
      if(!req.user) req.user = user;
      next();
    }
  }
}