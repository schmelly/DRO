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
import {REINITIALIZE_CONFIGURATION, INVERT} from '../actions/configuration.actions';

export interface IConfiguration {
    invertX: boolean;
    invertY: boolean;
    invertZ: boolean;
}

export interface IConfigurationState {
    configuration: IConfiguration;
};

export const INITIAL_CONFIGURATION_STATE:IConfigurationState = {
  configuration: {
    invertX: false,
    invertY: false,
    invertZ: false,
  }
};

export function configurationReducer(state:IConfigurationState = INITIAL_CONFIGURATION_STATE, action): IConfigurationState {
    
    var stateCopy:IConfigurationState = Object.assign({}, state);
    var calc:IConfiguration = stateCopy.configuration;

    switch(action.type) {
        case REINITIALIZE_CONFIGURATION:
            return action.configuration
        case INVERT:
        switch(action.axis) {
            case 'yAxis':
            stateCopy.configuration.invertY = action.inverted;
            return stateCopy;
            case 'zAxis':
            stateCopy.configuration.invertZ = action.inverted;
            return stateCopy;
            default:
            stateCopy.configuration.invertX = action.inverted;
            return stateCopy;
        }
    }

    return state;
};
