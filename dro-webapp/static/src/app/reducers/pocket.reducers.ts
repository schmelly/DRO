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
    <https://github.com/schmelly/DRO/tree/master/dro-webapp> or
    <http://www.gnu.org/licenses/>.
*/
import { REINITIALIZE_POCKET, SET_POCKET_POINTS, SET_POCKET_FINISHING_MODE } from '../actions/pocket.actions';
import { IPoint } from './points.reducers';

export interface IPocket {
    p1: IPoint;
    p2: IPoint;
    millRadius: number;
    roughingOffset: number;
    roughing: boolean;
}

export interface IPocketState {
    pocket: IPocket;
}

export const INITIAL_POCKET_STATE: IPocketState = {
    pocket: {
        p1: { name: 'p1', x: 0, y: 0, z: 0 },
        p2: { name: 'p2', x: 0, y: 0, z: 0 },
        millRadius: 2.0,
        roughingOffset: 0.25,
        roughing: true
    }
};

export function pocketReducer(state: IPocketState = INITIAL_POCKET_STATE, action): IPocketState {



    switch (action.type) {
        case REINITIALIZE_POCKET:
            return action.pocket;
        case SET_POCKET_POINTS:
            let stateCopy: IPocketState = Object.assign({}, state);
            stateCopy.pocket.p1 = action.p1;
            stateCopy.pocket.p2 = action.p2;
            return stateCopy;
        case SET_POCKET_FINISHING_MODE:
            stateCopy = Object.assign({}, state);
            stateCopy.pocket.roughing = action.roughing;
            return stateCopy;
    }

    return state;
}
