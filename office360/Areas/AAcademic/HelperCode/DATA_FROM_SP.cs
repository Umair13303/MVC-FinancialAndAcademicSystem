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

namespace office360.Areas.AAcademic.HelperCode
{
    public class DATA_FROM_SP
    {
        #region DBO:- ACM_CLASS

        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB -- DBO:- ACM_CLASS
        public static List<ACM_Class_GetListByParam_Result> GET_MT_ACM_CLASS_BYPARAM(SQLParamters PostedData)
        {
            List<ACM_Class_GetListByParam_Result> DATA = new List<ACM_Class_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.ACM_Class_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       Session_Manager.BranchId,
                                                       Session_Manager.AllowedCampusIds,
                                                       PostedData.SearchParameter,
                                                       PostedData.CampusId,
                                                       PostedData.CompanyId
                                                       ).ToList();

                return DATA;
            }
        }
        #endregion

        #region HELPER FOR :: GET DATA USING STORED PROCEDURE FOR DATA-TABLE BY SEARCH PARAMETER ::-- MAIN DB
        public static List<ACM_Class_GetListBySearch_Result> GET_MT_ACM_CLASS_LIST_BY_SEARCHQUERY(SQLParamters PostedData)
        {
            List<ACM_Class_GetListBySearch_Result> DATA = new List<ACM_Class_GetListBySearch_Result>();
            using (var db = new FASEntities())
            {
                DATA = db.ACM_Class_GetListBySearch(
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

        #region DBO:- ASM_SUBJECT

        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB -- DBO:- ASM_SUBJECT
        public static List<ASM_Subject_GetListByParam_Result> GET_MT_ASM_SUBJECT_BYPARAM(SQLParamters PostedData)
        {
            List<ASM_Subject_GetListByParam_Result> DATA = new List<ASM_Subject_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.ASM_Subject_GetListByParam(
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
        public static List<ASM_Subject_GetListBySearch_Result> GET_MT_ASM_SUBJECT_LIST_BY_SEARCHQUERY(SQLParamters PostedData)
        {
            List<ASM_Subject_GetListBySearch_Result> DATA = new List<ASM_Subject_GetListBySearch_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.ASM_Subject_GetListBySearch(
                                                       Session_Manager.CompanyId,
                                                       Session_Manager.BranchId,
                                                       PostedData.SearchById,
                                                       PostedData.InputText
                                                       ).ToList();

                return DATA;
            }
        }
        #endregion
        #endregion

        #region DBO:- AASM_ADMISSIONSESSION
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- MAIN DB
        public static List<AASM_AdmissionSession_GetListByParam_Result> GET_MT_AASM_ADMISSIONSESSION_BYPARAM(SQLParamters PostedData)
        {
            List<AASM_AdmissionSession_GetListByParam_Result> DATA = new List<AASM_AdmissionSession_GetListByParam_Result>();
            using (FASEntities db = new FASEntities())
            {
                DATA = db.AASM_AdmissionSession_GetListByParam(
                                                       PostedData.DB_IF_PARAM,
                                                       Session_Manager.CompanyId,
                                                       Session_Manager.BranchId,
                                                       Session_Manager.AllowedCampusIds,
                                                       PostedData.SearchParameter,
                                                       PostedData.CampusId,
                                                       PostedData.CompanyId
                                                       ).ToList();
                return DATA;
            }
        }
        #endregion

        #region HELPER FOR :: GET DATA USING STORED PROCEDURE FOR DATA-TABLE BY SEARCH PARAMETER ::-- MAIN DB
        public static List<AASM_AdmissionSession_GetListBySearch_Result> GET_MT_AASM_ADMISSIONSESSION_LIST_BY_SEARCHQUERY(SQLParamters PostedData)
        {
            List<AASM_AdmissionSession_GetListBySearch_Result> DATA = new List<AASM_AdmissionSession_GetListBySearch_Result>();
            using (var db = new FASEntities())
            {
                DATA = db.AASM_AdmissionSession_GetListBySearch(
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