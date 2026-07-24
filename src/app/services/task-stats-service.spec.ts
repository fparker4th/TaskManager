import { TestBed } from '@angular/core/testing';

import { TaskStatsService } from './task-stats-service';

describe('TaskStatsService', () => {
  let service: TaskStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
