// export interface ITransInfo {
//   // applicationname?: string;
//   // description?: string;
//   // restrictions?: string;
//   // expiration?: string;
//   // docsreceived?: string;
//   // prerequisitedocs?: string;
//   // prerequisitetrans?: string;
//   // procedure?: string;
//   // associatedfees?: string;
// }

export class TransInfo  {


  constructor(public applicationname?: string,
    public description?: string,
    public restrictions?: string,
    public expiration?: string,
    public docsreceived?: string,
    public prerequisitedocs?: string,
    public prerequisitetrans?: string,
    public procedure?: string,
    public associatedfees?: string
  ) {

    // this.applicationname = applicationname ? applicationname : null;
    // this.restrictions = restrictions ? restrictions : null;
    // this.description = description ? description : null;
    // this.expiration = expiration ? expiration : null;
    // this.docsreceived = docsreceived ? docsreceived : null;
    // this.prerequisitedocs = prerequisitedocs ? prerequisitedocs : null;
    // this.prerequisitetrans = prerequisitetrans ? prerequisitetrans : null;
    // this.procedure = procedure ? procedure : null;
    // this.associatedfees = associatedfees ? associatedfees : null;

  }
}
