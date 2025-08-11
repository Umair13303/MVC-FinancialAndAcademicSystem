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
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using office360.Models.DBF;

namespace office360.Areas.AAcademic.HelperCode
{

    public class BULK_CUD_Operation
    {
        #region HELPER FOR :: INSERT/UPDATE DATA USING STORED PROCEDURE (DBO.ACCM_CLASSCURRICULUM && DBO.ACCM_CLASSCURRICULUMSUBJECT) ::-- MAIN DB
        public static int? Update_Insert_ACCM_ClassCurriculum(SQLParamters PostedData, List<TVParam.ACCM_ClassCurriculumSubject_TVP> PostedDataDetail)
        {
            using (var db = new FASEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {
                        #region CHECK DUPLICATE :: NO-OPERATION IF ACTIVE CLASS CURRICULUM EXIST
                        int? DB_OPERATION_STATUS = AAcademic.HelperCode.Check_Duplicate_By_LINQ.IS_EXIST_ACCM_CLASSCURRICULUM_BY_PARAMETER(PostedData);
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
                                var ResponseParameter = new SqlParameter("@Response", SqlDbType.Int)
                                {
                                    Direction = ParameterDirection.Output
                                };
                                #endregion
                                #region EXECUTE STORE PROCEDURE
                                var ACCM_ClassCurriculum = DBFStoredProcedure.ACCM_ClassCurriculum_Upsert(
                                                                PostedData.OperationType,
                                                                PostedData.GuID,
                                                                PostedData.CampusId,
                                                                PostedData.Description?.Trim().ToSafeString(),
                                                                PostedData.ClassId,
                                                                DateTime.Now,
                                                                Session_Manager.UserId,
                                                                DateTime.Now,
                                                                Session_Manager.UserId,
                                                                (int?)DOCUMENT_TYPE.ACADEMIC_CLASS_CURRICULUM,
                                                                (int?)DOCUMENT_STATUS.ACTIVE_ACADEMIC_CLASS_CURRICULUM,
                                                                true,
                                                                Session_Manager.BranchId,
                                                                Session_Manager.CompanyId,
                                                                PostedData.Remarks?.Trim().ToSafeString(),
                                                                PostedDataDetail,
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
                                    default:
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