import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from 'nest.js';
import { UsersController } from './users.controller'
import { AuthMiddleware } from '../auth/auth.middleware';
import { SharedModule } from '../shared/shared.module';

@Module({
  modules: [ SharedModule ],
  controllers: [ UsersController ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewaresConsumer){
    consumer
      .apply(AuthMiddleware).forRoutes(UsersController)
      .apply(AuthMiddleware).with(['admin']).forRoutes({
        path: '*', method: RequestMethod.POST
      });
  }
}