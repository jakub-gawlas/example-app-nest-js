import { Component } from 'nest.js';
import { UsersService } from '../users/users.service';

@Component()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ){}

  async authorize(name: string){
    const user = await this.usersService.getUserByName(name);
    return user;
  }

  hasPrivileges(user, requiredRoles:string[]){
    if(!user || !user.roles || !Array.isArray(user.roles)){
      return false;
    }
    return requiredRoles.every(r => user.roles.includes(r));
  }
}