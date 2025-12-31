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

namespace office360.Areas.AAccount.Controllers
{
    public class CAccountDiscountTypeManagmentUIController : Controller
    {
        FASEntities db = new FASEntities();
        int? StatusCode = 0;
        int? _Exe = 0;

        /*---------------------- ** ACTION RESULTS FOR :: RENDER OF VIEW ** --------------------------------------------------------------------------------------------- */
        #region ACTION RESULT FOR :: RENDER VIEW
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult CreateUpdate_ADTMUI_DiscountType(SQLParamters PostedData)
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
        public ActionResult View_List_ADTMUI_DiscountType(SQLParamters PostedData)
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
        public ActionResult GET_MT_ACOAM_COSTOFSALEACCOUNT_BYPARAMTER(SQLParamters PostedData)
        {
            switch (PostedData.OperationType)
            {
                case nameof(DB_OperationType.INSERT_DATA_INTO_DB):
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.ACOAM_CHARTOFACCOUNT_BY_COMPANYID_ACCOUNTTYPEID_FORNEWINSERT);
                    break;
                default:
                    PostedData.DB_IF_PARAM = nameof(MDBDataFilter.ACOAM_CHARTOFACCOUNT_BY_COMPANYID_ACCOUNTTYPEID_FORUPDATERECORD);
                    break;
            }
            PostedData.AccountTypeId = (int?)CHART_OF_ACCOUNT_TYPE.COST_OF_SALES;
            var DATA = AAccount.HelperCode.DATA_FROM_SP.GET_MT_ACOAM_ChartOfAccount_By_Param_List(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATABASE OPERATION BY USER (INSERT/UPDATE/DELETE OF ADTM_DISCOUNTTYPE) ** ------------------------------------- */
        #region ACTION RESULT FOR :: INSERT/UPDATE/DELETE INTO DBO.ADTM_DISCOUNTTYPE
        public ActionResult UpSert_Into_ADTM_DiscountType(SQLParamters PostedData)
        {
            _Exe = AAccount.HelperCode.CUD_Operation.Update_Insert_ADTM_DiscountType(PostedData);
            var data = new { Message = HttpServerStatus.HTTP_DB_TransactionMessagByStatusCode(_Exe), StatusCode = _Exe };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: EDIT (LOAD DOCUMENT OF DISCOUNTTYPE & GET DETAIL BY DISCOUNTTYPE_GUID) ** ------------------------------------- */
        #region ACTION RESULT FOR :: SEARCH DROP DOWN FROM DB_MAIN -- STORED PROCEDURE
        public ActionResult GET_MT_ADTM_DISCOUNTTYPE_BYPARAMETER_SEARCH(SQLParamters PostedData)
        {
            PostedData.DB_IF_PARAM = nameof(MDBDocFilter.ADTM_DISCOUNTTYPE_BY_COMPANYID_SEARCH_PARAMETER_UPDATEDISCOUNTTYPE);
            var DATA = AAccount.HelperCode.DATA_FROM_SP.GET_MT_ADTM_DiscountType_By_Param_List(PostedData).ToList();
            return Json(new { data = DATA }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ACTION RESULT FOR :: GET DOCUMENT DETAIL (DBO.ADTM_DISCOUNTTYPE) -- LINQ-QUERY
        public ActionResult GET_MT_ADTM_DISCOUNTTYPE_INFOBYGUID(SQLParamters PostedData)
        {
            var DATA = AAccount.HelperCode.Document_Detail_By_GUID_LINQ.GET_MT_ADTM_DISCOUNTTYPE_INFO_BY_GUID(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #endregion

        /*---------------------- ** ACTION RESULTS FOR :: DATA TABLE (LOAD TABLE OF DISCOUNTTYPE BY INPUT TYPE & TEXT) ** ----------------------------------------------- */
        #region ACTION RESULT FOR :: GET LIST BY SEARCH PARAMETER FOR DATA-TABLE (DBO.ADTM_DISCOUNTTYPE)-- STORED PROCEDURE
        public ActionResult GET_MT_ACOAM_CHARTOFACCOUNT_LIST_BY_SEARCHQUERY_FORDATATABLE(SQLParamters PostedData)
        {
            var DATA = AAccount.HelperCode.DATA_FROM_SP.GET_MT_ADTM_DiscountType_List_By_SearchQuery(PostedData).ToList();
            return Json(new { success = true, data = DATA }, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}