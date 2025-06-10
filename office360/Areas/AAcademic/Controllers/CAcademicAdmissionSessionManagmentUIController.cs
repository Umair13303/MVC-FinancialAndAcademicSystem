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


namespace office360.Areas.AAcademic.Controllers
{
    public class CAcademicAdmissionSessionManagmentUIController : Controller
    {
        SESEntities db = new SESEntities();
        int? StatusCode = 0;
        int? _Exe = 0;

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** ------------------------------------------------------------------- */
        #region ACTION RESULT FOR :: RENDER VIEW
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult CreateUpdate_AASMUI_AdmissionSession(_SqlParameters PostedData)
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


        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF DROP DOWN LIST FROM DB_MAIN USING STOREDPROCEDURE ** ---------------------------- */

        #region ACTION RESULT FOR :: RENDER DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public ActionResult GET_MT_BM_BRANCH_BYPARAMTER(_SqlParameters PostedData)
        {
            var DATA = ABranch.HelperCode.DATA_FROM_SP.GET_MT_BM_BRANCH_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_ACM_CLASS_BYPARAMTER(_SqlParameters PostedData)
        {
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ACM_CLASS_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: RENDER DATA FOR DROP DOWN LIST FROM DB_LOOKUP USING LINQUERY ** --------------------------- */

        #region ACTION RESULT FOR :: RENDER DATA FOR DROP DOWN FROM DB_LOOKUP -- LINQ-QUERY
        public ActionResult GET_LK1_ACADEMICYEAR(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_AcademicYear(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATABASE OPERATION BY USER (INSERT/UPDATE/DELETE OF ADMISSION_SESSION) ** ---------------------------- */

        #region ACTION RESULT FOR :: INSERT/UPDATE/DELETE INTO DBO.AASM_AdmissionSession
        [HttpPost]
        public ActionResult UpSert_Into_AASM_AdmissionSession(_SqlParameters PostedData)
        {
            _Exe = AAcademic.HelperCode.CUD_Operation.Update_Insert_AASM_AdmissionSession(PostedData);
            var data = new { Message = Http_Server_Status.HTTP_DB_TransactionMessagByStatusCode(_Exe), StatusCode = _Exe };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: EDIT (LOAD DOCUMENT OF ADMISSIONSESSION & GET DETAIL BY ADMISSIONSESSION_GUID) ** ------------------------ */

        #region ACTION RESULT FOR :: SEARCH DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public ActionResult GET_MT_AASM_ADMISSIONSESSION_BYPARAMETER_SEARCH(_SqlParameters PostedData)
        {
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_AASM_ADMISSIONSESSION_BYPARAM(PostedData).ToList();
            return Json(new { data = DATA }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ACTION RESULT FOR :: GET DOCUMENT DETAIL (DBO.AASM_ADMISSIONSESSION) -- LINQ-QUERY
        public ActionResult GET_MT_AASM_ADMISSIONSESSION_INFOBYGUID(_SqlParameters PostedData)
        {
            var DATA = AAcademic.HelperCode.Document_Detail_By_GUID_LINQ.GET_MT_AASM_ADMISSIONSESSION_INFO_BY_GUID(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATA TABLE (LOAD TABLE OF CLASS BY INPUT TYPE & TEXT) ** ---------------------------- */

        #region ACTION RESULT FOR :: GET LIST BY SEARCH PARAMETER FOR DATA-TABLE (DBO.AASM_ADMISSIONSESSION)-- STORED PROCEDURE
        #endregion


    }
}