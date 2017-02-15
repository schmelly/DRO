import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from "../reducers/app.reducers";

export const ABS_POS:string = 'ABS_POS';

@Injectable()
export class SocketActions {

  constructor(private ngRedux: NgRedux<IAppState>) {}

  absPosition(absPosition) {
    if(this.ngRedux.getState().configuration.configuration.invertX) {
      absPosition.data.X = -absPosition.data.X;
    }
    if(this.ngRedux.getState().configuration.configuration.invertY) {
      absPosition.data.Y = -absPosition.data.Y;
    }
    if(this.ngRedux.getState().configuration.configuration.invertZ) {
      absPosition.data.Z = -absPosition.data.Z;
    }
    this.ngRedux.dispatch({type: ABS_POS, absPosition: absPosition});
  }
}
