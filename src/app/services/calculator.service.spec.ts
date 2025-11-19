import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;
  let mockLoggerService: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService, { provide: LoggerService, useValue: mockLoggerService }
      ]
    });
    calculatorService = TestBed.inject(CalculatorService);
	  mockLoggerService = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;		
  });

  it('should CalculatorService be created', () => {
    expect(calculatorService).toBeTruthy();
  });
	
	it('should call add and return 10', () => {
		expect(calculatorService.add(2, 8)).toBe(10);
	})

	it('should substract two numbers', () => {
		expect(calculatorService.substract(10,8)).toBe(2);
	})

	it('should call add method and then call the log service once', () => {
		expect(calculatorService.add(2,8)).toBe(10);
		expect(mockLoggerService.log).toHaveBeenCalledTimes(1);		
	})

	it('should call substract method and the call the log service once', () => {
		expect(calculatorService.add(2,8)).toBe(10);
		expect(mockLoggerService.log).toHaveBeenCalled();
	})

	xit('should test the setup() function', () => {
		const { calculator, loggerServiceSpy } = setUp();
		expect(calculator.add(6,4)).toBe(10);
		expect(calculator.substract(10,2)).toBe(8);
		expect(loggerServiceSpy.log).toHaveBeenCalledTimes(2);
	})
});



function setUp() {
	const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
	TestBed.configureTestingModule({
		providers: [CalculatorService, {provide: LoggerService, useValue: mockLoggerService} ]
	});
	const calculator = TestBed.inject(CalculatorService);
	const loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
	return { calculator, loggerServiceSpy}
};
