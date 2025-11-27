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

namespace office360.Areas.AStudent.HelperCode
{
    public class DATA_FROM_SP
    {
        #region DBO:- SM_STUDENT
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB
        public static List<SM_Student_GetListByParam_Result> GET_MT_SM_Student_By_Param_List(SQLParamters PostedData)
        {
            List<SM_Student_GetListByParam_Result> DATA = new List<SM_Student_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.SM_Student_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       Session_Manager.BranchId,
                                                       Session_Manager.AllowedCampusIds,
                                                       PostedData.SearchParameter,
                                                       PostedData.CampusId,
                                                       PostedData.CompanyId,
                                                       PostedData.ClassId,
                                                       PostedData.AdmissionSessionId,
                                                       PostedData.StudentCNIC
                                                       ).ToList();
                return DATA;
            }
        }
        #endregion

        #region HELPER FOR :: GET DATA USING STORED PROCEDURE FOR DATA-TABLE BY SEARCH PARAMETER ::-- MAIN DB
        public static List<SM_Student_GetListBySearch_Result> GET_MT_SM_Student_List_By_SearchQuery(SQLParamters PostedData)
        {
            List<SM_Student_GetListBySearch_Result> DATA = new List<SM_Student_GetListBySearch_Result>();
            using (var db = new FASEntities())
            {
                DATA = db.SM_Student_GetListBySearch(
                                                        Session_Manager.CompanyId,
                                                        Session_Manager.BranchId,
                                                        Session_Manager.AllowedCampusIds,
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