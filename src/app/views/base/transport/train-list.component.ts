import { Component, OnInit } from '@angular/core';

import { Train} from './train';
import { TrainDto} from './traindto';
import { TransportService } from './transport.service';

@Component({
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent implements OnInit {
  pageTitle = 'قائمة القطارات  ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTrain = this.listFilter ? this.performFilter(this.listFilter) : this.train;
  }

  filteredTrain: TrainDto[] = [];
 train: TrainDto[] = [];

  constructor(private transportService: TransportService) { }


  performFilter(filterBy: string): TrainDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.train.filter((train: TrainDto) =>
      train.numTransport.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.transportService.getTrains().subscribe(
     train => {
        this.train = train;
        this.filteredTrain = this.train;
      },
      error => this.errorMessage = <any>error
    );
  }
}
