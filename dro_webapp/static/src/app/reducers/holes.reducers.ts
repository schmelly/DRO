/*
    DRO WebApp

    Copyright (C) 2017 David Schmelter

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see 
    <https://github.com/schmelly/DRO/tree/master/dro_webapp> or 
    <http://www.gnu.org/licenses/>.
*/
import {REINITIALIZE_HOLES} from '../actions/holes.actions';

export interface IHoles {
}

export interface IHolesState {
    holes: IHoles;
};

export const INITIAL_HOLES_STATE:IHolesState = {
  holes: {}
};

export function holesReducer(state:IHolesState = INITIAL_HOLES_STATE, action): IHolesState {
    
    var stateCopy:IHolesState = Object.assign({}, state);
    var calc:IHoles = stateCopy.holes;

    switch(action.type) {
        case REINITIALIZE_HOLES:
            return action.holes
    }

    return stateCopy;
};
