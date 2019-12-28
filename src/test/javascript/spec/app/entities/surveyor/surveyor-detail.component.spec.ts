import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { SurveyorDetailComponent } from 'app/entities/surveyor/surveyor-detail.component';
import { Surveyor } from 'app/shared/model/surveyor.model';

describe('Component Tests', () => {
  describe('Surveyor Management Detail Component', () => {
    let comp: SurveyorDetailComponent;
    let fixture: ComponentFixture<SurveyorDetailComponent>;
    const route = ({ data: of({ surveyor: new Surveyor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SurveyorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SurveyorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SurveyorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.surveyor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
