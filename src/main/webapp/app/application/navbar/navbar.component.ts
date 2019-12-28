import { Component, OnInit } from '@angular/core';

@Component ({
    selector: 'msw-navbar'
    ,templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit{
  constructor(){
    console.log('I have just been created ...');
  }

  ngOnInit (){
    console.log('I am on aware of Onint');
  }
}
