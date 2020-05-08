import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { MetadataDeleteDialogComponent } from 'app/entities/metadata/metadata-delete-dialog.component';
import { MetadataService } from 'app/entities/metadata/metadata.service';

describe('Component Tests', () => {
  describe('Metadata Management Delete Component', () => {
    let comp: MetadataDeleteDialogComponent;
    let fixture: ComponentFixture<MetadataDeleteDialogComponent>;
    let service: MetadataService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [MetadataDeleteDialogComponent]
      })
        .overrideTemplate(MetadataDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MetadataDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetadataService);
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
