using System.Linq;
using System.Web;
using static office360.Models.General.HttpServerStatus;
using System.Data.Entity.Infrastructure;
using office360.Models.EDMX;
using office360.Models.General;
using office360.Common.CommonHelper;
using System.Data.Entity.Core.Objects;
using office360.Extensions;
using System;


namespace office360.Areas.AAcademic.HelperCode
{
    public class CUD_Operation
    {
        #region HELPER FOR :: INSERT/UPDATE DATA USING STORED PROCEDURE (DBO.ACM_CLASS) ::-- MAIN DB
        public static int? Update_Insert_ACM_Class(SQLParamters PostedData)
        {
            using (var db = new FASEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {
                        #region CHECK DUPLICATE :: NO-OPERATION IF ACTIVE CLASS EXIST
                        int? DB_OPERATION_STATUS = AAcademic.HelperCode.Check_Duplicate_By_LINQ.IS_EXIST_ACM_CLASS_BY_PARAMETER(PostedData);
                        switch (DB_OPERATION_STATUS)
                        {
                            case (int?)Http_DB_Response.CODE_AUTHORIZED:
                                #region DB SETTING
                                if (PostedData.OperationType == nameof(DB_OperationType.INSERT_DATA_INTO_DB))
                                {
                                    PostedData.GuID = Uttility.fn_GetHashGuid();
                                }
                                #endregion
                                #region OUTPUT VARAIBLE
                                var ResponseParameter = new ObjectParameter("Response", typeof(int));
                                #endregion
                                #region EXECUTE STORE PROCEDURE
                                var ACM_Class = db.ACM_Class_Upsert(
                                                                     PostedData.OperationType,
                                                                     PostedData.GuID,
                                                                     PostedData.CampusId,
                                                                     PostedData.Description?.Trim().ToSafeString(),
                                                                     PostedData.StudyLevelId,
                                                                     PostedData.StudyGroupId,
                                                                     PostedData.StudySchemeId,
                                                                     DateTime.Now,
                                                                     Session_Manager.UserId,
                                                                     DateTime.Now,
                                                                     Session_Manager.UserId,
                                                                     (int?)DOCUMENT_TYPE.ACADEMIC_CLASS,
                                                                     (int?)DOCUMENT_STATUS.ACTIVE_ACADEMIC_CLASS,
                                                                     true,
                                                                     Session_Manager.BranchId,
                                                                     Session_Manager.CompanyId,
                                                                     PostedData.Remarks?.Trim().ToSafeString(),
                                                                     ResponseParameter
                                    );

                                #endregion
                                #region RESPONSE VALUES IN VARIABLE
                                int? Response = (int)ResponseParameter.Value;
                                #endregion
                                #region TRANSACTION HANDLING DETAIL
                                switch (Response)
                                {
                                    case (int?)Http_DB_Response.CODE_SUCCESS:
                                    case (int?)Http_DB_Response.CODE_DATA_UPDATED:

                                        dbTran.Commit();
                                        break;

                                    case (int?)Http_DB_Response.CODE_BAD_REQUEST:
                                        dbTran.Rollback();
                                        break;
                                }
                                #endregion
                                return HttpServerStatus.Http_DB_ResponseByReturnValue(Response);

                            default:
                                return HttpServerStatus.Http_DB_ResponseByReturnValue(DB_OPERATION_STATUS);
                        }
                        #endregion


                    }
                    catch (Exception Ex)
                    {
                        dbTran.Rollback();
                        return HttpServerStatus.Http_DB_Response.CODE_INTERNAL_SERVER_ERROR.ToInt();
                    }
                }
            }
        }
        #endregion

