export class InputTypes {
  public static email = 'email';
  public static password = 'password';
  public static text = 'text';
  public static phone = 'phone';
}

export declare type InputTypeKeys = keyof typeof InputTypes;

export class InputErrorMessages {
  public static invalidEmail = 'Please enter a valid email address';
  public static invalidPass = 'Please enter a valid password';
  public static emptyInput = 'PLease enter value';
  public static noUserWithEmail = 'Please enter a registered email address';
  public static wrongPass = 'Please enter a correct password';
  public static invalidPhone = 'Please enter a valid phone number';
}
