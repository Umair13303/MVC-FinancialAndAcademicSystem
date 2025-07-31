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
using static office360.Models.General.HttpServerStatus;


namespace office360.Areas.AAcademic.Controllers
{
    public class CAcademicSubjectManagmentUIController : Controller
    {
        SESEntities db = new SESEntities();
        int? StatusCode = 0;
        int? _Exe = 0;
        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** --------------------------------------------------------------------- */
        #region ACTION RESULT FOR :: RENDER VIEW
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult CreateUpdate_ASMUI_Subject(SQLParamters PostedData)
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
        public ActionResult View_List_ASMUI_Subject(SQLParamters PostedData)
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

        /*---------------------- ** ACTION RESULTS FOR :: DATABASE OPERATION BY USER (INSERT/UPDATE/DELETE OF SUBJECT) ** ----------------------- */

        #region ACTION RESULT FOR :: INSERT/UPDATE/DELETE INTO DBO.ASM_Subject
        [HttpPost]
        public ActionResult UpSert_Into_ASM_Subject(SQLParamters PostedData)
        {
            _Exe = AAcademic.HelperCode.CUD_Operation.Update_Insert_ASM_Subject(PostedData);
            var data = new { Message = HttpServerStatus.HTTP_DB_TransactionMessagByStatusCode(_Exe), StatusCode = _Exe };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: EDIT (LOAD DOCUMENT OF SUBJECT & GET DETAIL BY SUBJECT_GUID) ** ----------------------- */

        #region ACTION RESULT FOR :: SEARCH DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public ActionResult GET_MT_ASM_SUBJECT_BYPARAMETER_SEARCH(SQLParamters PostedData)
        {
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ASM_SUBJECT_BYPARAM(PostedData).ToList();
            return Json(new { data = DATA }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ACTION RESULT FOR :: GET DOCUMENT DETAIL (DBO.ASM_SUBJECT) -- LINQ-QUERY
        public ActionResult GET_MT_ASM_SUBJECT_INFOBYGUID(SQLParamters PostedData)
        {
            var DATA = AAcademic.HelperCode.Document_Detail_By_GUID_LINQ.GET_MT_ASM_SUBJECT_INFO_BY_GUID(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }

        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATA TABLE (LOAD TABLE OF SUBJECT BY INPUT TYPE & TEXT) ** ---------------------------- */

        #region ACTION RESULT FOR :: GET LIST BY SEARCH PARAMETER FOR DATA-TABLE (DBO.ASM_SUBJECT)-- STORED PROCEDURE
        public ActionResult GET_MT_ASM_SUBJECT_LIST_BY_SEARCHQUERY_FORDATATABLE(SQLParamters PostedData)
        {
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ASM_SUBJECT_LIST_BY_SEARCHQUERY(PostedData).ToList();
            return Json(new { success = true, data = DATA }, JsonRequestBehavior.AllowGet);
        }

        #endregion


    }
}