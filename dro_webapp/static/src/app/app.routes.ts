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
import { Routes, RouterModule } from '@angular/router';
import {CalculatorComponent} from "./calculator/calculator.component";
import {ConfigurationComponent} from "./configuration/configuration.component";
import {PocketComponent} from "./pocket/pocket.component";
import {PointsComponent} from "./points/points.component";
import {MidpointComponent} from "./midpoint/midpoint.component";
import {HolesComponent} from "./holes/holes.component";

export const ROUTE_CONFIG: Routes = [
    {
        path: '',
        redirectTo: 'calculator',
        pathMatch: 'full'
    },
    {
        path: 'calculator',
        component: CalculatorComponent
    },
    {
        path: 'configuration',
        component: ConfigurationComponent
    },
    {
        path: 'pocket',
        component: PocketComponent
    },
    {
        path: 'points',
        component: PointsComponent
    },
    {
        path: 'midpoint',
        component: MidpointComponent
    },
    {
        path: 'holes',
        component: HolesComponent
    },
    {
        path: '**',
        redirectTo: 'calculator'
    }
];

export const AppRoutesModule = RouterModule.forRoot(ROUTE_CONFIG);
