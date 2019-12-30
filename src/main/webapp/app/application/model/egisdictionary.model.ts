export interface IEGISDIctionary {
  id?: string;
  code?: string;
  label?: string;
  descr?: string;
  category?: string;
  hidden?: string;
  bootstrap?: string;
  version?: string;
  beginLifespanVersion?: string;
  endLifespanVersion?: string;
  general_term?: string;
  sort_order?: string;
  ext_code?: string;
}

export class EGISDIctionary implements IEGISDIctionary {
  constructor(
    public id?: string,
    public code?: string,
    public label?: string,
    public descr?: string,
    public category?: string,
    public hidden?: string,
    public bootstrap?: string,
    public version?: string,
    public beginLifespanVersion?: string,
    public endLifespanVersion?: string
  ) {
    this.id = id? id: null;
    this.code = code? code: null;
    this.label = label? label: null;
    this.descr = descr? descr: null;
    this.category = category? category: null;
    this. hidden = hidden? hidden: null;
    this.bootstrap = bootstrap? bootstrap: null;
    this.version = version? version: null;
    this.beginLifespanVersion = beginLifespanVersion? beginLifespanVersion: null;
    this.endLifespanVersion = endLifespanVersion? endLifespanVersion: null;
  }
}
