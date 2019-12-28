import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { SurveyorUpdateComponent } from 'app/entities/surveyor/surveyor-update.component';
import { SurveyorService } from 'app/entities/surveyor/surveyor.service';
import { Surveyor } from 'app/shared/model/surveyor.model';

describe('Component Tests', () => {
  describe('Surveyor Management Update Component', () => {
    let comp: SurveyorUpdateComponent;
    let fixture: ComponentFixture<SurveyorUpdateComponent>;
    let service: SurveyorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SurveyorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SurveyorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SurveyorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SurveyorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Surveyor(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Surveyor();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
