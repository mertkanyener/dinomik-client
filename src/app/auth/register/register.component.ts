import { UtilityService } from 'src/app/shared/utility.service';
import { Image } from './../../shared/image.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { Gender } from 'src/app/shared/gender.int';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user = new User();

  height = window.innerHeight;
  formBuilder = new FormBuilder();
  form: FormGroup;
  image = new Image('', null);
  imageChanged = new Subject<Image>();
  genders: Gender[] = [
    { value: 'male', name: 'Erkek' },
    { value: 'female', name: 'Kadın' }
  ];


  constructor(public authService: AuthService,
              public router: Router,
              public sanitizer: DomSanitizer,
              public utilService: UtilityService) { }

  ngOnInit() {
    this.initForm();
    this.imageChanged.subscribe(
      (image: Image) => {
        this.image = image;
      }
    );
  }

  checkPasswords(c: AbstractControl) {
    const password: string = c.get('password').value;
    const confirmPassword: string = c.get('confirmPassword').value;
    if  (password !== confirmPassword) {
      c.get('confirmPassword').setErrors({ 'NoPassMatch' : true });
    }
  }

  emailValidation(c: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors>{
    return this.authService.doesEmailExist(c.value);
  }

  onRegister() {
    const value = this.form.value;
    this.user.firstName = value.firstName;
    this.user.lastName = value.lastName;
    this.user.email = value.email;
    this.user.password = value.passwords.password;
    this.user.gender = value.gender;
    const birthDate: Date = value.birthDate;
    this.user.birthDate = birthDate.toISOString().split('T')[0];
    if (this.image !== null) {
      this.us
    }
    console.log('User: ', this.user);
    this.authService.registerUser(this.user);
    this.router.navigate(['/giris-yap']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }


  private initForm() {
    this.form = this.formBuilder.group({
      firstName: ['',[Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z]*')]],
      email: [null, [Validators.required, Validators.email], this.emailValidation.bind(this)],
      passwords: this.formBuilder.group({
        password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
        confirmPassword: [null]
      }, { validator: this.checkPasswords }),
      gender: null,
      birthDate: null
    });
  }

  changeListener($event) {
    this.utilService.readImage($event.target, this.imageChanged, this.sanitizer, this.image);
  }


}
