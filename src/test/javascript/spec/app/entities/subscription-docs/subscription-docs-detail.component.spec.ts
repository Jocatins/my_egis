import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { SubscriptionDocsDetailComponent } from 'app/entities/subscription-docs/subscription-docs-detail.component';
import { SubscriptionDocs } from 'app/shared/model/subscription-docs.model';

describe('Component Tests', () => {
  describe('SubscriptionDocs Management Detail Component', () => {
    let comp: SubscriptionDocsDetailComponent;
    let fixture: ComponentFixture<SubscriptionDocsDetailComponent>;
    const route = ({ data: of({ subscriptionDocs: new SubscriptionDocs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SubscriptionDocsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SubscriptionDocsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubscriptionDocsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subscriptionDocs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
