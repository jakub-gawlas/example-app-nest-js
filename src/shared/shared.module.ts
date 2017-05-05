import { Module, NestModule } from 'nest.js';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

@Module({
  components: [ UsersService, AuthService ],
  exports: [ UsersService, AuthService ],
})
export class SharedModule implements NestModule {}