import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ClientService } from './client.service';
import { City } from '../../model/City';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService]
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cities successfully', () => {
    const mockCities: City[] = [
      {
        name: 'City 1',
        name_native: 'Native City 1',
        country: 'Country 1',
        continent: 'Continent 1',
        latitude: '0.0',
        longitude: '0.0',
        population: '1000000',
        founded: '2000',
        landmarks: ['Landmark 1', 'Landmark 2']
      },
      {
        name: 'City 2',
        name_native: 'Native City 2',
        country: 'Country 2',
        continent: 'Continent 2',
        latitude: '0.0',
        longitude: '0.0',
        population: '2000000',
        founded: '2000',
        landmarks: ['Landmark 3', 'Landmark 4']
      }
    ];

    service.getCities().subscribe((cities: City[]) => {
      expect(cities).toEqual(mockCities);
    });

    const req = httpMock.expectOne(service.citiesUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ cities: mockCities });
  });

  it('should handle errors', () => {
    const errorMessage = 'Error fetching cities';

    service.getCities().subscribe(
      () => fail('expected an error, not cities'),
      (error) => expect(error).toEqual(errorMessage)
    );

    const req = httpMock.expectOne(service.citiesUrl);
    req.error(new ErrorEvent(errorMessage));
  });
});
