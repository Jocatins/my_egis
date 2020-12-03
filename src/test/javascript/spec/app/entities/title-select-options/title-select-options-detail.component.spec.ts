import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { TitleSelectOptionsDetailComponent } from 'app/entities/title-select-options/title-select-options-detail.component';
import { TitleSelectOptions } from 'app/shared/model/title-select-options.model';

describe('Component Tests', () => {
  describe('TitleSelectOptions Management Detail Component', () => {
    let comp: TitleSelectOptionsDetailComponent;
    let fixture: ComponentFixture<TitleSelectOptionsDetailComponent>;
    const route = ({ data: of({ titleSelectOptions: new TitleSelectOptions(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [TitleSelectOptionsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TitleSelectOptionsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitleSelectOptionsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.titleSelectOptions).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
