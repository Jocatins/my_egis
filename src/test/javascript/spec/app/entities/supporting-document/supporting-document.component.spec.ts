import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EgisexternalTestModule } from '../../../test.module';
import { SupportingDocumentComponent } from 'app/entities/supporting-document/supporting-document.component';
import { SupportingDocumentService } from 'app/entities/supporting-document/supporting-document.service';
import { SupportingDocument } from 'app/shared/model/supporting-document.model';

describe('Component Tests', () => {
  describe('SupportingDocument Management Component', () => {
    let comp: SupportingDocumentComponent;
    let fixture: ComponentFixture<SupportingDocumentComponent>;
    let service: SupportingDocumentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SupportingDocumentComponent],
        providers: []
      })
        .overrideTemplate(SupportingDocumentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupportingDocumentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupportingDocumentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SupportingDocument(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.supportingDocuments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
