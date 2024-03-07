import { Component } from '@angular/core';

import * as versionInfo from "../../../../version-info.json";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public versionInfo = versionInfo;
}
