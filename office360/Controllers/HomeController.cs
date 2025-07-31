using ClosedXML.Excel;
using Microsoft.Reporting.WebForms;
using Microsoft.ReportingServices;
using office360.Common.CommonHelper;
using office360.CommonHelper;
using office360.Extensions;
using office360.Models.EDMX;
using office360.Models.General;
using office360.Models.ViewComponents;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using static office360.Models.General.HttpServerStatus;
using static office360.Models.General.UserRightMenu;

namespace REP.Controllers
{
    public class HomeController : Controller
    {

        SESEntities db = new SESEntities();

       
        public ActionResult LogInPage()
        {
            return View();
        }
        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction(_ActionsURL.LogIn, _Controller.Home);
        }
        #region DASHBOARD RIGHTS & SIDE MENUE
        [HttpPost]
        public ActionResult GET_USER_CONFIRMATION(UM_User Users)
        {
            int? RoleId = null;
            if (Users != null)
            {
                int? StatusCode = 0;
                var CheckData = LogInAuthentication.CheckUserAuthorization(Users,out  RoleId, out StatusCode);
               
                switch (StatusCode)
                {
                    case (int?)Http_DB_Response.CODE_SUCCESS:
                        return RedirectToAction(_ActionsURL.GET_DASHBOARD_FOR_USER, _Controller.Home);
                    case (int?)Http_DB_Response.CODE_INTERNAL_SERVER_ERROR:
                        return RedirectToAction(_ActionsURL.InternalServerError, _Controller.Home);
                    case (int?)Http_DB_Response.CODE_DATA_DOES_NOT_EXIST:
                        return RedirectToAction(_ActionsURL.LogIn, _Controller.Home);
                    default:
                        return RedirectToAction(_ActionsURL.LogIn, _Controller.Home);
                }
            }
            else
            {
                return RedirectToAction(_ActionsURL.LogIn, _Controller.Home);
            }
        }
        [UsersSessionCheck]
        [CompanySessionCheck]
        public  ActionResult GET_DASHBOARD_FOR_USER()
        {
            string roleKey;
            if (Dictionary.RoleGuids.TryGetValue(Session_Manager.RoleId, out roleKey))
            {
                switch (roleKey)
                {
                    case nameof(USER_ROLE.ROLE_ADMIN):
                        return View(DASHBOARD_BY_ROLEID.GetDashBoard_ADMIN);
                    case nameof(USER_ROLE.ROLE_DEVELOPER):
                        return View(DASHBOARD_BY_ROLEID.GetDashBoard_DEVELOPER);
                    case nameof(USER_ROLE.ROLE_MANAGER):
                        return View(DASHBOARD_BY_ROLEID.GetDashBoard_DEVELOPER);
                    case nameof(USER_ROLE.ROLE_DEO):
                        return View(DASHBOARD_BY_ROLEID.GetDashBoard_DEVELOPER);
                    default:
                        return View(_ActionsURL.LogIn);
                }
            }
            else
            {
            }
            return View();
        }
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult PopulateAllowedRights(SQLParamters Parameter)
        {

            var RightPaths = this.ControllerContext.RouteData.Values["area"]?.ToString() +"/"+ this.ControllerContext.RouteData.Values["controller"].ToString()+"/"+ this.ControllerContext.RouteData.Values["action"].ToString(); ;

            var data = GetAllListFromDB.GetRightsByParameter();

            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region AUTOMATE COLUMS EXCEL SHEET
        public ActionResult DownloadExcel(CM_Company GeneralBranch)
        {
            // Assuming GeneralBranch is a collection of objects
            List<CM_Company> data = YourGetDataMethod(); // Replace YourObjectType with the actual type

            var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("GeneralBranch");

            // Get property names dynamically
            var headers = typeof(CM_Company).GetProperties()
                .Select(property => property.Name)
                .ToArray();

            for (int i = 1; i <= headers.Length; i++)
            {
                worksheet.Cell(1, i).Value = headers[i - 1];
            }

            var row = 2;
            foreach (var item in data)
            {
                for (int i = 1; i <= headers.Length; i++)
                {
                    var propertyValue = typeof(CM_Company)
                        .GetProperty(headers[i - 1])
                        .GetValue(item);

                    worksheet.Cell(row, i).Value = propertyValue?.ToString();
                }
                row++;
            }

            // Save the workbook to a memory stream
            using (MemoryStream memoryStream = new MemoryStream())
            {
                workbook.SaveAs(memoryStream);
                byte[] excelBytes = memoryStream.ToArray();

                // Send Excel as file response
                return File(excelBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "COY_Branches.xlsx");
            }
        }
        private List<CM_Company> YourGetDataMethod()
        {
            List<CM_Company> data;
            data = db.CM_Company.ToList();
            return data;
        }
        #endregion
    }
}


