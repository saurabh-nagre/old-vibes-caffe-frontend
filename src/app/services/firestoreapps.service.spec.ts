import { TestBed } from '@angular/core/testing';

import { FirestoreappsService } from './firestoreapps.service';

describe('FirestoreappsService', () => {
  let service: FirestoreappsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreappsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
