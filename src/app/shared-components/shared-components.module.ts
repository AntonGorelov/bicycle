import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CheckboxComponent, InputComponent],
  declarations: [CheckboxComponent, InputComponent],
})
export class SharedComponentsModule {}
