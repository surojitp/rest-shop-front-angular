import { TestBed, inject } from '@angular/core/testing';

import { RouterExtServiceService } from './router-ext-service.service';

describe('RouterExtServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterExtServiceService]
    });
  });

  it('should be created', inject([RouterExtServiceService], (service: RouterExtServiceService) => {
    expect(service).toBeTruthy();
  }));
});
