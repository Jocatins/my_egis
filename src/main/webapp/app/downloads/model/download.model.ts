
export interface IDownload {
  code_?: string;
  indOrg?: string;
  primary?: string;
  agent?: string;
  multipleParties?: string;
  noIndividual?: number;
  noOrganization?: number;
}

export class Download implements IDownload {
  constructor(
    public code_?: string,
    public indOrg?: string,
    public primary?: string,
    public agent?: string,
    public multipleParties?: string,
    public noIndividual?: number,
    public noOrganization?: number
  ) {}
}
