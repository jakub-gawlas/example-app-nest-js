import { Component } from 'nest.js';

@Component()
export class UsersService {

  private users = [
    { id: 0, name: 'Andrzej', age: 20, roles: ['admin'] },
    { id: 1, name: 'Marian', age: 32, roles: [] },
  ];

  getAllUsers(){
    return Promise.resolve(this.users);
  }

  getUser(id: number){
    const user = this.users.find(u => u.id === id)
    return Promise.resolve(user);
  }

  getUserByName(name: string){
    const user = this.users.find(u => u.name === name)
    return Promise.resolve(user);
  }
  
  addUser(user){
    const newUser = {
      id: this.users.length,
      roles: [],
      ...user,
    };
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }
}