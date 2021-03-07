import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  /** User basic credentials form */
  private form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  });

  /** Email control */
  public get email() {
    return this.form.get("email") as FormControl;
  }

  /** Password control */
  public get password() {
    return this.form.get("password") as FormControl;
  }

  constructor(private auth: AuthService) {}

  /** Login in the panel */
  public async login() {
    if (this.form.invalid) {
      console.log("form invalid");
      console.log(this.form);
      return;
    }

    await this.auth.login(this.form.value);
  }
}
