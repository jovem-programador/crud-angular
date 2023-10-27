import { Injectable } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseFormComponent } from 'src/app/courses/containers/course-form/course-form.component';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {

  constructor(
    private location: Location,
    private snackBar: MatSnackBar,
    private formComp: CourseFormComponent) {}

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormArray) {
        control.markAsTouched({ onlySelf: true });

        this.validateAllFormFields(control);
      }
    });
  }

  // Validação do formulario
  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;

    return this.getErrorMessageFormField(field);
  }

  // Validação do formulario
  getErrorMessageFormField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return 'Campo obrigatorio';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;

      return `Tamanho minimo precisa ser de ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 250;

      return `Tamanho máximo exedido de ${requiredLength} caracteres`;
    }

    return 'Campo invalido';
  }

  getFormArrayFieldErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    filedName: string,
    index: number
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;

    const filed = formArray.controls[index].get(
      filedName
    ) as UntypedFormControl;

    return this.getErrorMessageFormField(filed);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;

    return (
      !formArray.valid && formArray.hasError('required') && formArray.touched
    );
  }

  // Mensagem de sucesso
  onSucess() {
    this.snackBar.open('Curso salvo com sucesso!!', '', { duration: 5000 });
    this.formComp.onCancel();
  }

  // Mensagem de error
  onError() {
    this.snackBar.open('Error ao salvar curso.', '', { duration: 5000 });
  }
}
