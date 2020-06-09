import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EgisexternalTestModule } from '../../../test.module';
import { SubscriptionDocsComponent } from 'app/entities/subscription-docs/subscription-docs.component';
import { SubscriptionDocsService } from 'app/entities/subscription-docs/subscription-docs.service';
import { SubscriptionDocs } from 'app/shared/model/subscription-docs.model';

describe('Component Tests', () => {
  describe('SubscriptionDocs Management Component', () => {
    let comp: SubscriptionDocsComponent;
    let fixture: ComponentFixture<SubscriptionDocsComponent>;
    let service: SubscriptionDocsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SubscriptionDocsComponent],
        providers: []
      })
        .overrideTemplate(SubscriptionDocsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptionDocsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionDocsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SubscriptionDocs(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subscriptionDocs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
