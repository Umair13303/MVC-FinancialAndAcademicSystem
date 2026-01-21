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


namespace office360.Areas.AAcademic.Controllers
{
    public class CAcademicQuestionManagmentUIController : Controller
    {
        FASEntities db = new FASEntities();
        int? StatusCode = 0;
        int? _Exe = 0;
        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** --------------------------------------------------------------------- */
        #region ACTION RESULT FOR :: RENDER VIEW
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult CreateUpdate_AQMUI_Question(SQLParamters PostedData)
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
        public ActionResult View_List_AQMUI_Question(SQLParamters PostedData)
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

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF DROP DOWN LIST FROM DB_MAIN USING STOREDPROCEDURE ** ------------------------------------------------ */
        #region ACTION RESULT FOR :: RENDER DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public JsonResult GET_MT_BM_BRANCH_BYPARAMTER(SQLParamters PostedData)
        {
            switch (PostedData.OperationType)
            {
                case nameof(DB_OperationType.INSERT_DATA_INTO_DB):
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.BM_BRANCH_BY_ALLOWEDBRANCHIDS_FORNEWINSERT);
                    break;
                default:
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.BM_BRANCH_BY_ALLOWEDBRANCHIDS_FORUPDATERECORD);
                    break;
            }
            var DATA = ABranch.HelperCode.DATA_FROM_SP.GET_MT_BM_Branch_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GET_MT_ACM_CLASS_BYPARAMTER(SQLParamters PostedData)
        {
            switch (PostedData.OperationType)
            {
                case nameof(DB_OperationType.INSERT_DATA_INTO_DB):
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.ACM_CLASS_BY_CAMPUSID_FORNEWINSERT);
                    break;
                default:
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.ACM_CLASS_BY_CAMPUSID_FORUPDATERECORD);
                    break;
            }
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ACM_Class_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GET_MT_ASM_SUBJECT_BYPARAMTER(SQLParamters PostedData)
        {
            switch (PostedData.OperationType)
            {
                case nameof(DB_OperationType.INSERT_DATA_INTO_DB):
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.ASM_SUBJECT_BY_CLASSID_FORNEWINSERT);
                    break;
                default:
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.ASM_SUBJECT_BY_CLASSID_FORUPDATERECORD);
                    break;
            }
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ASM_SUBJECT_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ACTION RESULT FOR :: RENDER DATA FOR DROP DOWN FROM DB_LOOKUP -- LINQ-QUERY
        public JsonResult GET_LK1_QUESTIONTYPE(SQLParamters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_QuestionType_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATABASE OPERATION BY USER (INSERT/UPDATE/DELETE OF QUESTION) ** ----------------------- */

        #region ACTION RESULT FOR :: INSERT/UPDATE/DELETE INTO DBO.AQM_Question
        [HttpPost]
        public ActionResult UpSert_Into_AQM_Question(SQLParamters PostedData)
        {
            _Exe = AAcademic.HelperCode.CUD_Operation.Update_Insert_AQM_Question(PostedData);
            var data = new { Message = HttpServerStatus.HTTP_DB_TransactionMessagByStatusCode(_Exe), StatusCode = _Exe };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: EDIT (LOAD DOCUMENT OF QUESTION & GET DETAIL BY QUESTION_GUID) ** ----------------------- */

        #region ACTION RESULT FOR :: SEARCH DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public JsonResult GET_MT_AQM_QUESTION_BYPARAMETER_SEARCH(SQLParamters PostedData)
        {
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ASM_SUBJECT_BYPARAM(PostedData).ToList();
            return Json(new { data = DATA }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ACTION RESULT FOR :: GET DOCUMENT DETAIL (DBO.AQM_QUESTION) -- LINQ-QUERY
        public JsonResult GET_MT_AQM_QUESTION_INFOBYGUID(SQLParamters PostedData)
        {
            var DATA = AAcademic.HelperCode.Document_Detail_By_GUID_LINQ.GET_MT_ASM_SUBJECT_INFO_BY_GUID(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }

        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATA TABLE (LOAD TABLE OF QUESTION BY INPUT TYPE & TEXT) ** ---------------------------- */

        #region ACTION RESULT FOR :: GET LIST BY SEARCH PARAMETER FOR DATA-TABLE (DBO.AQM_QUESTION)-- STORED PROCEDURE
        public JsonResult GET_MT_AQM_QUESTION_LIST_BY_SEARCHQUERY_FORDATATABLE(SQLParamters PostedData)
        {
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ASM_SUBJECT_LIST_BY_SEARCHQUERY(PostedData).ToList();
            return Json(new { success = true, data = DATA }, JsonRequestBehavior.AllowGet);
        }

        #endregion


    }
}