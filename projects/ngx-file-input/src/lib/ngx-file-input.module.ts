import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileInputComponent } from './ngx-file-input/ngx-file-input.component';

@NgModule({
  declarations: [NgxFileInputComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxFileInputComponent]
})
export class NgxFileInputModule {
}
