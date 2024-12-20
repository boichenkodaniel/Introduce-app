import { Component, Inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from '../housinglocation';
import {HousingService} from '../housing.service';
@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent,CommonModule],
  template:`
  <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList"
                            [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,

  styleUrl: `home.component.scss`
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  //housingService:HousingService = Inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  constructor(private housingService:HousingService) {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
  filterResults(text:string){
    if(!text){
      this.filteredLocationList=this.housingLocationList;
      return;
    }
    this.filteredLocationList=this.housingLocationList.filter((housingLocation)=>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),);
  }
}

