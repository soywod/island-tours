/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IslandFormComponent } from './island-form.component';

describe('IslandFormComponent', () => {
	let component: IslandFormComponent;
	let fixture: ComponentFixture<IslandFormComponent>;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ IslandFormComponent ]
		})
		.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(IslandFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
