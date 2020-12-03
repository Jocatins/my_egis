import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { TitleSelectOptionsUpdateComponent } from 'app/entities/title-select-options/title-select-options-update.component';
import { TitleSelectOptionsService } from 'app/entities/title-select-options/title-select-options.service';
import { TitleSelectOptions } from 'app/shared/model/title-select-options.model';

describe('Component Tests', () => {
  describe('TitleSelectOptions Management Update Component', () => {
    let comp: TitleSelectOptionsUpdateComponent;
    let fixture: ComponentFixture<TitleSelectOptionsUpdateComponent>;
    let service: TitleSelectOptionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [TitleSelectOptionsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TitleSelectOptionsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleSelectOptionsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TitleSelectOptionsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TitleSelectOptions(123);
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
        const entity = new TitleSelectOptions();
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
