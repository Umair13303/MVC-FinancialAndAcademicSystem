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
        public class ACFSM_ClassFeeStructureFeeType_TVP
        {
            public int? Id { get; set; }
            public Guid? GuID { get; set; } = Uttility.fn_GetHashGuid();
            public int? FeeTypeId { get; set; }
            public int? RevenueAccountId { get; set; }
            public int? AssetAccountId { get; set; }
            public int? LiabilityAccountId { get; set; }
            public int? CostOfSaleAccountId { get; set; }
            public decimal? Amount { get; set; }
            public int? CreatedOn { get; set; }
            public int? CreatedBy { get; set; }
            public int? UpdatedOn { get; set; }
            public int? UpdatedBy { get; set; }
            public int? DocType { get; set; } = (int?)DOCUMENT_TYPE.ACCOUNT_CLASS_FEE_STRUCTURE_FEE_TYPE;
            public int? DocumentStatus { get; set; } = (int?)DOCUMENT_STATUS.ACTIVE_ACCOUNT_CLASS_FEE_STRUCTURE_FEE_TYPE;
            public int? Status { get; set; }
        }
        public class SM_Student_TVP
        {
            public int Id { get; set; }
            public Guid? GuID { get; set; }
            public string Code { get; set; }
            public int? CampusId { get; set; }
            public int? AdmissionSessionId { get; set; }
            public int? ClassId { get; set; }
            public string AdmissionCategoryId { get; set; }
            public string RegistrationNumber { get; set; }
            public string StudentName { get; set; }
            public string StudentCNIC { get; set; }
            public DateTime? BirthDate { get; set; }
            public int? ReligionId { get; set; }
            public int? CountryId { get; set; }
            public string DomicileDistrict { get; set; }
            public string FatherName { get; set; }
            public string FatherCNIC { get; set; }
            public int? OccupationId { get; set; }
            public bool? IsFatherAlive { get; set; }
            public string GuardianName { get; set; }
            public string GuardianCNIC { get; set; }
            public string StudentMobile { get; set; }
            public string StudentEmail { get; set; }
            public string ParentMobile { get; set; }
            public string LandLine { get; set; }
            public string EmergencyMobile { get; set; }
            public string Address { get; set; }
            public string Remarks { get; set; }
            
        }

    }
}