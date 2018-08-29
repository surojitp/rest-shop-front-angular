import { TestBed, inject } from '@angular/core/testing';

import { LoginRegisterServiceService } from './login-register-service.service';

describe('LoginRegisterServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRegisterServiceService]
    });
  });

  it('should be created', inject([LoginRegisterServiceService], (service: LoginRegisterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
