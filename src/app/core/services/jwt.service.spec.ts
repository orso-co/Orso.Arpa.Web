import { RoleNames } from './../../model/roleNames';
import { TestBed } from '@angular/core/testing';

import { JwtService } from './jwt.service';
import { NotificationsService } from './notifications.service';
import { NotificationsMockService } from '../../../testing/notifications.mock.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtService,
        { provides: NotificationsService, useClass: NotificationsMockService },
      ],
    });
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should decode token', () => {
    const decodedToken = service.decode(
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.' +
      'eyJuYW1laWQiOiJhZG1pbiIsIm5hbWUiOiJJbml0aWFsIEFkbWluIiwic3ViIjoiYjliYTE0NjctYWQ2Zi00MGU1LWEwYzYtZjQ4MjM5M2I3Z' +
      'mViIiwiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMS9wZXJzb25faWQiOiI1NmVkN2MyMC1iYTc4LTRhMDItOTM2ZS01ZTg0MGVmMDc0OGMiLCJyb2xlI' +
      'joiQWRtaW4iLCJuYmYiOjE2MjA1NDQwNjQsImV4cCI6MTYyMDU3Mjg2NCwiaWF0IjoxNjIwNTQ0MDY0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo' +
      '1MDAxIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.1rDAjDbmyNn8GvbiuLI5TayMMrpb0CW29W-2Kc0X-CvhceVKu6slZYBGtLz_' +
      'BO35NHn4yhkbj9L9Sn6VCBRavw',
    );
    const expectedToken = {
      audience: 'https://localhost:5001',
      issuer: 'https://localhost:5001',
      username: 'admin',
      displayName: 'Initial Admin',
      roles: [RoleNames.admin],
      userId: 'b9ba1467-ad6f-40e5-a0c6-f482393b7feb',
      personId: '56ed7c20-ba78-4a02-936e-5e840ef0748c',
      expiryDate: new Date(1620572864000),
      creationDate: new Date(1620544064000),
    };
    expect(decodedToken).toEqual(expectedToken);
  });
});
