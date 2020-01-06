import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../interceptor/loader.service';

@Component({
  selector: 'jhi-app-loading',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loading: boolean;
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
     // console.log(v);
      this.loading = v;
    });
  }
  ngOnInit() {
    //alert('in init for LoaderComponent ')
  }

}
