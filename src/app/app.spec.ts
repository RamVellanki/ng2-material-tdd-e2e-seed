/// <reference path="../../typings/browser/ambient/jasmine/index.d.ts" />
import {
    iit,
    it,
    ddescribe,
    describe,
    expect,
    inject,
    async,
    beforeEach,
    beforeEachProviders,
    fakeAsync,
    tick
} from '@angular/core/testing';
import {
    ComponentFixture,
    TestComponentBuilder
} from '@angular/compiler/testing';
import {Router, ROUTER_PROVIDERS} from '@angular/router';
import { provide } from '@angular/core';
import {App} from '../app/app';

beforeEachProviders(() => [App])

describe('main app component', () => {
    var builder;

    beforeEachProviders(() => [
        App,
        provide(Router, { useValue: jasmine.createSpyObj('Router', ['navigate']) })
    ]);

    beforeEach(inject([TestComponentBuilder], (tcb) => {
        builder = tcb;
    }));


    it('should inject App component', inject([App, Router], (app) => {
        debugger;
        expect(app.myValue).toBe(42);
    }));

    // it('should have correct title', async(() => {
    //     builder.createAsync(App).then((fixture: ComponentFixture<App>) => {
    //         debugger;
    //         var compiled = fixture.debugElement.nativeElement;
    //         expect(compiled.querySelectorAll('span').length).toBe(1);
    //     });
    // }));
    
});