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
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB
        public static List<UM_User_GetListByParam_Result> GET_MT_UM_USER_BYPARAM(_SqlParameters PostedData)
        {

            using (SESEntities db = new SESEntities())
            {
                List<UM_User_GetListByParam_Result> DATA = new List<UM_User_GetListByParam_Result>();

                DATA = db.UM_User_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       PostedData.SearchParameter,
                                                       PostedData.CompanyId
                                                       ).ToList();

                return DATA;
            }
        }
        public static List<UM_User_GetListBySearch_Result> GET_MT_UM_USER_LIST_BY_SEARCHQUERY(_SqlParameters PostedData)
        {
            List<UM_User_GetListBySearch_Result> List = new List<UM_User_GetListBySearch_Result>();
            using (var db = new SESEntities())
            {
                List = db.UM_User_GetListBySearch(
                                                        Session_Manager.CompanyId,
                                                        Session_Manager.BranchId,
                                                        PostedData.SearchById,
                                                        PostedData.InputText
                                                        ).ToList<UM_User_GetListBySearch_Result>();
            }
            return List;

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
        public static List<URM_UserRight_GetListBySearch_Result> GET_MT_URM_USERRIGHT_LIST_BY_USERID_SEARCHPARAM(_SqlParameters PostedData)
        {

            using (SESEntities db = new SESEntities())
            {
                List<URM_UserRight_GetListBySearch_Result> DATA = new List<URM_UserRight_GetListBySearch_Result>();

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

    }
}