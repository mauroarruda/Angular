import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  data = new Date().getFullYear();/*formato da data apenas com ano*/

  constructor() { 
  }

  ngOnInit(): void {
  }

}
