import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IslandFormComponent } from './island-form/island-form.component';
import { ReCaptchaModule } from "angular2-recaptcha";

@NgModule({
	declarations: [
		AppComponent,
		IslandFormComponent
	],
	imports     : [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		ReCaptchaModule
	],
	providers   : [ FormBuilder ],
	bootstrap   : [ AppComponent ]
})
export class AppModule {
}
