import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CitiesComponent } from './cities.component';
import { ClientService } from '../../services/services/client.service';
import { City } from '../../model/City';

describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;
  let mockClientService: jasmine.SpyObj<ClientService>;

  beforeEach(async () => {
    mockClientService = jasmine.createSpyObj('ClientService', ['getCities']);

    await TestBed.configureTestingModule({
      declarations: [CitiesComponent],
      providers: [{ provide: ClientService, useValue: mockClientService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch cities on init', () => {
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
    mockClientService.getCities.and.returnValue(of(mockCities));

    fixture.detectChanges();

    expect(component.citiesList).toEqual(mockCities);
    expect(mockClientService.getCities).toHaveBeenCalled();
  });

  it('should initialize map', () => {
    spyOn(component, 'initializeMap');
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
    mockClientService.getCities.and.returnValue(of(mockCities));

    fixture.detectChanges();

    expect(component.initializeMap).toHaveBeenCalled();
  });

  it('should add markers to the map', () => {
    spyOn(component, 'addMarkers');
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
    mockClientService.getCities.and.returnValue(of(mockCities));

    fixture.detectChanges();

    expect(component.addMarkers).toHaveBeenCalled();
  });
});
