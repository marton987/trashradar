import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public trashRadarLogo = 'assets/img/trash-radar-logo-highres.svg';

  constructor() { }

  ngOnInit() {
  }

}
