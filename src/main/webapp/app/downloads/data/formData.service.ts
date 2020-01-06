import { Injectable }                        from '@angular/core';

import { DownloadData, Application, Parameters }       from './formData.model';
import { WorkflowService }                   from '../workflow/workflow.service';
import { STEPS }                             from '../workflow/workflow.model';

@Injectable()
export class FormDataService {

    private formData: DownloadData = new DownloadData();
    private isApplicationFormValid = false;
    private isParameterValid = false;

    constructor(private workflowService: WorkflowService) {
    }

    getApplication(): Application {
        // Return the Application data
        const application: Application = {
            code_: this.formData.code_
        };
        return application;
    }

    setApplication(data: Application) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isApplicationFormValid = true;
        this.formData.code_ = data.code_;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.appname);
    }

    getParameters() : Parameters {
        // Return the Address data
        const parameters: Parameters = {
          indOrg: this.formData.indOrg,
          primary: this.formData.primary,
          agent: this.formData.agent,
          multipleParties: this.formData.multipleParties,
          noIndividual: this.formData.noIndividual,
          noOrganization: this.formData.noOrganization
        };
        return parameters;
    }

    setParameters(data: Parameters) {
        // Update the Parameters data only when the Address Form had been validated successfully
        this.isParameterValid = true;
        this.formData.indOrg = data.indOrg;
        this.formData.primary = data.primary;
        this.formData.agent = data.agent;
        this.formData.multipleParties = data.multipleParties;
        this.formData.noIndividual = data.noIndividual;
        this.formData.noOrganization = data.noOrganization;

        this.workflowService.validateStep(STEPS.parameters);
    }

    getFormData(): DownloadData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): DownloadData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isParameterValid = this.isParameterValid =  false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isApplicationFormValid &&
                this.isParameterValid
    }
}
