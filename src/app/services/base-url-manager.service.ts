import { Injectable } from '@angular/core';
import { HashLocationStrategy } from '@angular/common';

@Injectable()
export class BaseUrlManagerService extends HashLocationStrategy {

  /**
   * This service is used to construct application URL using HashLocationStrategy.
   * It can be used for independent Angular application and also
   * if more then one Angular application is used and
   * loading of applications is decided by base URL through node.js.
   */

  prepareExternalUrl(internal: string): string {
    return this.getBaseHref() + '#' + internal;
  }

}
