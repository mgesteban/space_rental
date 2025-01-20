export type FormType = 'internal' | 'external';

export interface FormInfo {
  type: FormType;
  title: string;
  description: string;
  requirements: string[];
  filename: string;
  submissionDays: number;
}

export const FORM_INFO: Record<FormType, FormInfo> = {
  internal: {
    type: 'internal',
    title: 'Application for Use of District Property – Internal Use',
    description: 'For use by CCSF employees, faculty, and students',
    requirements: [
      'Must be submitted 10 working days prior to date of facility use',
      'Requires department chair or dean approval',
      'All activities must be related to educational purposes'
    ],
    filename: 'application-for-use-of-district-property-internal-use-2023-fillable.pdf',
    submissionDays: 10
  },
  external: {
    type: 'external',
    title: 'Application for Use of District Property by Outside Groups',
    description: 'For use by external organizations and community groups',
    requirements: [
      'Must be submitted 15 working days prior to date of facility use',
      'Requires proof of insurance with specified coverage limits',
      'Additional insured endorsement required',
      'Certificate of Insurance must be provided 5 days prior to use',
      'Proof of molestation insurance required if minors will be attending'
    ],
    filename: 'application-for-use-of-district-property-outside-group-2023-v2-fillable.pdf',
    submissionDays: 15
  }
};
