using office360.Common.CommonHelper;
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

namespace office360.Areas.AUser.Controllers
{
    public class CUserRightManagmentUIController : Controller
    {
        SESEntities db = new SESEntities();
        int? StatusCode = 0;
        int? _Exe = 0;

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** ------------------------------------------------------------------- */

        #region ACTION RESULT FOR :: RENDER VIEW
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult CreateUpdate_URMUI_UserRight(_SqlParameters PostedData)
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
        public ActionResult View_List_URMUI_UserRight(_SqlParameters PostedData)
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


        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF DROP DOWN LIST FROM DB_LOOKUP USING LINQUERY ** ---------------------------- */

        #region ACTION RESULT FOR :: RENDER DROP DOWN FROM DB_LOOKUP -- LINQ-QUERY
        public ActionResult GET_LK1_RIGHT(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_Right(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF DROP DOWN LIST FROM DB_MAIN USING STOREDPROCEDURE ** ---------------------------- */

        #region ACTION RESULT FOR :: RENDER DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public ActionResult GET_MT_CM_COMPANY_BYPARAMTER(_SqlParameters PostedData)
        {
            var DATA = ACompany.HelperCode.DATA_FROM_SP.GET_MT_CM_COMPANY_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GET_MT_UM_USER_BYPARAMETER(_SqlParameters PostedData)
        {
            var DATA = AUser.HelperCode.DATA_FROM_SP.GET_MT_UM_USER_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATABASE OPERATION BY USER (INSERT/UPDATE/DELETE OF USER RIGHT's) ** ---------------------- */

        #region ACTION RESULT FOR :: INSERT/UPDATE/DELETE INTO DBO.URM_UserRight
        [HttpPost]
        public ActionResult UpSert_Into_URM_UserRight(_SqlParameters PostedData)
        {
            _Exe = AUser.HelperCode.CUD_Operation.Update_Insert_URM_UserRight(PostedData);
            var data = new { Message = Http_Server_Status.HTTP_DB_TransactionMessagByStatusCode(_Exe), StatusCode = _Exe };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATA TABLE (LOAD TABLE OF USER BY INPUT TYPE & TEXT) ** ---------------------------- */

        #region ACTION RESULT FOR :: GET LIST BY SEARCH PARAMETER FOR DATA-TABLE (DBO.UM_USER & URM_USERRIGHT)-- STORED PROCEDURE
        public ActionResult GET_MT_UM_USER_LIST_BY_SEARCHQUERY_FORDATATABLE(_SqlParameters PostedData)
        {
            var DATA = AUser.HelperCode.DATA_FROM_SP.GET_MT_UM_USER_LIST_BY_SEARCHQUERY(PostedData).ToList();
            return Json(new { success = true, data = DATA }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_URM_USERRIGHT_LIST_BY_USERID_SEARCHQUERY_FORDATATABLE(_SqlParameters PostedData)
        {
            var DATA = AUser.HelperCode.DATA_FROM_SP.GET_MT_URM_USERRIGHT_LIST_BY_USERID_SEARCHPARAM(PostedData).ToList();
            return Json( DATA, JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}