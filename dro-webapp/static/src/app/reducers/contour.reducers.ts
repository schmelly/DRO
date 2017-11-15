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
import { REINITIALIZE_CONTOUR, SET_CONTOUR_POINTS, SET_CONTOUR_FINISHING_MODE } from '../actions/contour.actions';
import { IPoint } from './points.reducers';

export interface IContour {
    p1: IPoint;
    p2: IPoint;
    millRadius: number;
    roughingOffset: number;
    roughing: boolean;
}

export interface IContourState {
    contour: IContour;
}

export const INITIAL_CONTOUR_STATE: IContourState = {
    contour: {
        p1: { name: 'p1', x: 0, y: 0, z: 0 },
        p2: { name: 'p2', x: 0, y: 0, z: 0 },
        millRadius: 2.0,
        roughingOffset: 0.25,
        roughing: true
    }
};

export function contourReducer(state: IContourState = INITIAL_CONTOUR_STATE, action): IContourState {

    switch (action.type) {
        case REINITIALIZE_CONTOUR:
            return action.contour;
        case SET_CONTOUR_POINTS:
            let stateCopy: IContourState = Object.assign({}, state);
            stateCopy.contour.p1 = action.p1;
            stateCopy.contour.p2 = action.p2;
            return stateCopy;
        case SET_CONTOUR_FINISHING_MODE:
            stateCopy = Object.assign({}, state);
            stateCopy.contour.roughing = action.roughing;
            return stateCopy;
    }

    return state;
}
