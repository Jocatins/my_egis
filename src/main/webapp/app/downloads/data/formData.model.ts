export interface IDownload {
  code_?: string;
  indOrg?: string;
  primary?: string;
  agent?: string;
  multipleParties?: string;
  noIndividual?: number;
  noOrganization?: number;
}

export class DownloadData implements IDownload {
  constructor(
    public code_?: string,
    public indOrg?: string,
    public primary?: string,
    public agent?: string,
    public multipleParties?: string,
    public noIndividual?: number,
    public noOrganization?: number
  ) {

    code_ = '';
    indOrg = '';
    primary = '';
    agent = '';
    multipleParties = '';
    noIndividual =0;
    noOrganization = 0;

  }

  clear(){
    this.code_ = '';
    this.indOrg = '';
    this.primary = '';
    this.agent = '';
    this.multipleParties = '';
    this.noIndividual =0;
    this.noOrganization = 0;
  }
}

export class Application {
    code_ = '';
}

export class Parameters {
  indOrg = '';
  primary = '';;
  agent = '';;
  multipleParties = '';;
  noIndividual =0;
  noOrganization =0;
}
