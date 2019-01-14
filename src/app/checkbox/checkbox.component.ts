import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  Optional,
  Host,
  SkipSelf,
  OnInit,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [DEFAULT_VALUE_ACCESSOR],
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  @Input()
  public formControlName: string;

  @Input()
  public formControl: AbstractControl;

  @Input()
  public label: string;

  @Output()
  public valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ContentChild(TemplateRef)
  public content;

  public value: boolean;
  public disabled = false;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
  ) {}

  public ngOnInit() {
    if (this.formControlName) {
      this.formControl = this.controlContainer.control.get(
        this.formControlName,
      );
    }
  }

  public changeValue() {
    if (this.disabled) {
      return;
    }

    this.writeValue(!this.value);
  }

  public writeValue(value: boolean) {
    if (typeof value !== 'boolean') {
      return;
    }

    this.value = value;
    this.onChange(this.value);
  }

  public registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected onChange = _ => {};
  protected onTouched = () => {};
}
