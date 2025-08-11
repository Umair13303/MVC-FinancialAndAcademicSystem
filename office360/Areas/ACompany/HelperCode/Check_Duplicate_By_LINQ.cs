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
namespace office360.Areas.ACompany.HelperCode
{
    public class Check_Duplicate_By_LINQ
    {


        #region HELPER FOR :: CHECK IF Company(ACTIVE_COMPANY) ALREADY EXIST
        public static int? IS_EXIST_CM_COMPANY_BY_PARAMETER(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                bool IsRecordExist = false;
                int? Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                try
                {
                    switch (PostedData.OperationType)
                    {

                        case nameof(DB_OperationType.INSERT_DATA_INTO_DB):

                            #region IN CASE OF INSERT :: CHECK IF ENTERY RECORD EXIST , BASED ON DATA ENTERED
                            IsRecordExist = db.CM_Company
                                .Any(x =>
                                    x.CompanyName == PostedData.CompanyName &&
                                    x.DocumentStatus == (int?)DOCUMENT_STATUS.ACTIVE_COMPANY &&
                                    x.Status == true
                                );
                            #endregion
                            if (!IsRecordExist)
                                Response = (int?)Http_DB_Response.CODE_AUTHORIZED;
                            else
                                Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                            break;

                        case nameof(DB_OperationType.UPDATE_DATA_INTO_DB):
                            #region IN CASE OF UPDATE :: CHECK IF ENTERY RECORD EXIST , BASED ON SYSTEM GUID
                            IsRecordExist = db.CM_Company.Any(x => x.GuID == PostedData.GuID);
                            #endregion
                            if (!IsRecordExist)
                                Response = (int?)Http_DB_Response.CODE_DATA_DOES_NOT_EXIST;
                            else
                                Response = (int?)Http_DB_Response.CODE_AUTHORIZED;
                            break;

                        default:
                            Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                            break;


                    }
                    return Response;
                }
                catch (Exception Ex)
                {
                    return HttpServerStatus.Http_DB_Response.CODE_UN_KNOWN_ACTIVITY.ToInt();

                }

            }
        }
        #endregion

        #region HELPER FOR :: CHECK IF RightSetting(ACTIVE_RIGHTSETTING) ALREADY EXIST

        public static int? IS_EXIST_RSM_RIGHTSETTING_BY_PARAMETER(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                int? Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                try
                {
                    switch (PostedData.OperationType)
                    {

                        case nameof(DB_OperationType.INSERT_DATA_INTO_DB):


                            var DATA = db.RSM_RightSetting
                                .Where(x =>
                                    x.RightId == PostedData.RightId &&
                                    x.CompanyId == PostedData.CompanyId &&
                                    x.DocumentStatus == (int?)DOCUMENT_STATUS.ACTIVE_RIGHT_SETTING &&
                                    x.Status == true
                                )
                                .Select(x => new SQLParamters { Id = x.Id }).ToList();

                            if (DATA.Count == 0)
                            {
                                Response = (int?)Http_DB_Response.CODE_AUTHORIZED;

                            }
                            else
                            {
                                Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                            }
                            break;

                        case nameof(DB_OperationType.UPDATE_DATA_INTO_DB):
                            Response = (int?)Http_DB_Response.CODE_AUTHORIZED;
                            break;

                        default:
                            Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                            break;


                    }
                    return Response;
                }
                catch (Exception Ex)
                {
                    return HttpServerStatus.Http_DB_Response.CODE_UN_KNOWN_ACTIVITY.ToInt();

                }

            }
        }
        #endregion

    }
}