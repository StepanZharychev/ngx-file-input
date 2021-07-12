import { Component, forwardRef, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { FileInputOptions } from '../types/file-input';
import parseFileSize from 'filesize-parser';

@Component({
  selector: 'ngx-file-input',
  templateUrl: './ngx-file-input.component.html',
  styleUrls: ['./ngx-file-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxFileInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: NgxFileInputComponent,
      multi: true
    }
  ]
})
export class NgxFileInputComponent implements ControlValueAccessor, Validator {
  @ViewChild('fileInput')
  public fileInput: ElementRef;

  private defaultOptions = {
    formats: [],
    size: 0,
    multiple: false,
    classes: ''
  } as FileInputOptions;
  private internalOptions = {} as FileInputOptions;
  private internalValue = [] as File[];
  private propagateChange = null as (value: File[]) => {};

  @Input()
  public id = '';

  public get options(): FileInputOptions {
    return this.internalOptions;
  }

  @Input()
  public set options(value: FileInputOptions) {
    this.internalOptions = { ...this.defaultOptions, ...value };

    if (typeof value.size === 'string') {
      this.internalOptions.size = parseFileSize(value.size);
    }
  }

  @Output()
  public value = new EventEmitter<File[]>();

  @Output()
  public validity = new EventEmitter<ValidationErrors>();

  constructor() {
  }

  public writeValue(value: any): void {
    // Doing nothing except reset as you can't set file input value programmatically
    if (value === null || !value.length) {
      this.internalValue = [];
      this.fileInput.nativeElement.value = null;
    }
  }

  public registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors {
    if (this.internalValue && this.internalValue.length) {
      const files = {};
      for (const file of this.internalValue) {
        files[file.name] = {};

        if (this.options.size && file.size > this.options.size) {
          files[file.name].size = true;
        }
      }

      for (const name in files) {
        if (!Object.keys(files[name]).length) {
          delete files[name];
        }
      }

      if (Object.keys(files).length) {
        return {
          fileValidation: files
        };
      }
    }

    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
  }

  public contentChanged(event: any): void {
    this.internalValue = [];

    const files = event.target.files;
    if (files && files.length) {
      for (let index = 0; index < files.length; index++) {
        this.internalValue.push(event.target.files[index]);
      }
    }

    this.propagateChange(this.internalValue);
    this.value.emit(this.internalValue);
    this.validity.emit(this.validate(null));
  }
}
