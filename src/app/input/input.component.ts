import {
  forwardRef,
  Component,
  Input,
  SkipSelf,
  Host,
  Optional,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { InputTypeKeys } from './input.model';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [DEFAULT_VALUE_ACCESSOR],
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input()
  public title: string;
  @Input()
  public type?: InputTypeKeys;
  @Input()
  public placeholder = '';
  @Input()
  public required = false;
  @Input()
  public errorMsg = '';
  @Input()
  public formControlName: string;
  @Input()
  public customErrors: any;
  @Input()
  public minimizedPlaceholder = false;

  public control: AbstractControl;
  public controlError;

  public value = '';
  public focus = false;
  public disabled = false;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
    private _cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    if (this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    }
  }

  public get minimized(): boolean {
    return this.minimizedPlaceholder || !!this.focus || !!this.value.length;
  }

  public get showPlaceholder(): boolean {
    return !!this.placeholder;
  }

  public onFocus() {
    this.focus = true;
  }

  public onBlur() {
    this.onTouched();
    this.focus = false;
    this._updateControlError();
    this._cdr.detectChanges();
  }

  public writeValue(value) {
    if (typeof value !== 'string') {
      return;
    }

    this.value = value;
    this.onChange(this.value);
    this._updateControlError();
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected onChange = (_: string) => {};
  protected onTouched = () => {};

  private _updateControlError() {
    if (this.control && this.control.errors) {
      const firstErrorKey = Object.keys(this.control.errors).pop();
      this.controlError = {
        key: firstErrorKey,
        value: this.control.errors[firstErrorKey],
      };
    } else {
      this.controlError = null;
    }
  }
}
