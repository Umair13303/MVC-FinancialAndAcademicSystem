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
    public class Check_Duplicate_By_LINQ
    {


        #region HELPER FOR :: CHECK IF Company(ACTIVE_COMPANY) ALREADY EXIST
        public static int? IS_EXIST_CM_COMPANY_BY_COMPANYNAME(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                int? Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                try
                {
                    switch (PostedData.OperationType)
                    {

                        case nameof(DB_OperationType.INSERT_DATA_INTO_DB):


                            var DATA = db.CM_Company
                                .Where(x =>
                                    x.CompanyName == PostedData.CompanyName &&
                                    x.DocumentStatus == (int?)DocStatus.ACTIVE_COMPANY &&
                                    x.Status == true
                                )
                                .Select(x => new _SqlParameters { Id = x.Id }).ToList();

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
                    return Http_Server_Status.Http_DB_Response.CODE_UN_KNOWN_ACTIVITY.ToInt();

                }

            }
        }
        #endregion

        #region HELPER FOR :: CHECK IF RightSetting(ACTIVE_RIGHTSETTING) ALREADY EXIST

        public static int? IS_EXIST_RSM_RIGHTSETTING_BY_COMPANYID(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
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
                                    x.DocumentStatus == (int?)DocStatus.ACTIVE_RIGHT_SETTING &&
                                    x.Status == true
                                )
                                .Select(x => new _SqlParameters { Id = x.Id }).ToList();

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
                    return Http_Server_Status.Http_DB_Response.CODE_UN_KNOWN_ACTIVITY.ToInt();

                }

            }
        }
        #endregion

    }
}