import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Gender } from 'src/app/shared/gender.int';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user = new User();

  formBuilder = new FormBuilder();
  form: FormGroup;
  genders: Gender[] = [
    { value: 'male', name: 'Erkek' },
    { value: 'female', name: 'Kadın' }
  ];


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
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
    console.log('User: ', this.user);
    this.authService.registerUser(this.user);
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

}
