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
import {REINITIALIZE_POINTS} from '../actions/points.actions';

export interface IPoints {
}

export interface IPointsState {
    points: IPoints;
};

export const INITIAL_POINTS_STATE:IPointsState = {
  points: {}
};

export function pointsReducer(state:IPointsState = INITIAL_POINTS_STATE, action): IPointsState {
    
    var stateCopy:IPointsState = Object.assign({}, state);
    var calc:IPoints = stateCopy.points;

    switch(action.type) {
        case REINITIALIZE_POINTS:
            return action.points
    }

    return stateCopy;
};
