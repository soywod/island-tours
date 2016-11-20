import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
	selector   : 'island-form',
	templateUrl: './island-form.component.html',
	styleUrls  : [ './island-form.component.less' ]
})
export class IslandFormComponent {
	userForm: FormGroup;
	
	firstNameCtrl: FormControl;
	lastNameCtrl: FormControl;
	addressCtrl: FormControl;
	zipCtrl: FormControl;
	cityCtrl: FormControl;
	countryCtrl: FormControl;
	emailCtrl: FormControl;
	
	constructor(fb: FormBuilder) {
		this.firstNameCtrl = fb.control('', Validators.required);
		this.lastNameCtrl = fb.control('', Validators.required);
		this.addressCtrl = fb.control('', Validators.required);
		this.cityCtrl = fb.control('', Validators.required);
		this.countryCtrl = fb.control('', Validators.required);
		
		this.zipCtrl = fb.control('', Validators.compose([
			Validators.required,
			Validators.pattern(/^[0-9]{5}$/)
		]));
		
		this.emailCtrl = fb.control('', Validators.compose([
			Validators.required,
			Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
		]));
		
		this.userForm = fb.group({
			'first-name': this.firstNameCtrl,
			'last-name' : this.lastNameCtrl,
			'address'   : this.addressCtrl,
			'zip'       : this.zipCtrl,
			'city'      : this.cityCtrl,
			'country'   : this.countryCtrl,
			'email'     : this.emailCtrl
		});
	}
	
	isInvalid(ctrl: FormControl): boolean {
		return ctrl.dirty && ctrl.invalid;
	}
	
	hasError(ctrl: FormControl, error: string): boolean {
		return ctrl.dirty && ctrl.hasError(error);
	}
	
	send() {
		console.log(this.userForm.value);
	}
}
