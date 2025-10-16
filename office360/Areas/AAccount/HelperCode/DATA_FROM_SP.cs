using System;
using System.Linq;
using System.Web;

using static office360.Models.General.HttpServerStatus;


using System.Data.Entity.Infrastructure;
using office360.Models.EDMX;
using office360.Models.General;
using office360.Common.CommonHelper;
using System.Data.Entity.Core.Objects;
using office360.Extensions;
using System.Collections.Generic;

namespace office360.Areas.AAccount.HelperCode
{
    public class DATA_FROM_SP
    {
        #region DBO:- ACOAM_CHARTOFACCOUNT

        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB -- DBO:- ACOAM_CHARTOFACCOUNT
        public static List<ACOAM_ChartOfAccount_GetListByParam_Result> GET_MT_ACOAM_CHARTOFACCOUNT_BYPARAM(SQLParamters PostedData)
        {
            List<ACOAM_ChartOfAccount_GetListByParam_Result> DATA = new List<ACOAM_ChartOfAccount_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.ACOAM_ChartOfAccount_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       PostedData.SearchParameter,
                                                       PostedData.CompanyId
                                                       ).ToList();

                return DATA;
            }
        }
        #endregion

        #endregion

    }

}