import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrls: ['user-registeration.component.scss']
})
export class UserRegisterationComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'UserRegisterationComponent message';
  }

  ngOnInit(): void {}
}
