import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import {forkJoin} from 'rxjs';
import {Region} from '../../models/region';
import {Country} from '../../models/country';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.css']
})
export class ListCountriesComponent implements OnInit {

  public listRegions: Region[];
  public listCountries: Country[];
  public listCountriesToVisit: Country[];
  public regionSelected: string;


  public loadCountries: boolean;

  constructor(private _countriesService: CountriesService) {
    this.loadCountries = false;
    this.listRegions = [];
    this.listCountries = [];
    this.listCountriesToVisit = [];
    this.regionSelected = 'EU';
  }

  ngOnInit() {
    this.loadCountries = true;
    // forkJoin(observable1, observable2, observable n)
    // Permite esperar hasta que todos los observables emitan el primer valor
    // Devuelve un arreglo con la respuesta de la emision, en el orden que se ponga dependera la posicion
    forkJoin(
      this._countriesService.getCountriesByRegion('eu'),
      this._countriesService.getAllRegions()
    ).subscribe(
      (respuestas) => {
        console.log('respuestas', respuestas);

        this.listCountries = respuestas[0];
        this.listRegions = respuestas[1];

      }, () => {
      },
      () => {
        this.loadCountries = false;
      }
    );


  }


  filterCountries($event) {
    this.loadCountries = true;
    console.log('$event.value', $event.value);
    this._countriesService.getCountriesByRegion($event.value).subscribe(
      (respuesta) => {
        // usando lodash
        // .differenceBy(lista_actual, lista_comparar, validacion de comparacion)  // restara de la lista actual, los valores de lista_comprar
        this.listCountries = _.differenceBy(respuesta, this.listCountriesToVisit, c => c.name);
      }, () => {
      },
      () => {
        this.loadCountries = false;
      }
    );
  }


  drop(event: CdkDragDrop<Country[]>) {
    // Solo si fuera una lista vertical
    // moveItemInArray(this.listCountries, event.previousIndex, event.currentIndex);

    // Al ser dos listas
    // Verifica si el movimiento es en la misma lista, lo apila, en caso contrario lo tranfiere
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    console.log('event', event);
  }
}
