export interface ISurveyTransaction {
  id?: number;
  transCode?: string;
  comment?: string;
}

export class SurveyTransaction implements ISurveyTransaction {
  constructor(public id?: number, public transCode?: string, public comment?: string) {}
}
