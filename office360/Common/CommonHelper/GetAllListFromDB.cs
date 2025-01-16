using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using office360.Models.General;
using office360.Models.EDMX;
using office360.Extensions;
using static office360.Models.General.DBListCondition;
using static office360.Models.General.Http_Server_Status;
namespace office360.CommonHelper
{
    public class GetAllListFromDB
    {

        #region COMMONS LIST FUNCTIONS


        public static List<RSM_RightSetting_GetDetailByParam_Result> GetRightsByParameter()
        {
            using (var db = new SESEntities())
            {
                var DATA = db.RSM_RightSetting_GetDetailByParam(
                                                              DB_IF_Condition.GET_ALL_ALLOWED_RIGHTS_TO_LOGIN_USER_FOR_SIDE_MENUE.ToSafeString(),
                                                              Session_Manager.AllowedCampusIds,
                                                              Session_Manager.UserId,
                                                              Session_Manager.CompanyId,
                                                              ASPManagRoles.URLTYPEID_FORM,
                                                              true,
                                                              null,
                                                              null,
                                                              null
                                                            ).ToList();


                return DATA;
            }
        }
        public static int? GetAllowedUsersRightsByParameter(int? RightId)
        {
            using (var db = new SESEntities())
            {
                var data = db.RSM_RightSetting_GetDetailByParam(
                                                              DB_IF_Condition.GET_ALLOWED_RIGHTS_TO_LOGIN_USER_BY_RIGHTID.ToSafeString(),
                                                              Session_Manager.AllowedCampusIds,
                                                              Session_Manager.UserId,
                                                              Session_Manager.CompanyId,
                                                              ASPManagRoles.URLTYPEID_FORM,
                                                              true,
                                                              null,
                                                              RightId,
                                                              null
                                                            ).ToList();

                
                if (data.Count > 0)
                {
                    return (int?)Http_DB_Response.CODE_SUCCESS;


                }
                else
                {
                    return (int?)Http_DB_Response.CODE_UNAUTHORIZED;
                }
            }
        }
        public static int? GetAllowedUsersRightsByURL(string RightPATH)
        {
            using (var db = new SESEntities())
            {
                var data = db.RSM_RightSetting_GetDetailByParam(
                                                              DB_IF_Condition.GET_ALLOWED_RIGHTS_TO_LOGIN_USER_BY_URL.ToSafeString(),
                                                              Session_Manager.AllowedCampusIds,
                                                              Session_Manager.UserId,
                                                              Session_Manager.CompanyId,
                                                              ASPManagRoles.URLTYPEID_FORM,
                                                              true,
                                                              null,
                                                              null,
                                                              RightPATH
                                                            ).ToList();
                if (data.Count > 0)
                {
                    return (int?)Http_DB_Response.CODE_SUCCESS;


                }
                else
                {
                    return (int?)Http_DB_Response.CODE_UNAUTHORIZED;
                }
            }
        }
        #endregion
    }
}