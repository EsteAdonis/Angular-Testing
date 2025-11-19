import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created the loggerService', () => {
    expect(service).toBeTruthy();
  });

	it('should add a message to the loggerSevice', () => {
		service.log('Greetings Adonis');
		expect(service.message.length).toBe(1);
	})

	it('should call clearn method to remove all the messages', () => {
		service.clear();
		expect(service.message.length).toBe(0);
	})
});
