/// <reference path="../../typings/browser/ambient/es6-shim/index.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, provide} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router';
import { LocationStrategy, Location,
    HashLocationStrategy } from '@angular/common';

import {App} from './app';

bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);