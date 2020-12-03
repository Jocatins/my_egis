import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EgisexternalTestModule } from '../../../test.module';
import { TitleSelectOptionsComponent } from 'app/entities/title-select-options/title-select-options.component';
import { TitleSelectOptionsService } from 'app/entities/title-select-options/title-select-options.service';
import { TitleSelectOptions } from 'app/shared/model/title-select-options.model';

describe('Component Tests', () => {
  describe('TitleSelectOptions Management Component', () => {
    let comp: TitleSelectOptionsComponent;
    let fixture: ComponentFixture<TitleSelectOptionsComponent>;
    let service: TitleSelectOptionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [TitleSelectOptionsComponent],
        providers: []
      })
        .overrideTemplate(TitleSelectOptionsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleSelectOptionsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TitleSelectOptionsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TitleSelectOptions(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.titleSelectOptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
