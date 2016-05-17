import {Component, provide} from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LocationStrategy, Location, APP_BASE_HREF,
    HashLocationStrategy } from '@angular/common';
import {Home} from './components/home/home';
import {MdToolbar} from '@angular2-material/toolbar';

@Component({
    selector: 'app',
    templateUrl: './app/app.html',
    styleUrls: ['./app/app.css'],
    directives: [ROUTER_DIRECTIVES, MdToolbar]
})

@Routes([
    { path: "/", component: Home }
])

export class App {
    myValue:number = 42;
    constructor (private _router:Router){
        
    }
}