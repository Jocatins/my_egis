export interface ISurveyor {
  id?: number;
  email?: string;
  surconNumber?: string;
  registrationNumber?: string;
  phone?: string;
  status?: string;
}

export class Surveyor implements ISurveyor {
  constructor(
    public id?: number,
    public email?: string,
    public surconNumber?: string,
    public registrationNumber?: string,
    public phone?: string,
    public status?: string
  ) {}
}
