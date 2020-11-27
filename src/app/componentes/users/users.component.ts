import { Component, OnInit } from '@angular/core';
import { List } from 'immutable';
import faker from 'faker';

export interface User {
  nombre: string;
  puntuacion: number;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersList: List<User>;

  constructor() {}

  ngOnInit() {
    this.usersList = List(this.generateUser());
  }

  generateUser() {
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      users.push({ nombre: faker.name.findName(), puntuacion: 24 });
    }
    return users;
  }

  add(list: List<User>) {
    return list.unshift({ nombre: faker.name.findName(), puntuacion: 24 });
  }

  remove(list: List<User>, user: User) {
    return list.splice(list.indexOf(user), 1);
  }
}
