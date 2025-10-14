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
            List<SQLParamters> DATA_DETAIL = new List<SQLParamters>();
            using (FASEntities db = new FASEntities())
            {
                DATA_DETAIL = ((List<SQLParamters>)
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

                return DATA_DETAIL;
            }
        }


        #endregion

        #region HELPER FOR :: GET DATA USING LINQ (AASM_ADMISSIONSESSION && AASM_ADMISSIONSESSIONCLASS) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_AASM_ADMISSIONSESSION_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from AS in db.AASM_AdmissionSession
                        where AS.CompanyId == Session_Manager.CompanyId && AS.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = AS.Id,
                            GuID = AS.GuID,
                            Code = AS.Code,
                            CampusId = AS.CampusId,
                            Description = AS.Description,
                            AcademicYearId = AS.AcademicYearId,
                            AdmissionStartDate = AS.AdmissionStartDate,
                            AdmissionEndDate = AS.AdmissionEndDate,
                            Remarks = AS.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        public static List<SQLParamters> GET_MT_AASM_ADMISSIONSESSIONCLASS_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA_DETAIL = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA_DETAIL = ((List<SQLParamters>)
                       (from AS in db.AASM_AdmissionSession
                        join ASC in db.AASM_AdmissionSessionClass on AS.Id equals ASC.AdmissionSessionId
                        where AS.CompanyId == Session_Manager.CompanyId && AS.GuID == PostedData.GuID && AS.Status == true
                        select new SQLParamters
                        {
                            Id = ASC.Id,
                            GuID = ASC.GuID,
                            Class = db.ACM_Class.Where(C => C.Id == ASC.ClassId).Select(S => S.Description).FirstOrDefault(),
                            IsEnteryTestRequired = ASC.IsEnteryTestRequired,
                            IsInterviewRequired = ASC.IsInterviewRequired,
                            SessionStartDate = ASC.SessionStartDate,
                            SessionEndDate = ASC.SessionEndDate,
                            ClassId = ASC.ClassId,


                        }).ToList());

                return DATA_DETAIL;
            }
        }
        #endregion
    }
}