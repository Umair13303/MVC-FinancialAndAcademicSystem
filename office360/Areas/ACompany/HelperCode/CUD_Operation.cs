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


namespace office360.Areas.ACompany.HelperCode
{
    public class CUD_Operation
    {
        #region HELPER FOR :: INSERT/UPDATE DATA USING STORED PROCEDURE (DBO.CM_COMPANY) ::-- MAIN DB
        public static int? Update_Insert_CM_Company(_SqlParameters PostedData)
        {
            using (var db = new SESEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {
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
                        var CM_Company = db.CM_Company_Upsert(
                                                                PostedData.OperationType,
                                                                PostedData.GuID,
                                                                PostedData.CompanyName,
                                                                PostedData.CityId,
                                                                PostedData.CountryId,
                                                                PostedData.Address,
                                                                PostedData.PhoneNumber,
                                                                PostedData.EmailAddress,
                                                                PostedData.CompanyWebsite,
                                                                PostedData.LogoPath,
                                                                DateTime.Now,
                                                                Session_Manager.UserId,
                                                                DateTime.Now,
                                                                Session_Manager.UserId,
                                                                (int?)DocumentStatus.DocType.COMPANY,
                                                                (int?)DocumentStatus.DocStatus.ACTIVE_COMPANY,
                                                                true,
                                                                Session_Manager.BranchId,
                                                                Session_Manager.CompanyId,
                                                                PostedData.Remarks,
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