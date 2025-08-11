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

namespace office360.Areas.ABranch.HelperCode
{
    public class DATA_FROM_SP
    {
        #region DBO:- BM_BRANCH
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB
        public static List<BM_Branch_GetListByParam_Result> GET_MT_BM_BRANCH_BYPARAM(SQLParamters PostedData)
        {
            List<BM_Branch_GetListByParam_Result> DATA = new List<BM_Branch_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.BM_Branch_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       PostedData.CampusId ?? Session_Manager.BranchId,
                                                       Session_Manager.AllowedCampusIds,
                                                       PostedData.SearchParameter,
                                                       PostedData.CompanyId
                                                       ).ToList();
                return DATA;
            }
        }
        #endregion

        #region HELPER FOR :: GET DATA USING STORED PROCEDURE FOR DATA-TABLE BY SEARCH PARAMETER ::-- MAIN DB
        public static List<BM_Branch_GetListBySearch_Result> GET_MT_BM_BRANCH_LIST_BY_SEARCHQUERY(SQLParamters PostedData)
        {
            List<BM_Branch_GetListBySearch_Result> DATA = new List<BM_Branch_GetListBySearch_Result>();
            using (var db = new FASEntities())
            {
                DATA = db.BM_Branch_GetListBySearch(
                                                        Session_Manager.CompanyId,
                                                        Session_Manager.BranchId,
                                                        PostedData.SearchById,
                                                        PostedData.InputText
                                                        ).ToList();
            }
            return DATA;
        }
        #endregion

        #endregion



    }
}