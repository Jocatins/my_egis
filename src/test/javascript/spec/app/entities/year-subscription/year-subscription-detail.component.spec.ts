import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { YearSubscriptionDetailComponent } from 'app/entities/year-subscription/year-subscription-detail.component';
import { YearSubscription } from 'app/shared/model/year-subscription.model';

describe('Component Tests', () => {
  describe('YearSubscription Management Detail Component', () => {
    let comp: YearSubscriptionDetailComponent;
    let fixture: ComponentFixture<YearSubscriptionDetailComponent>;
    const route = ({ data: of({ yearSubscription: new YearSubscription(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [YearSubscriptionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(YearSubscriptionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(YearSubscriptionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.yearSubscription).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
