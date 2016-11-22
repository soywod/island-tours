import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http } from "@angular/http";

@Component({
	selector   : 'island-form',
	templateUrl: './island-form.component.html',
	styleUrls  : ['./island-form.component.less']
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
	
	isSubmitting: boolean;
	hasBeenSubmitted: boolean;
	submitError: string;
	
	captcha: string;
	
	constructor(private fb: FormBuilder, private http: Http) {
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
			'email'     : this.emailCtrl,
		});
		
		this.isSubmitting = false;
		this.hasBeenSubmitted = false;
		this.submitError = undefined;
		this.captcha = '';
	}
	
	isInvalid(ctrl: FormControl): boolean {
		return ctrl.dirty && ctrl.invalid;
	}
	
	hasError(ctrl: FormControl, error: string): boolean {
		return ctrl.dirty && ctrl.hasError(error);
	}
	
	send() {
		const formData = new FormData();
		
		this.isSubmitting = true;
		
		for (let index in this.userForm.value) {
			formData.append(index, this.userForm.value[index]);
		}
		
		formData.append('g-recaptcha-response', this.captcha);
		
		this
			.http
			.post(`/api/save.php`, formData)
			.subscribe(res => {
				let data = res.json();
				console.log(data);
				
				if (!data.success) {
					this.submitError = data.data;
				}
				else {
					this.userForm.reset();
					this.countryCtrl.reset('');
					this.hasBeenSubmitted = true;
				}
				
				this.isSubmitting = false;
			});
	}
	
	onCaptchaValidated(payload) {
		this.captcha = payload;
	}
	
	isSubmitDisabled() {
		return this.userForm.invalid || this.isSubmitting || this.captcha === '';
	}
	
	getSubmitText() {
		return this.isSubmitting ? 'envoi en cours ...' : "c'est parti";
	}
	
	getError() {
		return this.submitError;
	}
}
