import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { SupportingDocumentUpdateComponent } from 'app/entities/supporting-document/supporting-document-update.component';
import { SupportingDocumentService } from 'app/entities/supporting-document/supporting-document.service';
import { SupportingDocument } from 'app/shared/model/supporting-document.model';

describe('Component Tests', () => {
  describe('SupportingDocument Management Update Component', () => {
    let comp: SupportingDocumentUpdateComponent;
    let fixture: ComponentFixture<SupportingDocumentUpdateComponent>;
    let service: SupportingDocumentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SupportingDocumentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SupportingDocumentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupportingDocumentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupportingDocumentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SupportingDocument(123);
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
        const entity = new SupportingDocument();
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
