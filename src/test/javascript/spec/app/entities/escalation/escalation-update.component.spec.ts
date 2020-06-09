import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { EscalationUpdateComponent } from 'app/entities/escalation/escalation-update.component';
import { EscalationService } from 'app/entities/escalation/escalation.service';
import { Escalation } from 'app/shared/model/escalation.model';

describe('Component Tests', () => {
  describe('Escalation Management Update Component', () => {
    let comp: EscalationUpdateComponent;
    let fixture: ComponentFixture<EscalationUpdateComponent>;
    let service: EscalationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [EscalationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EscalationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EscalationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EscalationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Escalation(123);
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
        const entity = new Escalation();
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
