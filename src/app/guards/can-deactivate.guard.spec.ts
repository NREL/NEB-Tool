import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';

import { CanComponentDeactivate, CanDeactivateGuard } from './can-deactivate.guard';

describe('canDeactivateGuard', () => {
  let guard: CanDeactivateGuard;
  const executeGuard = (...guardParameters: [CanComponentDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterStateSnapshot]) => 
      TestBed.runInInjectionContext(() => guard.canDeactivate(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
