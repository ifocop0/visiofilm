import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css'],
  preserveWhitespaces: true
})
export class TestsComponent implements OnInit {
  today = new Date();

  constructor() { }

  ngOnInit() {
  }

}
