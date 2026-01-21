using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using office360.Common.CommonHelper;
using office360.CommonHelper;
using office360.Extensions;
using office360.GlobalHelper.LookUp;
using office360.Models.EDMX;
using office360.Models.General;
using static office360.Models.General.DDOFilter;
using static office360.Models.General.HttpServerStatus;

namespace office360.Areas.AUser.Controllers
{
    public class CUserRightManagmentUIController : Controller
    {
        FASEntities db = new FASEntities();
        int? StatusCode = 0;
        int? _Exe = 0;

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** ------------------------------------------------------------------- */

        #region ACTION RESULT FOR :: RENDER VIEW
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult CreateUpdate_URMUI_UserRight(SQLParamters PostedData)
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
        public ActionResult View_List_URMUI_UserRight(SQLParamters PostedData)
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
        public JsonResult GET_LK1_RIGHT(SQLParamters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_Right_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF DROP DOWN LIST FROM DB_MAIN USING STOREDPROCEDURE ** ---------------------------- */

        #region ACTION RESULT FOR :: RENDER DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public JsonResult GET_MT_CM_COMPANY_BYPARAMTER(SQLParamters PostedData)
        {
            switch (PostedData.OperationType)
            {
                case nameof(DB_OperationType.INSERT_DATA_INTO_DB):
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.CM_COMPANY_BY_SOLUTION_DEVELOPER_FORNEWINSERT);
                    break;
                default:
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.CM_COMPANY_BY_SOLUTION_DEVELOPER_FORUPDATERECORD);
                    break;
            }
            var DATA = ACompany.HelperCode.DATA_FROM_SP.GET_MT_CM_Company_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GET_MT_UM_USER_BYPARAMETER(SQLParamters PostedData)
        {
            switch (PostedData.OperationType)
            {
                case nameof(DB_OperationType.INSERT_DATA_INTO_DB):
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.UM_USER_BY_COMPANYID_FORNEWINSERT);
                    break;
                default:
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.UM_USER_BY_COMPANYID_FORUPDATERECORD);
                    break;
            }
            var DATA = AUser.HelperCode.DATA_FROM_SP.GET_MT_UM_User_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATABASE OPERATION BY USER (INSERT/UPDATE/DELETE OF USER RIGHT's) ** ---------------------- */

        #region ACTION RESULT FOR :: INSERT/UPDATE/DELETE INTO DBO.URM_UserRight
        [HttpPost]
        public ActionResult UpSert_Into_URM_UserRight(SQLParamters PostedData)
        {
            _Exe = AUser.HelperCode.CUD_Operation.Update_Insert_URM_UserRight(PostedData);
            var data = new { Message = HttpServerStatus.HTTP_DB_TransactionMessagByStatusCode(_Exe), StatusCode = _Exe };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: EDIT (LOAD DOCUMENT OF UM_USER) ** ------------------------ */

        #region ACTION RESULT FOR :: SEARCH DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public JsonResult GET_MT_URM_USERRIGHT_BYPARAMETER_SEARCH(SQLParamters PostedData)
        {
            PostedData.DB_IF_PARAM = nameof(MDBDocFilter.URM_USERRIGHT_BY_SEARCH_PARAMETER_UPDATEUSERRIGHT);
            var DATA = AUser.HelperCode.DATA_FROM_SP.GET_MT_URM_UserRight_By_Param_List(PostedData).ToList();
            return Json(new { data = DATA }, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region ACTION RESULT FOR :: GET DOCUMENT DETAIL (DBO.UM_USERRIGHT) -- LINQ-QUERY
        public JsonResult GET_MT_URM_USERRIGHT_INFOBYGUID(SQLParamters PostedData)
        {
            var DATA = AUser.HelperCode.Document_Detail_By_GUID_LINQ.GET_MT_URM_USERRIGHT_INFO_BY_GUID(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }

        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATA TABLE (LOAD TABLE OF USER BY INPUT TYPE & TEXT) ** ---------------------------- */

        #region ACTION RESULT FOR :: GET LIST BY SEARCH PARAMETER FOR DATA-TABLE (DBO.UM_USER & URM_USERRIGHT)-- STORED PROCEDURE
        public JsonResult GET_MT_UM_USER_LIST_BY_SEARCHQUERY_FORDATATABLE(SQLParamters PostedData)
        {
            var DATA = AUser.HelperCode.DATA_FROM_SP.GET_MT_UM_User_List_By_SearchQuery(PostedData).ToList();
            return Json(new { success = true, data = DATA }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GET_MT_URM_USERRIGHT_LIST_BY_USERID_SEARCHQUERY_FORDATATABLE(SQLParamters PostedData)
        {
            var DATA = AUser.HelperCode.DATA_FROM_SP.GET_MT_URM_UserRight_List_By_SearchQuery(PostedData).ToList();
            return Json( DATA, JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}