import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from "../reducers/app.reducers";

export const ABS_POS:string = 'ABS_POS';

@Injectable()
export class SocketActions {

  constructor(private ngRedux: NgRedux<IAppState>) {}

  absPosition(absPosition) {
    this.ngRedux.dispatch({type: ABS_POS, absPosition: absPosition});
  }
}
