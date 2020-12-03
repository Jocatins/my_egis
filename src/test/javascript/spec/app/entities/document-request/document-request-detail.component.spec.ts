import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { DocumentRequestDetailComponent } from 'app/entities/document-request/document-request-detail.component';
import { DocumentRequest } from 'app/shared/model/document-request.model';

describe('Component Tests', () => {
  describe('DocumentRequest Management Detail Component', () => {
    let comp: DocumentRequestDetailComponent;
    let fixture: ComponentFixture<DocumentRequestDetailComponent>;
    const route = ({ data: of({ documentRequest: new DocumentRequest(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [DocumentRequestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DocumentRequestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentRequestDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.documentRequest).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
