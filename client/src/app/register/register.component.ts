import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  // usersFromHomeComponent = input.required<any>();
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
  ) {}
  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
