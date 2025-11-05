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
        public static List<ACOAM_ChartOfAccount_GetListByParam_Result> GET_MT_ACOAM_ChartOfAccount_By_Param_List(SQLParamters PostedData)
        {
            List<ACOAM_ChartOfAccount_GetListByParam_Result> DATA = new List<ACOAM_ChartOfAccount_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.ACOAM_ChartOfAccount_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       PostedData.SearchParameter,
                                                       PostedData.CompanyId,
                                                       PostedData.AccountTypeId
                                                       ).ToList();

                return DATA;
            }
        }
        #endregion
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE FOR DATA-TABLE BY SEARCH PARAMETER ::-- MAIN DB
        public static List<ACOAM_ChartOfAccount_GetListBySearch_Result> GET_MT_ACOAM_ChartOfAccount_List_By_SearchQuery(SQLParamters PostedData)
        {
            List<ACOAM_ChartOfAccount_GetListBySearch_Result> DATA = new List<ACOAM_ChartOfAccount_GetListBySearch_Result>();
            using (var db = new FASEntities())
            {
                DATA = db.ACOAM_ChartOfAccount_GetListBySearch(
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

        #region DBO:- ADTM_DISCOUNTTYPE

        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB -- DBO:- ADTM_DISCOUNTTYPE
        public static List<ADTM_DiscountType_GetListByParam_Result> GET_MT_ADTM_DiscountType_By_Param_List(SQLParamters PostedData)
        {
            List<ADTM_DiscountType_GetListByParam_Result> DATA = new List<ADTM_DiscountType_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.ADTM_DiscountType_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       Session_Manager.BranchId,
                                                       PostedData.SearchParameter,
                                                       PostedData.CompanyId
                                                       ).ToList();

                return DATA;
            }
        }
        #endregion
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE FOR DATA-TABLE BY SEARCH PARAMETER ::-- MAIN DB
        public static List<ADTM_DiscountType_GetListBySearch_Result> GET_MT_ADTM_DiscountType_List_By_SearchQuery(SQLParamters PostedData)
        {
            List<ADTM_DiscountType_GetListBySearch_Result> DATA = new List<ADTM_DiscountType_GetListBySearch_Result>();
            using (var db = new FASEntities())
            {
                DATA = db.ADTM_DiscountType_GetListBySearch(
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

        #region DBO:- AFTM_FEETYPE

        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB -- DBO:- AFTM_FEETYPE
        public static List<AFTM_FeeType_GetListByParam_Result> GET_MT_AFTM_FeeType_By_Param_List(SQLParamters PostedData)
        {
            List<AFTM_FeeType_GetListByParam_Result> DATA = new List<AFTM_FeeType_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.AFTM_FeeType_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       PostedData.FeeCategoryIds,
                                                       Session_Manager.CompanyId,
                                                       Session_Manager.BranchId,
                                                       PostedData.SearchParameter,
                                                       PostedData.CompanyId
                                                       ).ToList();

                return DATA;
            }
        }
        #endregion
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE FOR DATA-TABLE BY SEARCH PARAMETER ::-- MAIN DB
        public static List<AFTM_FeeType_GetListBySearch_Result> GET_MT_AFTM_FeeType_List_By_SearchQuery(SQLParamters PostedData)
        {
            List<AFTM_FeeType_GetListBySearch_Result> DATA = new List<AFTM_FeeType_GetListBySearch_Result>();
            using (var db = new FASEntities())
            {
                DATA = db.AFTM_FeeType_GetListBySearch(
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