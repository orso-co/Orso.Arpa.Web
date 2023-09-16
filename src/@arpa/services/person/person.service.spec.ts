import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { PersonService } from './person.service';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

describe('Service: Person', () => {
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonService],
      imports: [HttpClientTestingModule, ApolloTestingModule],
    });

    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should ...', inject([PersonService], (service: PersonService) => {
    expect(service).toBeTruthy();
  }));
});
