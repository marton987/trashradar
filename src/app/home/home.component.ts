import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public trashRadarLogo = 'assets/img/trash-radar-logo-highres.svg';

  public spryGroupLogo = 'assets/img/spry-group-logo.png';

  public spryGroupUrl = 'http://www.spry-group.com';

  constructor() { }

  ngOnInit() {
  }

}
