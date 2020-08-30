import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { HttpParameterCodec , HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormDataService } from '../data/formData.service';
import { CustomEncoderComponent } from './customencoder.component';
import { Router } from '@angular/router';
import { MetadataService } from 'app/entities/metadata/metadata.service';

@Component({
  selector: 'jhi-complete',
  templateUrl: './complete.component.html',
  styleUrls: [
    'complete.component.scss'
  ]
})



export class CompleteComponent implements OnInit {

  message: string;
  location: string
  url: SafeResourceUrl;
  blob: any;
  b64Data: string;
  downloadName: string

// @ViewChild('downloadZipLink') private downloadZipLink: ElementRef;

  constructor(private router: Router,
    private metadata: MetadataService,
    private dashboard: DashboardService,
    private sanitizer:  DomSanitizer,
    protected http: HttpClient,
    private formDataService: FormDataService) {
    this.message = 'CompleteComponent message';
  }

  ngOnInit() {
    const code = this.formDataService.getApplication().code_;
    const laApplication =  this.formDataService.getParameters().indOrg;
    let laAgent = 'False';
    if (this.formDataService.getParameters().primary === 'No'){
      laAgent = 'True'
    }
    const usrMultiInd = this.formDataService.getParameters().noIndividual
    const srMutliOrg =this.formDataService.getParameters().noOrganization

    alert("1")
    this.dashboard.downloadWithMore(code,
      laApplication , laAgent, usrMultiInd, srMutliOrg).subscribe(
      (data)=>{
        this.blob = data.body.form
        // alert(this.blob)

        this.metadata.getByCode(code).subscribe(
          data1 =>{
            this.downloadName = data1.body[0].descr
             // alert(JSON.stringify(data1.body))
             // alert(data1.body.descr)
          }
        )
      }
    );
  }

  goBack(){
    this.router.navigate(['/downloads/parameters']);
  }

  restart(){
    this.formDataService.resetFormData();
    this.router.navigate(['/downloads/appname']);
  }


  getFile(){

    this.formDataService.getApplication().code_
    const blob = this.b64toBlob(this.blob, 'application/pdf', 512 )
    const downloadURL = window.URL.createObjectURL(
      blob
      );
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = this.downloadName + ".pdf";
    link.click();


  }

  b64toBlob (b64Data: string, contentType: string, sliceSize: number){
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

}
