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

namespace office360.Areas.AUser.HelperCode
{
    public class DATA_FROM_SP
    {
        #region DBO:- UM_USER
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB
        public static List<UM_User_GetListByParam_Result> GET_MT_UM_USER_BYPARAM(_SqlParameters PostedData)
        {
            List<UM_User_GetListByParam_Result> DATA = new List<UM_User_GetListByParam_Result>();
            using (SESEntities db = new SESEntities())
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
        public static List<UM_User_GetListBySearch_Result> GET_MT_UM_USER_LIST_BY_SEARCHQUERY(_SqlParameters PostedData)
        {
            List<UM_User_GetListBySearch_Result> DATA = new List<UM_User_GetListBySearch_Result>();
            using (var db = new SESEntities())
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
        public static List<URM_UserRight_GetListByParam_Result> GET_MT_URM_USERRIGHT_BYPARAM(_SqlParameters PostedData)
        {
            List<URM_UserRight_GetListByParam_Result> DATA = new List<URM_UserRight_GetListByParam_Result>();
            using (SESEntities db = new SESEntities())
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
        public static List<URM_UserRight_GetListBySearch_Result> GET_MT_URM_USERRIGHT_LIST_BY_USERID_SEARCHQUERY(_SqlParameters PostedData)
        {
            List<URM_UserRight_GetListBySearch_Result> DATA = new List<URM_UserRight_GetListBySearch_Result>();
            using (SESEntities db = new SESEntities())
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