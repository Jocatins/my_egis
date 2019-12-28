import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { SurveyorDeleteDialogComponent } from 'app/entities/surveyor/surveyor-delete-dialog.component';
import { SurveyorService } from 'app/entities/surveyor/surveyor.service';

describe('Component Tests', () => {
  describe('Surveyor Management Delete Component', () => {
    let comp: SurveyorDeleteDialogComponent;
    let fixture: ComponentFixture<SurveyorDeleteDialogComponent>;
    let service: SurveyorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SurveyorDeleteDialogComponent]
      })
        .overrideTemplate(SurveyorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SurveyorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SurveyorService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
