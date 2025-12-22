import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map, switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [TranslateModule, LoadingSpinnerComponent],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css',
})
export class SocialComponent implements OnInit {
  route = inject(ActivatedRoute);
  token: string | null = null;
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit() {
    this.route.fragment
      .pipe(
        map(fragment => {
          const params = new URLSearchParams(fragment ?? '');
          const token = params.get('token');
          return token;
        }),
        filter((token): token is string => {
          if (!token) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        }),
        switchMap(token => this.authService.socialLogin(token))
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.router.navigate(['/']);
        },
      });
  }
}
