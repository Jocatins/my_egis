import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EgisexternalTestModule } from '../../../test.module';
import { EscalateContactComponent } from 'app/entities/escalate-contact/escalate-contact.component';
import { EscalateContactService } from 'app/entities/escalate-contact/escalate-contact.service';
import { EscalateContact } from 'app/shared/model/escalate-contact.model';

describe('Component Tests', () => {
  describe('EscalateContact Management Component', () => {
    let comp: EscalateContactComponent;
    let fixture: ComponentFixture<EscalateContactComponent>;
    let service: EscalateContactService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [EscalateContactComponent],
        providers: []
      })
        .overrideTemplate(EscalateContactComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EscalateContactComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EscalateContactService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EscalateContact(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.escalateContacts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
