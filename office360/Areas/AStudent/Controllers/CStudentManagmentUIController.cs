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

namespace office360.Areas.AStudent.Controllers
{
    public class CStudentManagmentUIController : Controller
    {
        FASEntities db = new FASEntities();
        int? StatusCode = 0;
        int? _Exe = 0;

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** ------------------------------------------------------------------- */
        #region ACTION RESULT FOR :: RENDER VIEW
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult CreateUpdate_SMUI_Student(SQLParamters PostedData)
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
        public ActionResult GET_MT_BM_BRANCH_BYPARAMTER(SQLParamters PostedData)
        {
            var DATA = ABranch.HelperCode.DATA_FROM_SP.GET_MT_BM_Branch_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_AASM_ADMISSIONSESSION_BYPARAMTER(SQLParamters PostedData)
        {
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_AASM_AdmissionSession_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_ACM_CLASS_BYPARAMTER(SQLParamters PostedData)
        {
            var DATA = AAcademic.HelperCode.DATA_FROM_SP.GET_MT_ACM_Class_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_ACFSM_CLASSFEESTRUCTURE_BYPARAMETER_(SQLParamters PostedData)
        {
            var DATA = AAccount.HelperCode.DATA_FROM_SP.GET_MT_ACFSM_ClassFeeStructure_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF DOCUMENT INFORMATION FROM DB_MAIN USING STOREDPROCEDURE ** ------------------------------------------ */
        #region ACTION RESULT FOR :: GET DOCUMENT SETTING -- LINQ-QUERY --> FEE_TYPE
        public ActionResult GET_MT_ACFSM_CLASSFEESTRUCTURE_INFOBYGUID(SQLParamters PostedData)
        {
            var DATA = AAccount.HelperCode.Document_Detail_By_GUID_LINQ.GET_MT_ACFSM_CLASSFEESTRUCTURE_INFO_BY_GUID(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_CHALLANMETHOD_INFOBYID(SQLParamters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_CHALLANMETHOD_INFO_BY_ID(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: RENDER DATA FOR DROP DOWN LIST FROM DB_LOOKUP USING LINQUERY ** --------------------------- */
        #region ACTION RESULT FOR :: RENDER DATA FOR DROP DOWN FROM DB_LOOKUP -- LINQ-QUERY
        public ActionResult GET_LK1_ADMISSIONCATEGORY(SQLParamters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_AdmissionCategory_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_COUNTRY(SQLParamters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_Country_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_RELIGION(SQLParamters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_Religion_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_OCCUPATION(SQLParamters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_Occupation_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATABASE OPERATION BY USER (INSERT/UPDATE/DELETE OF Student) ** ---------------------------- */
        #region ACTION RESULT FOR :: INSERT/UPDATE/DELETE INTO DBO.SM_Student
        [HttpPost]
        public ActionResult UpSert_Into_SM_Student(List<TVParam.AASM_AdmissionSessionClass_TVP> PostedDataDetail)
        {
            _Exe = AAcademic.HelperCode.BULK_CUD_Operation.Update_Insert_AASM_AdmissionSession(PostedData, PostedDataDetail);
            var data = new { Message = HttpServerStatus.HTTP_DB_TransactionMessagByStatusCode(_Exe), StatusCode = _Exe };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion


    }
}