import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { TitleSelectOptionsDeleteDialogComponent } from 'app/entities/title-select-options/title-select-options-delete-dialog.component';
import { TitleSelectOptionsService } from 'app/entities/title-select-options/title-select-options.service';

describe('Component Tests', () => {
  describe('TitleSelectOptions Management Delete Component', () => {
    let comp: TitleSelectOptionsDeleteDialogComponent;
    let fixture: ComponentFixture<TitleSelectOptionsDeleteDialogComponent>;
    let service: TitleSelectOptionsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [TitleSelectOptionsDeleteDialogComponent]
      })
        .overrideTemplate(TitleSelectOptionsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitleSelectOptionsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TitleSelectOptionsService);
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
