import { TestBed } from '@angular/core/testing';

import { ApiserInterceptor } from './apiser.interceptor';

describe('ApiserInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiserInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiserInterceptor = TestBed.inject(ApiserInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
