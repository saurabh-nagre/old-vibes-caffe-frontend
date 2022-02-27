import { TestBed } from '@angular/core/testing';

import { FirestoreUploadService } from './firestore-upload.service';

describe('FirestoreUploadService', () => {
  let service: FirestoreUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
