import { Component} from '@angular/core';
@Component({
  selector: 'app-map',
  templateUrl: './google-map.component.html',
  styleUrls:['./google-map.component.css']
})
export class GoogleMapComponent{
	title:"pointer lieux d'accident";
	lat:number=36.805466;
    lng:number=10.186813;
   
}