        #region HELPER FOR :: INSERT/UPDATE DATA USING STORED PROCEDURE (DBO.ASM_SUBJECT) ::-- MAIN DB
        public static int? Update_Insert_ASM_Subject(SQLParamters PostedData)
        {
            using (var db = new FASEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {
                        #region CHECK DUPLICATE :: NO-OPERATION IF ACTIVE SUBJECT EXIST
                        int? DB_OPERATION_STATUS = AAcademic.HelperCode.Check_Duplicate_By_LINQ.IS_EXIST_ASM_SUBJECT_BY_PARAMETER(PostedData);
                        switch (DB_OPERATION_STATUS)
                        {
                            case (int?)Http_DB_Response.CODE_AUTHORIZED:
                                #region DB SETTING
                                if (PostedData.OperationType == nameof(DB_OperationType.INSERT_DATA_INTO_DB))
                                {
                                    PostedData.GuID = Uttility.fn_GetHashGuid();
                                }
                                #endregion
                                #region OUTPUT VARAIBLE
                                var ResponseParameter = new ObjectParameter("Response", typeof(int));
                                #endregion
                                #region EXECUTE STORE PROCEDURE
                                var ACM_Class = db.ASM_Subject_Upsert(
                                                                     PostedData.OperationType,
                                                                     PostedData.GuID,
                                                                     PostedData.Description?.Trim().ToSafeString(),
                                                                     PostedData.ShortDescription?.Trim().ToSafeString(),
                                                                     DateTime.Now,
                                                                     Session_Manager.UserId,
                                                                     DateTime.Now,
                                                                     Session_Manager.UserId,
                                                                     (int?)DOCUMENT_TYPE.ACADEMIC_SUBJECT,
                                                                     (int?)DOCUMENT_STATUS.ACTIVE_ACADEMIC_SUBJECT,
                                                                     true,
                                                                     Session_Manager.BranchId,
                                                                     Session_Manager.CompanyId,
                                                                     PostedData.Remarks?.Trim().ToSafeString(),
                                                                     ResponseParameter
                                    );

                                #endregion
                                #region RESPONSE VALUES IN VARIABLE
                                int? Response = (int)ResponseParameter.Value;
                                #endregion
                                #region TRANSACTION HANDLING DETAIL
                                switch (Response)
                                {
                                    case (int?)Http_DB_Response.CODE_SUCCESS:
                                    case (int?)Http_DB_Response.CODE_DATA_UPDATED:

                                        dbTran.Commit();
                                        break;

                                    case (int?)Http_DB_Response.CODE_BAD_REQUEST:
                                        dbTran.Rollback();
                                        break;
                                }
                                #endregion
                                return HttpServerStatus.Http_DB_ResponseByReturnValue(Response);

                            default:
                                return HttpServerStatus.Http_DB_ResponseByReturnValue(DB_OPERATION_STATUS);
                        }
                        #endregion


                    }
                    catch (Exception Ex)
                    {
                        dbTran.Rollback();
                        return HttpServerStatus.Http_DB_Response.CODE_INTERNAL_SERVER_ERROR.ToInt();
                    }
                }
            }
        }
        #endregion

        #region HELPER FOR :: INSERT/UPDATE DATA USING STORED PROCEDURE (DBO.AASM_ADMISSIONSESSION) ::-- MAIN DB
        public static int? Update_Insert_AASM_AdmissionSession(SQLParamters PostedData)
        {
            using (var db = new FASEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {
                        #region CHECK DUPLICATE :: NO-OPERATION IF ACTIVE ADMISSION SESSION EXIST
                        int? DB_OPERATION_STATUS = AAcademic.HelperCode.Check_Duplicate_By_LINQ.IS_EXIST_AASM_ADMISSIONSESSION_BY_PARAMETER(PostedData);
                        switch (DB_OPERATION_STATUS)
                        {
                            case (int?)Http_DB_Response.CODE_AUTHORIZED:
                                #region DB SETTING
                                if (PostedData.OperationType == nameof(DB_OperationType.INSERT_DATA_INTO_DB))
                                {
                                    PostedData.GuID = Uttility.fn_GetHashGuid();
                                }
                                #endregion
                                #region OUTPUT VARAIBLE
                                var ResponseParameter = new ObjectParameter("Response", typeof(int));
                                #endregion
                                #region EXECUTE STORE PROCEDURE
                                var AASM_AdmissionSession = db.AASM_AdmissionSession_Upsert(
                                                                     PostedData.OperationType,
                                                                     PostedData.GuID,
                                                                     PostedData.CampusId,
                                                                     PostedData.Description?.Trim().ToSafeString(),
                                                                     PostedData.SessionStartDate,
                                                                     PostedData.SessionEndDate,
                                                                     PostedData.AdmissionStartDate,
                                                                     PostedData.AdmissionEndDate,
                                                                     PostedData.AcademicYearId,
                                                                     PostedData.ClassIds?.Trim().ToSafeString(),
                                                                     PostedData.IsEnteryTestRequired,
                                                                     PostedData.IsInterviewRequired,
                                                                     DateTime.Now,
                                                                     Session_Manager.UserId,
                                                                     DateTime.Now,
                                                                     Session_Manager.UserId,
                                                                     (int?)DOCUMENT_TYPE.ACADEMIC_ADMISSION_SESSION,
                                                                     (int?)DOCUMENT_STATUS.ACTIVE_ACADEMIC_ADMISSION_SESSION,
                                                                     true,
                                                                     Session_Manager.BranchId,
                                                                     Session_Manager.CompanyId,
                                                                     PostedData.Remarks?.Trim().ToSafeString(),
                                                                     ResponseParameter
                                    );

                                #endregion
                                #region RESPONSE VALUES IN VARIABLE
                                int? Response = (int)ResponseParameter.Value;
                                #endregion
                                #region TRANSACTION HANDLING DETAIL
                                switch (Response)
                                {
                                    case (int?)Http_DB_Response.CODE_SUCCESS:
                                    case (int?)Http_DB_Response.CODE_DATA_UPDATED:

                                        dbTran.Commit();
                                        break;

                                    case (int?)Http_DB_Response.CODE_BAD_REQUEST:
                                        dbTran.Rollback();
                                        break;
                                }
                                #endregion
                                return HttpServerStatus.Http_DB_ResponseByReturnValue(Response);

                            default:
                                return HttpServerStatus.Http_DB_ResponseByReturnValue(DB_OPERATION_STATUS);
                        }
                        #endregion


                    }
                    catch (Exception Ex)
                    {
                        dbTran.Rollback();
                        return HttpServerStatus.Http_DB_Response.CODE_INTERNAL_SERVER_ERROR.ToInt();
                    }
                }
            }
        }
        #endregion


    }
}