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

namespace office360.Areas.AUser.HelperCode
{
    public class DATA_FROM_SP
    {
        #region DBO:- UM_USER
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB
        public static List<UM_User_GetListByParam_Result> GET_MT_UM_User_By_Param_List(SQLParamters PostedData)
        {
            List<UM_User_GetListByParam_Result> DATA = new List<UM_User_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.UM_User_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       PostedData.SearchParameter,
                                                       PostedData.CompanyId
                                                       ).ToList();
                return DATA;
            }
        }
        #endregion

        #region HELPER FOR :: GET DATA USING STORED PROCEDURE FOR DATA-TABLE BY SEARCH PARAMETER ::-- MAIN DB
        public static List<UM_User_GetListBySearch_Result> GET_MT_UM_User_List_By_SearchQuery(SQLParamters PostedData)
        {
            List<UM_User_GetListBySearch_Result> DATA = new List<UM_User_GetListBySearch_Result>();
            using (var db = new FASEntities())
            {
                DATA = db.UM_User_GetListBySearch(
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

        #region DBO:- URM_USERRIGHT
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB
        public static List<URM_UserRight_GetListByParam_Result> GET_MT_URM_UserRight_By_Param_List(SQLParamters PostedData)
        {
            List<URM_UserRight_GetListByParam_Result> DATA = new List<URM_UserRight_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.URM_UserRight_GetListByParam(
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
        public static List<URM_UserRight_GetListBySearch_Result> GET_MT_URM_UserRight_List_By_SearchQuery(SQLParamters PostedData)
        {
            List<URM_UserRight_GetListBySearch_Result> DATA = new List<URM_UserRight_GetListBySearch_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.URM_UserRight_GetListBySearch(
                                                        Session_Manager.CompanyId,
                                                        Session_Manager.BranchId,
                                                        PostedData.GuID,
                                                        PostedData.SearchById,
                                                        PostedData.InputText
                                                       ).ToList();
                return DATA;
            }
        }
        #endregion

        #endregion


    }
}