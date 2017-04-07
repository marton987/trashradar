import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public spryGroupUrl = 'http://www.spry-group.com';

  constructor() { }

  ngOnInit() {
  }

}
