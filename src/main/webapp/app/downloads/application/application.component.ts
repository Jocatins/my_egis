import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../dashboard/dashboard.service'
import { Trans } from 'app/application/model/trans.model';
import { Download } from '../model/download.model';
import { Router } from '@angular/router';
import { FormDataService } from '../data/formData.service';
import { Application } from '../data/formData.model';

@Component({
  selector: 'jhi-page-one',
  templateUrl: './application.component.html',
  styleUrls: [
    'application.component.scss'
  ]
})
export class ApplicationComponent implements OnInit {

  trans: Trans[];
  download =[ ] as Download;
  application: Application;
  form: any

  constructor(private router: Router,
    private httpClient: HttpClient,
      private dashboardService: DashboardService,
      private formDataService: FormDataService ) {
  }

  ngOnInit() {
   // this.dashboardService.
   this.trans = []
   this.application = this.formDataService.getApplication()
   this.dashboardService.transinfoWithGroup('REGISTRY').subscribe(
     (data)=>{
      this.trans = data.body;
     }
   )
  }

  save(form: any): boolean {
    if (!form.valid) {
        return false;
    }

    this.formDataService.setApplication(this.application);
    return true;
}

  getApplication(form: any){
    if (this.save(form)) {
      this.router.navigate(['/downloads/parameters']);
    }
  }

}
