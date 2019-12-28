import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { TransactionExtUpdateComponent } from 'app/entities/transaction-ext/transaction-ext-update.component';
import { TransactionExtService } from 'app/entities/transaction-ext/transaction-ext.service';
import { TransactionExt } from 'app/shared/model/transaction-ext.model';

describe('Component Tests', () => {
  describe('TransactionExt Management Update Component', () => {
    let comp: TransactionExtUpdateComponent;
    let fixture: ComponentFixture<TransactionExtUpdateComponent>;
    let service: TransactionExtService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [TransactionExtUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TransactionExtUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionExtUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionExtService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TransactionExt(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TransactionExt();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
