import { Module, NestModule } from 'nest.js';
import { AuthService } from './auth.service'
import { SharedModule } from '../shared/shared.module';

@Module({
  modules: [ SharedModule ],
})
export class AuthModule implements NestModule {}