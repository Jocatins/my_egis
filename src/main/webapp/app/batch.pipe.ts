import { Pipe, PipeTransform } from '@angular/core';
import { SERVER_API_URL } from './app.constants';
import { timeout, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Pipe({ name: 'transname' })
export class BatchPipe implements PipeTransform {

  codeFormatted: string;
  constructor(protected http: HttpClient){

  }
  transform(code: string ) {
    // const simpleresourceUrl = SERVER_API_URL + 'api/backoffice/transmeatada?code=' + code;
    // const callMetadata = this.http.get<any>(`${simpleresourceUrl}`);
    // if (callMetadata !== null) {
    //   callMetadata.pipe(timeout(2000), catchError(ee => {
    //     alert('Error')
    //     alert(ee.json())
    //     return null
    //   }))
    //     .subscribe((dataMeta: any) => {
    //       // this.codeFormatted = code +' - ' + JSON.parse(dataMeta.metadata).descr;
    //       alert(JSON.parse(dataMeta.metadata).descr)
    //       code = code +' - ' + JSON.parse(dataMeta.metadata).descr;
    //     })
    // }

    this.someMethod(code).subscribe((dataMeta: any) =>{
      this.codeFormatted = code +' - ' + JSON.parse(dataMeta.metadata).descr
      alert(this.codeFormatted )
    });


    return  this.codeFormatted;
  }


  someMethod(code: string) {
    const simpleresourceUrl = SERVER_API_URL + 'api/backoffice/transmeatada?code=' + code;
    return this.http.get(simpleresourceUrl).pipe(res => {
      return res;
    });
  }
}
