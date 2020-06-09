import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { YearSubscriptionUpdateComponent } from 'app/entities/year-subscription/year-subscription-update.component';
import { YearSubscriptionService } from 'app/entities/year-subscription/year-subscription.service';
import { YearSubscription } from 'app/shared/model/year-subscription.model';

describe('Component Tests', () => {
  describe('YearSubscription Management Update Component', () => {
    let comp: YearSubscriptionUpdateComponent;
    let fixture: ComponentFixture<YearSubscriptionUpdateComponent>;
    let service: YearSubscriptionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [YearSubscriptionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(YearSubscriptionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(YearSubscriptionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(YearSubscriptionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new YearSubscription(123);
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
        const entity = new YearSubscription();
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
