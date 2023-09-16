import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

describe('Service: Project', () => {
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService],
      imports: [HttpClientTestingModule, ApolloTestingModule],
    });

    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should ...', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
