import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { EscalateContactUpdateComponent } from 'app/entities/escalate-contact/escalate-contact-update.component';
import { EscalateContactService } from 'app/entities/escalate-contact/escalate-contact.service';
import { EscalateContact } from 'app/shared/model/escalate-contact.model';

describe('Component Tests', () => {
  describe('EscalateContact Management Update Component', () => {
    let comp: EscalateContactUpdateComponent;
    let fixture: ComponentFixture<EscalateContactUpdateComponent>;
    let service: EscalateContactService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [EscalateContactUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EscalateContactUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EscalateContactUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EscalateContactService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EscalateContact(123);
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
        const entity = new EscalateContact();
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
