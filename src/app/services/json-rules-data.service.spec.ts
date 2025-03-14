import { TestBed } from '@angular/core/testing';

import { JsonRulesDataService } from './json-rules-data.service';

describe('JsonRulesDataService', () => {
  let service: JsonRulesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonRulesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
