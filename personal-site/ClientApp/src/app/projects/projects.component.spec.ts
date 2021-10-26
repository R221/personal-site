/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ProjectsComponent } from './projects.component';

let component: ProjectsComponent;
let fixture: ComponentFixture<ProjectsComponent>;

describe('projects component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ProjectsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});