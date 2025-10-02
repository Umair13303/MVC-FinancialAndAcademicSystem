using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace office360.Areas.AAcademic.HelperCode
{
    public class Document_Detail_By_GUID_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ (ACM_CLASS) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_ACM_CLASS_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from C in db.ACM_Class
                        where C.CompanyId == Session_Manager.CompanyId && C.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = C.Id,
                            GuID = C.GuID,
                            Code = C.Code,
                            CampusId = C.CampusId,
                            Description = C.Description,
                            StudyLevelId = C.StudyLevelId,
                            StudyGroupId = C.StudyGroupId,
                            StudySchemeId = C.StudySchemeId,
                            Remarks = C.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion
        #region HELPER FOR :: GET DATA USING LINQ (ASM_SUBJECT) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_ASM_SUBJECT_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from S in db.ASM_Subject
                        where S.CompanyId == Session_Manager.CompanyId && S.GuID == PostedData.GuID
                        select new SQLParamters
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
        #region HELPER FOR :: GET DATA USING LINQ (ACCM_CLASSCURRICULUM & ACCM_CLASSCURRICULUMSUBJECT) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_ACCM_CLASSCURRICULUM_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from CC in db.ACCM_ClassCurriculum
                        where CC.CompanyId == Session_Manager.CompanyId && CC.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = CC.Id,
                            GuID = CC.GuID,
                            Code = CC.Code,
                            CampusId = CC.CampusId,
                            Description = CC.Description,
                            ClassId = CC.ClassId,
                            Remarks = CC.Remarks,
                        }).ToList());

                return DATA;
            }
        }
        public static List<SQLParamters> GET_MT_ACCM_CLASSCURRICULUMSUBJECT_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();
            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from CC in db.ACCM_ClassCurriculum
                        join CCS in db.ACCM_ClassCurriculumSubject on CC.Id equals CCS.ClassCurriculumId 
                        where CC.CompanyId == Session_Manager.CompanyId && CC.GuID == PostedData.GuID && CCS.Status == true
                        select new SQLParamters
                        {
                            SemesterId = CCS.SemesterId,
                            SubjectId = CCS.SubjectId,
                            Semester = db.Semester.Where(S => S.Id == CCS.SemesterId).Select(S => S.Description).FirstOrDefault(),
                            Subject = db.ASM_Subject.Where(S => S.Id == CCS.SubjectId).Select(S => S.Description).FirstOrDefault(),
                        }).ToList());

                return DATA;
            }
        }
        

        #endregion

        #region HELPER FOR :: GET DATA USING LINQ (AASM_ADMISSIONSESSION) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_AASM_ADMISSIONSESSION_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from S in db.AASM_AdmissionSession
                        where S.CompanyId == Session_Manager.CompanyId && S.GuID == PostedData.GuID
                        select new SQLParamters
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