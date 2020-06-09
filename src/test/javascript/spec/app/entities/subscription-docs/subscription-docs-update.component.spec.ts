import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { SubscriptionDocsUpdateComponent } from 'app/entities/subscription-docs/subscription-docs-update.component';
import { SubscriptionDocsService } from 'app/entities/subscription-docs/subscription-docs.service';
import { SubscriptionDocs } from 'app/shared/model/subscription-docs.model';

describe('Component Tests', () => {
  describe('SubscriptionDocs Management Update Component', () => {
    let comp: SubscriptionDocsUpdateComponent;
    let fixture: ComponentFixture<SubscriptionDocsUpdateComponent>;
    let service: SubscriptionDocsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SubscriptionDocsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SubscriptionDocsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptionDocsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionDocsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubscriptionDocs(123);
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
        const entity = new SubscriptionDocs();
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
