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
    public class CAcademicClassCurriculumManagmentUIController : Controller
    {
        FASEntities db = new FASEntities();
        int? StatusCode = 0;
        int? _Exe = 0;
        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** ------------------------------------------------------------------- */

        #region ACTION RESULT FOR :: RENDER VIEW
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult CreateUpdate_ACCMUI_ClassCurriculum(SQLParamters PostedData)
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
        public ActionResult View_List_ACCMUI_ClassCurriculum(SQLParamters PostedData)
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

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF DROP DOWN LIST FROM DB_MAIN USING STOREDPROCEDURE ** ---------------------- */

        #region ACTION RESULT FOR :: RENDER DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public ActionResult GET_MT_BM_BRANCH_BYPARAMTER(SQLParamters PostedData)
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
        public ActionResult GET_MT_ACM_CLASS_BYPARAMTER(SQLParamters PostedData)
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
        public ActionResult GET_MT_ASM_SUBJECT_BYPARAMTER(SQLParamters PostedData)
        {
            switch (PostedData.OperationType)
            {
                case nameof(DB_OperationType.INSERT_DATA_INTO_DB):
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.ASM_SUBJECT_BY_COMPANYID_FORNEWINSERT);
                    break;
                default:
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.ASM_SUBJECT_BY_COMPANYID_FORUPDATERECORD);
                    break;
            }
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ASM_SUBJECT_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: RENDER DATA FOR DROP DOWN LIST FROM DB_LOOKUP USING LINQUERY ** --------------------- */

        #region ACTION RESULT FOR :: RENDER DATA FOR DROP DOWN FROM DB_LOOKUP -- LINQ-QUERY
        public ActionResult GET_LK1_SEMESTER(SQLParamters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_Semester_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATABASE OPERATION BY USER (INSERT/UPDATE/DELETE OF CLASSCURRICULUM) ** ----------------------- */

        #region ACTION RESULT FOR :: INSERT/UPDATE/DELETE INTO DBO.ACCM_ClassCurriculum
        [HttpPost]
        public ActionResult UpSert_Into_ACCM_ClassCurriculum(SQLParamters PostedData, List<TVParam.ACCM_ClassCurriculumSubject_TVP> PostedDataDetail)
        {
            _Exe = AAcademic.HelperCode.BULK_CUD_Operation.Update_Insert_ACCM_ClassCurriculum(PostedData, PostedDataDetail);
            var data = new { Message = HttpServerStatus.HTTP_DB_TransactionMessagByStatusCode(_Exe), StatusCode = _Exe };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: EDIT (LOAD DOCUMENT OF CLASSCURRICULUM & GET DETAIL BY CLASSCURRICULUM_GUID) ** --------------------- */

        #region ACTION RESULT FOR :: SEARCH DROP DOWN FROM DB_MAIN -- STORED PROCEDURE

        public ActionResult GET_MT_ACCM_CLASSCURRICULUM_BYPARAMETER_SEARCH(SQLParamters PostedData)
        {
            PostedData.DB_IF_PARAM = nameof(MDBDocFilter.ACCM_CLASSCURRICULUM_BY_ALLOWEDBRANCHIDS_SEARCH_PARAMETER_UPDATECLASSCURRICULUM);
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ACCM_ClassCurriculum_By_Param_List(PostedData).ToList();
            return Json(new { data = DATA }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ACTION RESULT FOR :: GET DOCUMENT DETAIL (DBO.ACM_CLASSCURRICULUM) -- LINQ-QUERY
        public ActionResult GET_ACCM_CLASSCURRICULUM_INFOBYGUID(SQLParamters PostedData)
        {
            var DATA = AAcademic.HelperCode.Document_Detail_By_GUID_LINQ.GET_MT_ACCM_CLASSCURRICULUM_INFO_BY_GUID(PostedData).ToList();
            var DATA_DETAIL = AAcademic.HelperCode.Document_Detail_By_GUID_LINQ.GET_MT_ACCM_CLASSCURRICULUMSUBJECT_INFO_BY_GUID(PostedData).ToList();
            return Json(new { DATA, DATA_DETAIL }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATA TABLE (LOAD TABLE OF CLASSCURRICULUM BY INPUT TYPE & TEXT) ** ---------------------------- */

        #region ACTION RESULT FOR :: GET LIST BY SEARCH PARAMETER FOR DATA-TABLE (DBO.ACCM_ClassCurriculum)-- STORED PROCEDURE
        public ActionResult GET_MT_ACCM_CLASSCURRICULUM_LIST_BY_SEARCHQUERY_FORDATATABLE(SQLParamters PostedData)
        {
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ACCM_ClassCurriculum_List_By_SearchQuery(PostedData).ToList();
            return Json(new { success = true, data = DATA }, JsonRequestBehavior.AllowGet);
        }
        #endregion

    }
}