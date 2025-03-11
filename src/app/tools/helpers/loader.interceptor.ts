import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Only show loader for POST requests
    const isPostRequest = request.method === 'POST';

    if (isPostRequest) {
      this.loaderService.show();
    }

    return next.handle(request).pipe(
      finalize(() => {
        if (isPostRequest) {
          this.loaderService.hide();
        }
      }),
    );
  }

}
