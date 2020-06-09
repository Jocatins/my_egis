import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EgisexternalTestModule } from '../../../test.module';
import { YearSubscriptionComponent } from 'app/entities/year-subscription/year-subscription.component';
import { YearSubscriptionService } from 'app/entities/year-subscription/year-subscription.service';
import { YearSubscription } from 'app/shared/model/year-subscription.model';

describe('Component Tests', () => {
  describe('YearSubscription Management Component', () => {
    let comp: YearSubscriptionComponent;
    let fixture: ComponentFixture<YearSubscriptionComponent>;
    let service: YearSubscriptionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [YearSubscriptionComponent],
        providers: []
      })
        .overrideTemplate(YearSubscriptionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(YearSubscriptionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(YearSubscriptionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new YearSubscription(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.yearSubscriptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
