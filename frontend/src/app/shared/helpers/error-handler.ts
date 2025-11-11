import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';

  if (error.status === 0) {
    errorMessage = `Network or client error: ${error.message || error.error}`;
  } else {
    errorMessage = `Backend returned code ${error.status}, body was: ${JSON.stringify(
      error.error,
    )}`;
  }

  console.error(errorMessage);
  return throwError(() => new Error(errorMessage));
}
