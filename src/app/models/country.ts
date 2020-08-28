import {Icountrie} from '../interfaces/icountrie';
import * as _ from 'lodash';

export class Country implements Icountrie {


  constructor(data) {
    _.set(this, 'data', data);
  }

  get name(){
    return _.get(this, 'data.name');
  }

  get flag(){
    return _.get(this, 'data.flag');
  }
}
