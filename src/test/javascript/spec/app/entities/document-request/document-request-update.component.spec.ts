import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { DocumentRequestUpdateComponent } from 'app/entities/document-request/document-request-update.component';
import { DocumentRequestService } from 'app/entities/document-request/document-request.service';
import { DocumentRequest } from 'app/shared/model/document-request.model';

describe('Component Tests', () => {
  describe('DocumentRequest Management Update Component', () => {
    let comp: DocumentRequestUpdateComponent;
    let fixture: ComponentFixture<DocumentRequestUpdateComponent>;
    let service: DocumentRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [DocumentRequestUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DocumentRequestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentRequestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentRequestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocumentRequest(123);
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
        const entity = new DocumentRequest();
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
