using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;
using static office360.Models.General.Http_Server_Status;
using static office360.Models.General.DBListCondition;
using DocumentStatus = office360.Models.General.DocumentStatus;
using System.Data.Entity.Infrastructure;
using office360.Models.EDMX;
using office360.Models.General;
using office360.Common.CommonHelper;
using System.Data.Entity.Core.Objects;
using office360.Extensions;
using System;


namespace office360.Areas.AUser.HelperCode
{
    public class CUD_Operation
    {
        #region HELPER FOR :: INSERT/UPDATE DATA USING STORED PROCEDURE (DBO.UM_User) ::-- MAIN DB
        public static int? Update_Insert_UM_User(_SqlParameters PostedData)
        {
            using (var db = new SESEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {
                        #region CHECK DUPLICATE :: NO-OPERATION ACTIVE IF USER EXIST
                        int? DB_OPERATION_STATUS = AUser.HelperCode.Check_Duplicate_By_LINQ.IS_EXIST_UM_USER_BY_USERNAME(PostedData);

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
                                var UM_User = db.UM_User_Upsert(
                                                                PostedData.OperationType,
                                                                PostedData.GuID,
                                                                PostedData.Name?.Trim(),
                                                                PostedData.UserName?.Trim(),
                                                                PostedData.Password?.Trim(),
                                                                PostedData.EmailAddress?.Trim(),
                                                                PostedData.MobileNumber?.Trim(),
                                                                PostedData.EmployeeId,
                                                                PostedData.RoleId,
                                                                PostedData.AllowedCampusIds?.Trim(),
                                                                PostedData.IsLogIn,
                                                                PostedData.IsDeveloper,
                                                                DateTime.Now,
                                                                Session_Manager.UserId,
                                                                DateTime.Now,
                                                                Session_Manager.UserId,
                                                                (int?)DocumentStatus.DocType.USER,
                                                                (int?)DocumentStatus.DocStatus.ACTIVE_USER,
                                                                true,
                                                                PostedData.BranchId,
                                                                PostedData.CompanyId,
                                                                PostedData.Remarks?.Trim(),
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
                                return Http_Server_Status.Http_DB_ResponseByReturnValue(Response);

                            default:
                                return Http_Server_Status.Http_DB_ResponseByReturnValue(DB_OPERATION_STATUS);
                        }
                        #endregion
                    }
                    catch (Exception Ex)
                    {
                        dbTran.Rollback();
                        return Http_Server_Status.Http_DB_Response.CODE_INTERNAL_SERVER_ERROR.ToInt();
                    }
                }
            }
        }
        #endregion

        #region HELPER FOR :: INSERT/UPDATE DATA USING STORED PROCEDURE (DBO.URM_UserRight) ::-- MAIN DB
        public static int? Update_Insert_URM_UserRight(_SqlParameters PostedData)
        {
            using (var db = new SESEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {
                        #region CHECK DUPLICATE :: NO-OPERATION IF ACTIVE USER_RIGHT EXIST
                        int? DB_OPERATION_STATUS = AUser.HelperCode.Check_Duplicate_By_LINQ.IS_EXIST_URM_USERRIGHT_BY_USERID(PostedData);
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
                                var URM_UserRight = db.URM_UserRight_Upsert(
                                                                                    PostedData.OperationType,
                                                                                    PostedData.GuID,
                                                                                    PostedData.UserId,
                                                                                    PostedData.RightId,
                                                                                    DateTime.Now,
                                                                                    Session_Manager.UserId,
                                                                                    DateTime.Now,
                                                                                    Session_Manager.UserId,
                                                                                    (int?)DocumentStatus.DocType.USER_RIGHT,
                                                                                    (int?)DocumentStatus.DocStatus.ACTIVE_USER_RIGHT,
                                                                                    true,
                                                                                    PostedData.BranchId,
                                                                                    PostedData.CompanyId,
                                                                                    PostedData.Remarks?.Trim(),
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
                                return Http_Server_Status.Http_DB_ResponseByReturnValue(Response);
                            default:
                                return Http_Server_Status.Http_DB_ResponseByReturnValue(DB_OPERATION_STATUS);
                        }
                        #endregion
                    }
                    catch (Exception Ex)
                    {
                        dbTran.Rollback();
                        return Http_Server_Status.Http_DB_Response.CODE_INTERNAL_SERVER_ERROR.ToInt();
                    }
                }
            }
        }
        #endregion
    }
}