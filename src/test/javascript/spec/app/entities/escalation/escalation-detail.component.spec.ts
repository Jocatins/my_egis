import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { EscalationDetailComponent } from 'app/entities/escalation/escalation-detail.component';
import { Escalation } from 'app/shared/model/escalation.model';

describe('Component Tests', () => {
  describe('Escalation Management Detail Component', () => {
    let comp: EscalationDetailComponent;
    let fixture: ComponentFixture<EscalationDetailComponent>;
    const route = ({ data: of({ escalation: new Escalation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [EscalationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EscalationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EscalationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.escalation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
