import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Icountrie} from '../interfaces/icountrie';
import {Country} from '../models/country';
import {Iregion} from '../interfaces/iregion';
import {Region} from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  constructor(private http: HttpClient) {
  }

  getCountriesByRegion(region): Observable<Icountrie[]> {
    const url = 'https://restcountries.eu/rest/v2/regionalbloc/' + region;
    return this.http.get<Icountrie[]>(url).pipe(
      // Usamos el map de rxjs para modificar el return del api
      // Le pasamos los datos con un map, que iterara sobre cada fila y creara una instancia de Country()
      map(data => data.map(d => new Country(d)))
    );
  }

  getAllRegions(): Observable<Iregion[]> {
    const url = '/assets/database/regions.json';

    return this.http.get<Iregion[]>(url).pipe(
      // Usamos el map de rxjs para modificar el return del json
      // Le pasamos los datos con un map, que iterara sobre cada fila y creara una instancia de Country()
      map(data => data.map(d => new Region(d)))
    );
  }

}
