﻿using office360.Common.CommonHelper;
using office360.CommonHelper;
using office360.Extensions;
using office360.GlobalHelper.LookUp;
using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static office360.Models.General.Http_Server_Status;

namespace office360.Areas.ABranch.Controllers
{
    public class CBranchManagmentUIController : Controller
    {
        SESEntities db = new SESEntities();
        int? StatusCode = 0;
        int? _Exe = 0;

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** ------------------------------------------------------------------- */
        
        #region ACTION RESULT FOR :: RENDER VIEW
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult CreateUpdate_CBMUI_Branch(_SqlParameters PostedData)
        {
            #region PASS VIEW
            _Exe = GetAllListFromDB.GetAllowedUsersRightsByParameter(PostedData.RightId);
            #endregion
            if (_Exe == (int?)Http_DB_Response.CODE_SUCCESS)
            {
                ViewBag.Title = PostedData.DisplayName.ToSafeString();
                ViewBag.DB_OperationType = PostedData.OperationType.ToSafeString();
                return View();
            }
            else
            {
                return RedirectToAction(_ActionsURL.LogIn, _Controller.Home, new { area = "" });
            }
        }

        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult View_List_CBMUI_Branch(_SqlParameters PostedData)
        {
            #region PASS VIEW
            _Exe = GetAllListFromDB.GetAllowedUsersRightsByParameter(PostedData.RightId);
            #endregion
            if (_Exe == (int?)Http_DB_Response.CODE_SUCCESS)
            {
                ViewBag.Title = PostedData.DisplayName.ToSafeString();
                ViewBag.DB_OperationType = PostedData.OperationType.ToSafeString();
                return View();
            }
            else
            {
                return RedirectToAction(_ActionsURL.LogIn, _Controller.Home, new { area = "" });
            }
        }
        #endregion


        /*---------------------- ** ACTION RESULTS FOR :: RENDER DATA FOR DROP DOWN LIST FROM DB_LOOKUP USING LINQUERY ** --------------------------- */

        #region ACTION RESULT FOR :: RENDER DATA FOR DROP DOWN FROM DB_LOOKUP -- LINQ-QUERY
        public ActionResult GET_LK1_CAMPUSTYPE(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_CampusType(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_ORGANIZATIONTYPE(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_OrganizationType(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_COUNTRY(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_Country(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_CITY_BYPARAMETER(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_City(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_POLICYPERIOD(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_PolicyPeriod(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_ROLLCALLSYSTEM(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_RollCallSystem(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_BILLINGMETHOD(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_BillingMethod(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }

        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF DROP DOWN LIST FROM DB_LOOKUP USING STOREDPROCEDURE ** -------------------- */

        #region ACTION RESULT FOR :: RENDER DROP DOWN FROM DB_LOOKUP -- STORED PROCEDURE
        public ActionResult GET_LK1_CHALLANMETHOD_BYPARAMTER(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_SP.GET_LK1_ChallanMethod(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_STUDYGROUP_BYPARAMTER(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_SP.GET_LK1_StudyGroup(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_STUDYLEVEL_BYPARAMTER(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_SP.GET_LK1_StudyLevel(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }

        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATABASE OPERATION BY USER (INSERT/UPDATE/DELETE OF BRANCH) ** ---------------------- */

        #region ACTION RESULT FOR :: INSERT/UPDATE/DELETE INTO DBO.BM_Branch & DBO.BM_BranchSetting
        [HttpPost]
        public ActionResult UpSert_Into_BM_Branch(_SqlParameters PostedData)
        {
            _Exe = ABranch.HelperCode.CUD_Operation.Update_Insert_BM_Branch(PostedData);
            var data = new { Message = Http_Server_Status.HTTP_DB_TransactionMessagByStatusCode(_Exe), StatusCode = _Exe };
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: EDIT (LOAD DOCUMENT OF BRANCH & GET DETAIL BY BRANCH_GUID) ** ------------------------ */

        #region ACTION RESULT FOR :: SEARCH DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public ActionResult GET_MT_BM_BRANCH_BYPARAMETER_SEARCH(_SqlParameters PostedData)
        {
            var DATA = ABranch.HelperCode.DATA_FROM_SP.GET_MT_BM_BRANCH_BYPARAM(PostedData).ToList();
            return Json(new { data = DATA }, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region ACTION RESULT FOR :: GET DOCUMENT DETAIL (DBO.BM_BRANCH & DBO.BM_BRANCH_SETTING) -- LINQ-QUERY
        public ActionResult GET_MT_BM_BRANCH_INFOBYGUID(_SqlParameters PostedData)
        {
            var DATA = ABranch.HelperCode.Document_Detail_By_GUID_LINQ.GET_MT_BM_BRANCH_INFO_BY_GUID(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }

        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATA TABLE (LOAD TABLE OF BRANCH BY INPUT TYPE & TEXT) ** ---------------------------- */

        #region ACTION RESULT FOR :: GET LIST BY SEARCH PARAMETER FOR DATA-TABLE (DBO.BM_BRANCH)-- STORED PROCEDURE
        public ActionResult GET_MT_BM_BRANCH_LIST_BY_SEARCHQUERY_FORDATATABLE(_SqlParameters PostedData)
        {
            var DATA = ABranch.HelperCode.DATA_FROM_SP.GET_MT_BM_BRANCH_LIST_BY_SEARCHQUERY(PostedData).ToList();
            return Json(new { success = true, data = DATA }, JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}