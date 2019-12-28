import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EgisexternalTestModule } from '../../../test.module';
import { ParcelComponent } from 'app/entities/parcel/parcel.component';
import { ParcelService } from 'app/entities/parcel/parcel.service';
import { Parcel } from 'app/shared/model/parcel.model';

describe('Component Tests', () => {
  describe('Parcel Management Component', () => {
    let comp: ParcelComponent;
    let fixture: ComponentFixture<ParcelComponent>;
    let service: ParcelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [ParcelComponent],
        providers: []
      })
        .overrideTemplate(ParcelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParcelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParcelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Parcel(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.parcels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
