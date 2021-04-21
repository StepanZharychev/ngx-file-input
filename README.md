# NGX File Input

Lightweight component which helps to utilise native capabilities
of [HTML5 File Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file). Also provides custom
Angular validation for file size, and ability to set up native properties.

- [Demo](#demo)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Model and Options](#model-and-options)
- [Styling](#styling)

## Demo
[Click here](https://stepanzharychev.com:8000/file-input)

## Installation

```bash
npm i --save ngx-file-input
```

## Setup

Simply import **NgxFileInputModule** from the library to your **app.module.ts**

```typescript
import { NgxFileInputModule } from 'ngx-file-input';

@NgModule({
  imports: [
    NgxFileInputModule
  ],
  providers: []
})
export class AppModule {
}
```

## Usage

Use component directly in HTML code:

```html

<ngx-file-input [(ngModel)]="files"></ngx-file-input>
```

Notice that even though the component uses 2-way databinding you can't set the value through `ngModel` due to
limitations of HTML5 File Input.

You can also use it in the form:

```html

<form>
  <div>
    <label for="file-input">Files:</label>
    <ngx-file-input #file="ngModel" required [(ngModel)]="files" [id]="'file-input'" [options]="fileOptions"
                    name="file"></ngx-file-input>
  </div>
</form>
```

## Model and Options

Name (or directive) | Type | Description | Default Value
--- | --- | --- | ---
`ngModel` | File[] (array of [Files](https://developer.mozilla.org/en-US/docs/Web/API/File), not FileList) | - | []
`@Input()` id | string | Id which is going to be set to native input (e.g. to be used with *labels*) | empty string
`@Input()` options | [FileInputOptions](#FileInputOptions) | Object with different validation and configuration properties (see props below) | - // -
`@Output()` value | File[] | Returns File array whenever value of input changes | -
`@Output()` validity | [ValidationErrors](https://angular.io/api/forms/ValidationErrors) | Returns Custom Validator Output  | -

Component uses validation automatically when inside of `form` so you don't need to listen for `validity` in this case.
Custom validator checks for size (if specified) and returns the following object:

```typescript
{
  fileValidation: {
    [filename]: {
      size: true
    }
  }
}
```

### FileInputOptions

Name | Type | Description | Default Value
--- | --- | --- | ---
formats | string[] | Sets [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept) property of HTML5 File Input | []
size | `number` or `string` | Used for validation. Accepts value as `number` in **bytes** or `string` in natural language (e.g. 200kb, 2Mb, etc.) | 0
multiple | boolean | Sets [multiple](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefmultiple) property of HTML5 File Input | false
classes | string | Sets class property of HTML5 File Input | empty string

## Styling

This library provides **no styling**. It basically means that there are no unnecessary dependencies which you wouldn't
like to see in your project. You can apply any styling you want, e.g. for demo environment there's used Fomantic UI.
