import {AbstractControl} from "@angular/forms";

/**
 * Created by dshin on 10/1/16.
 */
export class PasswordChange {

    public password: AbstractControl;
    public newPassword: AbstractControl;
    public confirmPassword: AbstractControl;


    constructor() {
    }
}
