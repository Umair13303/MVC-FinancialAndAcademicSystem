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

namespace office360.Areas.AAccount.HelperCode
{
    public class CUD_Operation
    {
        #region HELPER FOR :: INSERT/UPDATE DATA USING STORED PROCEDURE (DBO.ACOAM_CHARTOFACCOUNT) ::-- MAIN DB
        public static int? Update_Insert_ACOAM_ChartOfAccount(SQLParamters PostedData)
        {
            using (var db = new FASEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {

                        #region CHECK DUPLICATE :: NO-OPERATION IF ACTIVE CHART OF ACCOUNT EXIST
                        int? DB_OPERATION_STATUS = AAccount.HelperCode.Check_Duplicate_By_LINQ.IS_EXIST_ACOAM_CHARTOFACCOUNT_BY_PARAMETER(PostedData);
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
                                var ACOAM_ChartOfAccount = db.ACOAM_ChartOfAccount_Upsert(
                                                                     PostedData.OperationType,
                                                                     PostedData.GuID,
                                                                     PostedData.Description?.Trim(),
                                                                     PostedData.AccountTypeId,
                                                                     PostedData.AccountCategoryId,
                                                                     PostedData.FinancialStatementId,
                                                                     DateTime.Now,
                                                                     Session_Manager.UserId,
                                                                     DateTime.Now,
                                                                     Session_Manager.UserId,
                                                                     (int?)DOCUMENT_TYPE.ACCOUNT_CHART_OF_ACCOUNT,
                                                                     (int?)DOCUMENT_STATUS.ACTIVE_ACCOUNT_CHART_OF_ACCOUNT,
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