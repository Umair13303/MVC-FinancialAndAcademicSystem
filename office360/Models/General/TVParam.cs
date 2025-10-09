using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using office360.Common.CommonHelper;

namespace office360.Models.General
{
    public class TVParam
    {
        public class ACCM_ClassCurriculumSubject_TVP
        {
            public int? Id { get; set; }
            public Guid? GuID { get; set; } = Uttility.fn_GetHashGuid();
            public int? ClassCurriculumId { get; set; }
            public int? SemesterId { get; set; }
            public int? SubjectId { get; set; }
            public int? CreatedOn { get; set; }
            public int? CreatedBy { get; set; }
            public int? UpdatedOn { get; set; }
            public int? UpdatedBy { get; set; }
            public int? DocType { get; set; } = (int?)DOCUMENT_TYPE.ACADEMIC_CLASS_CURRICULUM_SUBJECT;
            public int? DocumentStatus { get; set; } = (int?)DOCUMENT_STATUS.ACTIVE_ACADEMIC_CLASS_CURRICULUM_SUBJECT;
            public int? Status { get; set; }
        }
        public class AASM_AdmissionSessionClass_TVP
        {
            public int? Id { get; set; }
            public Guid? GuID { get; set; } = Uttility.fn_GetHashGuid();
            public int? AdmissionSessionId { get; set; }
            public int? ClassId { get; set; }
            public bool IsEnteryTestRequired { get; set; }
            public bool IsInterviewRequired { get; set; }
            public DateTime? SessionStartDate { get; set; }
            public DateTime? SessionEndDate { get; set; }
            public int? CreatedOn { get; set; }
            public int? CreatedBy { get; set; }
            public int? UpdatedOn { get; set; }
            public int? UpdatedBy { get; set; }
            public int? DocType { get; set; } = (int?)DOCUMENT_TYPE.ACADEMIC_ADMISSION_SESSION_CLASS;
            public int? DocumentStatus { get; set; } = (int?)DOCUMENT_STATUS.ACTIVE_ACADEMIC_ADMISSION_SESSION_CLASS;
            public int? Status { get; set; }
        }

    }
}