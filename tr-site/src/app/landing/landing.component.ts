import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
    
  public trashRadarLogo = 'assets/img/trash-radar-logo-highres.svg';

  public spryGroupLogo = 'assets/img/spry-group-logo.png';

  public spryGroupUrl = 'http://www.spry-group.com'

  constructor() { }

  ngOnInit() {
  }

}
