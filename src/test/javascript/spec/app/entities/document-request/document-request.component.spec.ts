import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EgisexternalTestModule } from '../../../test.module';
import { DocumentRequestComponent } from 'app/entities/document-request/document-request.component';
import { DocumentRequestService } from 'app/entities/document-request/document-request.service';
import { DocumentRequest } from 'app/shared/model/document-request.model';

describe('Component Tests', () => {
  describe('DocumentRequest Management Component', () => {
    let comp: DocumentRequestComponent;
    let fixture: ComponentFixture<DocumentRequestComponent>;
    let service: DocumentRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [DocumentRequestComponent],
        providers: []
      })
        .overrideTemplate(DocumentRequestComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentRequestComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentRequestService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DocumentRequest(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.documentRequests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
