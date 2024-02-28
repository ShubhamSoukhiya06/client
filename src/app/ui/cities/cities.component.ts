import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService} from '../../services/services/client.service';
import { City } from '../../model/City';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/markericon.png';
const iconUrl = 'assets/markericon.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent implements OnInit {
  citiesList: City[] = []
  map: any;


  constructor(    
    private clientService: ClientService,
    
    ) {}

  ngOnInit(): void {
    this.getAllCities()

  }

  getAllCities() {
    this.clientService.getCities()
      .subscribe({
        next: (citiesDataResponse) => {
          // Success case: Update cities list, initialize map, and add markers
          this.citiesList = citiesDataResponse;
          this.initializeMap();
          this.addMarkers();
        },
        error: (error) => {
          // Error case: Handle error
          console.error('An error occurred while fetching cities:', error);
        } 
      })
  }


  initializeMap(): void {
    
    this.map = L.map('leaflet', {
      center: [0.0, 0.0],
      zoom: 2
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            noWrap: true,              //this is the crucial line!

            
    }).addTo(this.map);
  }

  populationInMillions(population: string) {
    return parseInt(population) / 1000000;
  }

  addMarkers(): void {

    this.citiesList.forEach(city => {
      L.marker([Number(city.latitude), Number(city.longitude)])
        .bindPopup(`<b>${city.name} (${city.name_native})</b><br>
        <b>Country:</b> ${city.country}<br>
        <b>Continent:</b> ${city.continent}<br>
        <b>Population:</b> ${this.populationInMillions(city.population).toFixed(2)}M<br>
        <b>Founded:</b> ${city.founded}<br>
        <b>Landmarks:</b>${city.landmarks.map(landmark => `<li>${landmark}</li>`).join('')}</ul>`)
        .addTo(this.map);
    });
  }

  


}
