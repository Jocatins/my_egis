import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { SupportingDocumentDetailComponent } from 'app/entities/supporting-document/supporting-document-detail.component';
import { SupportingDocument } from 'app/shared/model/supporting-document.model';

describe('Component Tests', () => {
  describe('SupportingDocument Management Detail Component', () => {
    let comp: SupportingDocumentDetailComponent;
    let fixture: ComponentFixture<SupportingDocumentDetailComponent>;
    const route = ({ data: of({ supportingDocument: new SupportingDocument(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SupportingDocumentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SupportingDocumentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SupportingDocumentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.supportingDocument).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
