import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'forms.component.html',
  providers: [DatePipe]
})
export class FormsComponent {

  today: number=Date.now();
  constructor() { }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

}