
export interface IValueLabel {
  value?: string;
  label?: string;
}

export class ValueLabel implements IValueLabel {
  constructor(
    public value?: string,
    public label?: string
  ) {}
}
