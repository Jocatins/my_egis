import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EgisexternalTestModule } from '../../../test.module';
import { EscalationComponent } from 'app/entities/escalation/escalation.component';
import { EscalationService } from 'app/entities/escalation/escalation.service';
import { Escalation } from 'app/shared/model/escalation.model';

describe('Component Tests', () => {
  describe('Escalation Management Component', () => {
    let comp: EscalationComponent;
    let fixture: ComponentFixture<EscalationComponent>;
    let service: EscalationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [EscalationComponent],
        providers: []
      })
        .overrideTemplate(EscalationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EscalationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EscalationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Escalation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.escalations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
