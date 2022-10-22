import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, NgZone } from "@angular/core";

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    constructor(private zone: NgZone) {
        super();
    }

    override handleError(error: any): void {
        if(! (error instanceof HttpErrorResponse)) {
            error = error.rejection;
        }

        console.error('Error from global error handler', error);
        console.log(`Caught error ${error?.message}, ${error?.status}`);
    }
}