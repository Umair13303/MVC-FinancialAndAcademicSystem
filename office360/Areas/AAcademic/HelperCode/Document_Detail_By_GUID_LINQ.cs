using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;

namespace office360.Areas.AAcademic.HelperCode
{
    public class Document_Detail_By_GUID_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ (ACM_CLASS) ::-- MAIN DB
        public static List<_SqlParameters> GET_MT_ACM_CLASS_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> DATA = new List<_SqlParameters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<_SqlParameters>)
                       (from C in db.ACM_Class
                        where C.CompanyId == Session_Manager.CompanyId && C.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = C.Id,
                            GuID = C.GuID,
                            Code = C.Code,
                            CampusId = C.CampusId,
                            Description = C.Description,
                            StudyLevelId = C.StudyLevelId,
                            StudyGroupId = C.StudyGroupId,
                            Remarks = C.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion
        #region HELPER FOR :: GET DATA USING LINQ (ASM_SUBJECT) ::-- MAIN DB
        public static List<_SqlParameters> GET_MT_ASM_SUBJECT_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> DATA = new List<_SqlParameters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<_SqlParameters>)
                       (from S in db.ASM_Subject
                        where S.CompanyId == Session_Manager.CompanyId && S.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = S.Id,
                            GuID = S.GuID,
                            Code = S.Code,
                            Description = S.Description,
                            ShortDescription = S.ShortDescription,
                            Remarks = S.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion

        #region HELPER FOR :: GET DATA USING LINQ (AASM_ADMISSIONSESSION) ::-- MAIN DB
        public static List<_SqlParameters> GET_MT_AASM_ADMISSIONSESSION_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> DATA = new List<_SqlParameters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<_SqlParameters>)
                       (from S in db.AASM_AdmissionSession
                        where S.CompanyId == Session_Manager.CompanyId && S.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = S.Id,
                            GuID = S.GuID,
                            Code = S.Code,
                            CampusId = S.CampusId,
                            Description = S.Description,
                            SessionStartDate = S.SessionStartDate,
                            SessionEndDate = S.SessionEndDate,
                            AdmissionStartDate = S.AdmissionStartDate,
                            AdmissionEndDate = S.AdmissionEndDate,
                            AcademicYearId = S.AcademicYearId,
                            ClassIds = S.ClassIds,
                            IsEnteryTestRequired = S.IsEnteryTestRequired,
                            IsInterviewRequired = S.IsInterviewRequired,
                            Remarks = S.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion
    }
}