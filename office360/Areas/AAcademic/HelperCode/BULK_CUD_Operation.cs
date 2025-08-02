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

namespace office360.Areas.AAcademic.HelperCode
{
    public class BULK_CUD_Operation
    {
        #region HELPER FOR :: INSERT/UPDATE DATA USING STORED PROCEDURE (DBO.ACCM_CLASSCURRICULUM && DBO.ACCM_CLASSCURRICULUMSUBJECT) ::-- MAIN DB
        public static int? Update_Insert_ACCM_ClassCurriculum(SQLParamters PostedData, List<TVParam.ACCM_ClassCurriculumSubject_TVP> PostedDataDetail)
        {
            using (var db = new SESEntities())
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
                                var ResponseParameter = new ObjectParameter("Response", typeof(int));
                                #endregion
                                string ConnectionString = ConfigurationManager.ConnectionStrings["SESEntities"].ConnectionString;
                                using (SqlConnection conn = new SqlConnection(ConnectionString))
                                {
                                    using (SqlCommand cmd = new SqlCommand("ACCM_ClassCurriculum_Upsert", conn))
                                    {
                                        #region EXECUTE STORE PROCEDURE

                                        cmd.CommandType = CommandType.StoredProcedure;

                                        cmd.Parameters.AddWithValue("@DB_OperationType", PostedData.OperationType);
                                        cmd.Parameters.AddWithValue("@GuID", PostedData.GuID);
                                        cmd.Parameters.AddWithValue("@CampusId", PostedData.CampusId);
                                        cmd.Parameters.AddWithValue("@Description", PostedData.Description?.Trim().ToSafeString());
                                        cmd.Parameters.AddWithValue("@ClassId", PostedData.ClassId);
                                        cmd.Parameters.AddWithValue("@CreatedOn", DateTime.Now);
                                        cmd.Parameters.AddWithValue("@CreatedBy", Session_Manager.UserId);
                                        cmd.Parameters.AddWithValue("@UpdatedOn", DateTime.Now);
                                        cmd.Parameters.AddWithValue("@UpdatedBy", Session_Manager.UserId);
                                        cmd.Parameters.AddWithValue("@DocType", (int?)DOCUMENT_TYPE.ACADEMIC_CLASS_CURRICULUM);
                                        cmd.Parameters.AddWithValue("@DocumentStatus", (int?)DOCUMENT_STATUS.ACTIVE_ACADEMIC_CLASS_CURRICULUM);
                                        cmd.Parameters.AddWithValue("@Status", true);
                                        cmd.Parameters.AddWithValue("@BranchId", Session_Manager.BranchId);
                                        cmd.Parameters.AddWithValue("@CompanyId", Session_Manager.CompanyId);
                                        cmd.Parameters.AddWithValue("@Remarks", PostedData.Remarks?.Trim().ToSafeString());

                                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@TVP_ACCM_ClassCurriculum", PostedDataDetail.ToDataTable());
                                        tvpParam.SqlDbType = SqlDbType.Structured;
                                        tvpParam.TypeName = "dbo.BULK_ACCM_ClassCurriculumSubject";

                                        SqlParameter responseParam = new SqlParameter("@Response", SqlDbType.Int)
                                        {
                                            Direction = ParameterDirection.Output
                                        };
                                        cmd.Parameters.Add(responseParam);

                                        conn.Open();
                                        cmd.ExecuteNonQuery();



                                        #endregion

                                    }

                                }
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