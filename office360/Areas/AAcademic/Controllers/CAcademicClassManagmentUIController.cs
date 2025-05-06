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
    public class CAcademicClassManagmentUIController : Controller
    {
        SESEntities db = new SESEntities();
        int? StatusCode = 0;
        int? _Exe = 0;

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** ------------------------------------------------------------------- */

        #region ACTION RESULT FOR :: RENDER VIEW
        public ActionResult CreateUpdate_ACMUI_Class(_SqlParameters PostedData)
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
        public ActionResult GET_LK1_STUDYLEVEL(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_StudyLevel(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_STUDYGROUP(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_StudyGroup(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_CHALLANMETHOD(_SqlParameters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_ChallanMethod(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

    }
}