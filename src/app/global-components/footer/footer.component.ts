import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  _currentYear = new Date().getFullYear() > 2019 ? + new Date().getFullYear() : '';

  constructor() { }

  ngOnInit(): void { }

}
