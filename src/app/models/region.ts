import {Iregion} from '../interfaces/iregion';
import * as _ from 'lodash';


export class Region implements Iregion {
  constructor(data) {
    _.set(this, 'data', data);
  }

  get code() {
    return _.get(this, 'data.code');
  }

  get name() {
    return _.get(this, 'data.name');
  }

}
