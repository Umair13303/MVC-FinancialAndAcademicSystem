using System;
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
using System.Collections.Generic;

namespace office360.Areas.ACompany.HelperCode
{
    public class DATA_FROM_SP
    {
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB
        public static List<CM_Company_GetListByParam_Result> GET_MT_CM_COMPANY_BYPARAM(_SqlParameters PostedData)
        {

            using (SESEntities db = new SESEntities())
            {
                List<CM_Company_GetListByParam_Result> DATA = new List<CM_Company_GetListByParam_Result>();

                DATA = db.CM_Company_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       Session_Manager.AllowedCampusIds,
                                                       PostedData.SearchParameter,
                                                       PostedData.CompanyId
                                                       ).ToList();

                return DATA;
            }
        }

        public static List<RSM_RightSetting_GetListByParam_Result> GET_MT_RSM_RIGHTSETTING_BYPARAM(_SqlParameters PostedData)
        {

            using (SESEntities db = new SESEntities())
            {
                List<RSM_RightSetting_GetListByParam_Result> DATA = new List<RSM_RightSetting_GetListByParam_Result>();

                DATA = db.RSM_RightSetting_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       PostedData.SearchParameter,
                                                       PostedData.CompanyId
                                                       ).ToList();

                return DATA;
            }
        }
        #endregion



    }
}