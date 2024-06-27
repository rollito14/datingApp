import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    BsDropdownModule,
    TitleCasePipe,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  private toastr = inject(ToastrService);

  constructor(
    public accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit() {}

  login() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: (_) => {
        void this.router.navigateByUrl('/members');
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }
  logout() {
    this.accountService.logout();
    void this.router.navigateByUrl('/');
  }
}
