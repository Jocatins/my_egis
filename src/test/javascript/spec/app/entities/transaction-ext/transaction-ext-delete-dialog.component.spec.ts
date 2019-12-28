import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { TransactionExtDeleteDialogComponent } from 'app/entities/transaction-ext/transaction-ext-delete-dialog.component';
import { TransactionExtService } from 'app/entities/transaction-ext/transaction-ext.service';

describe('Component Tests', () => {
  describe('TransactionExt Management Delete Component', () => {
    let comp: TransactionExtDeleteDialogComponent;
    let fixture: ComponentFixture<TransactionExtDeleteDialogComponent>;
    let service: TransactionExtService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [TransactionExtDeleteDialogComponent]
      })
        .overrideTemplate(TransactionExtDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransactionExtDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionExtService);
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
