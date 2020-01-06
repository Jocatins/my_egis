import {Component, OnInit} from '@angular/core';
import { ValueLabel } from '../model/valuelabel.model';
import { Download } from '../model/download.model';
import { FormDataService } from '../data/formData.service';
import { Router } from '@angular/router';
import { Parameters } from '../data/formData.model';

@Component({
  selector: 'jhi-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: [
    'parameters.component.scss'
  ]
})

export class ParametersComponent implements OnInit {

  primaryApp = [] ;
  applicantType =[] ;
  multipleParties = [];
  noIndividual = 0 as number;
  noOrganization = 0 as number;
  download =[ ] as Download;
  indOrgs = [] ;
  agentIndOrgs = [] ;
  multiples = [] ;
  form: any;
  parameters: Parameters;


  constructor(private router: Router,
    private formDataService: FormDataService ) {
  }

  ngOnInit() {
    const pm1 = new ValueLabel('Yes', 'I am an Agent');
    const pm2 = new ValueLabel('No', 'I am the Primary Applicant');
    this.primaryApp.push(pm1);
    this.primaryApp.push(pm2);

    const indOrg1 = new ValueLabel('Individual', 'Individual');
    const indOrg2 = new ValueLabel('Organization', 'Organization');
    this.indOrgs.push(indOrg1);
    this.indOrgs.push(indOrg2);

    this.agentIndOrgs.push(indOrg1);
    this.agentIndOrgs.push(indOrg2);

    const multiple1 = new ValueLabel('Yes', 'There are other parties/co-owner');
    const multiple2 = new ValueLabel('No', 'The Primary Applicant is the sole owner');

    this.multiples.push(multiple1);
    this.multiples.push(multiple2);
    this.parameters = this.formDataService.getParameters();

  }

  goBack(){
    this.router.navigate(['/downloads/appname']);
  }

  restart(){
    this.formDataService.resetFormData();
    this.router.navigate(['/downloads/appname']);
  }

  save(form: any): boolean {
    if (!form.valid) {
        return false;
    }

    this.formDataService.setParameters(this.parameters);
    return true;
  }

  getParameters(form: any){
    if (this.save(form)) {
      this.router.navigate(['/downloads/complete']);
    }
  }

}

