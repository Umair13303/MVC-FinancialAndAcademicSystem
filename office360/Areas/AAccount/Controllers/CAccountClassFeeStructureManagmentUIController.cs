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

namespace office360.Areas.AAccount.Controllers
{
    public class CAccountClassFeeStructureManagmentUIController : Controller
    {
        FASEntities db = new FASEntities();
        int? StatusCode = 0;
        int? _Exe = 0;
        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** ------------------------------------------------------------------------- */
        #region ACTION RESULT FOR :: RENDER VIEW
        public ActionResult CreateUpdate_ACFSMUI_ClassFeeStructure(SQLParamters PostedData)
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
        public ActionResult View_List_ACFSMUI_ClassFeeStructure(SQLParamters PostedData)
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
        public ActionResult GET_LK1_CHALLANMETHOD(SQLParamters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_ChallanMethod_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_WHTAXPOLICY(SQLParamters PostedData)
        {
            var DATA = LookUp_GetDataFromDB_LINQ.GET_LK1_WHTaxPolicy_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
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
        public ActionResult GET_MT_AFTM_FEETYPE_BYPARAMTER(SQLParamters PostedData)
        {
            PostedData.FeeCategoryIds = ((int)FEE_CATEGORY.ACADEMIC_FEE).ToString();
            var DATA = AAccount.HelperCode.DATA_FROM_SP.GET_MT_AFTM_FeeType_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_ACOAM_REVENUEACCOUNT_BYPARAMTER(SQLParamters PostedData)
        {
            PostedData.AccountTypeId = (int?)CHART_OF_ACCOUNT_TYPE.REVENUE_SALE;
            var DATA = AAccount.HelperCode.DATA_FROM_SP.GET_MT_ACOAM_ChartOfAccount_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_ACOAM_ASSETACCOUNT_BYPARAMTER(SQLParamters PostedData)
        {
            PostedData.AccountTypeId = (int?)CHART_OF_ACCOUNT_TYPE.ASSETS;
            var DATA = AAccount.HelperCode.DATA_FROM_SP.GET_MT_ACOAM_ChartOfAccount_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_ACOAM_LIABILITYACCOUNT_BYPARAMTER(SQLParamters PostedData)
        {
            PostedData.AccountTypeId = (int?)CHART_OF_ACCOUNT_TYPE.LIABILITIES;
            var DATA = AAccount.HelperCode.DATA_FROM_SP.GET_MT_ACOAM_ChartOfAccount_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_ACOAM_COSTOFSALEACCOUNT_BYPARAMTER(SQLParamters PostedData)
        {
            PostedData.AccountTypeId = (int?)CHART_OF_ACCOUNT_TYPE.COST_OF_SALES;
            var DATA = AAccount.HelperCode.DATA_FROM_SP.GET_MT_ACOAM_ChartOfAccount_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF DOCUMENT INFORMATION FROM DB_MAIN USING STOREDPROCEDURE ** ---------------------------- */
        #region ACTION RESULT FOR :: GET DOCUMENT SETTING -- LINQ-QUERY --> FEE_TYPE
        public ActionResult GET_MT_AFTM_FEETYPE_INFOBYGUID(SQLParamters PostedData)
        {
            var DATA = AAccount.HelperCode.Document_Detail_By_GUID_LINQ.GET_MT_AFTM_FEETYPE_INFO_BY_GUID(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATABASE OPERATION BY USER (INSERT/UPDATE/DELETE OF CLASSFEESTRUCTURE) ** ----------------------- */
        #region ACTION RESULT FOR :: INSERT/UPDATE/DELETE INTO DBO.ACFSM_ClassFeeStructure
        [HttpPost]
        public ActionResult UpSert_Into_ACFSM_ClassFeeStructure(SQLParamters PostedData, List<TVParam.ACFSM_ClassFeeStructureFeeType_TVP> PostedDataDetail)
        {
            _Exe = AAccount.HelperCode.BULK_CUD_Operation.Update_Insert_ACFSM_ClassFeeStructure(PostedData, PostedDataDetail);
            var data = new { Message = HttpServerStatus.HTTP_DB_TransactionMessagByStatusCode(_Exe), StatusCode = _Exe };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}