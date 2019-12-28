export interface ITrans {
  id_?: any;
  code_?: string;
  param_name?: string;
  param_value?: string;
}

export class Trans implements ITrans {
  constructor(
    public id_?: any,
    public code_?: string,
    public param_name?: string,
    public param_value?: string
  ) {
    this.id_ = id_ ? id_ : null;
    this.code_ = code_ ? code_ : null;
    this.param_name = param_name ? param_name : null;
    this.param_value = param_value ? param_value : null;
  }
}
