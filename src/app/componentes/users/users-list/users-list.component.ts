import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { User } from '../users.component';
import { List } from 'immutable';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {

  @Input() data: List<User>;
  @Output() add = new EventEmitter<{}>();
  @Output() remove = new EventEmitter<User>();

  constructor() {}

  ngOnInit(): void {}
}
