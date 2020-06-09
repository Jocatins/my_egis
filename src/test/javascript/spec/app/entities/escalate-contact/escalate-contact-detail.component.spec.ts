import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { EscalateContactDetailComponent } from 'app/entities/escalate-contact/escalate-contact-detail.component';
import { EscalateContact } from 'app/shared/model/escalate-contact.model';

describe('Component Tests', () => {
  describe('EscalateContact Management Detail Component', () => {
    let comp: EscalateContactDetailComponent;
    let fixture: ComponentFixture<EscalateContactDetailComponent>;
    const route = ({ data: of({ escalateContact: new EscalateContact(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [EscalateContactDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EscalateContactDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EscalateContactDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.escalateContact).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
