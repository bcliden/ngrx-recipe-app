import { TestBed, async, inject } from '@angular/core/testing';

import { UuidGuard } from './uuid.guard';

describe('UuidGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UuidGuard]
    });
  });

  it('should ...', inject([UuidGuard], (guard: UuidGuard) => {
    expect(guard).toBeTruthy();
  }));
});
