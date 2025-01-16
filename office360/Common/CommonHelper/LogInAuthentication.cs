using office360.Extensions;
using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Microsoft.Reporting.WebForms;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Web.Mvc;
using static office360.Models.General.Http_Server_Status;
using static office360.Models.General.RightsGUID;

namespace office360.CommonHelper
{

    public class LogInAuthentication
    {
        SESEntities db = new SESEntities();
        public static bool CheckUserAuthorization(UM_User Users, out int? RoleId, out int? StatusCode)
        {
            try
            {
                            #region CHECK IF USER EXIST
                var UserName = Users.UserName.ToString(); 
                var Password = Users.Password.ToString();
                var Condition = DBListCondition.DB_IF_Condition.GET_USER_CONFIRMATION.ToSafeString();
                if (!string.IsNullOrEmpty(UserName) && !string.IsNullOrEmpty(Password))
                {
                    using (var db = new SESEntities())
                    {
                        var data = db.UM_User_GetDetailByParam(Condition, null, true, UserName, Password, null).ToList();
                        if (data != null && data.Count > 0)
                        {
                            #endregion
                            #region GETTING USER INFORMATION INTO SESSION
                            var List = data.FirstOrDefault();
                            RoleId =  List.RoleId;
                            StatusCode = (int?)Http_DB_Response.CODE_SUCCESS;
                            HttpContext.Current.Session["Name"] = List.Name;
                            HttpContext.Current.Session["UserName"] = List.UserName;
                            HttpContext.Current.Session["Password"] = List.Password;
                            HttpContext.Current.Session["EmailAddress"] = List.EmailAddress;
                            HttpContext.Current.Session["MobileNumber"] = List.MobileNumber;
                            HttpContext.Current.Session["RoleId"] = List.RoleId;
                            HttpContext.Current.Session["IsLogIn"] = List.IsLogIn;
                            HttpContext.Current.Session["AllowedCampusIds"] = List.AllowedCampusIds;
                            HttpContext.Current.Session["CreatedOn"] = List.CreatedOn;
                            HttpContext.Current.Session["CreatedBy"] = List.CreatedBy;
                            HttpContext.Current.Session["UpdatedOn"] = List.UpdatedOn;
                            HttpContext.Current.Session["UpdatedBy"] = List.UpdatedBy;
                            HttpContext.Current.Session["EmployeeId"] = List.EmployeeId;
                            HttpContext.Current.Session["IsDeveloper"] = List.IsDeveloper;
                            HttpContext.Current.Session["CompanyId"] = List.CompanyId;
                            HttpContext.Current.Session["UserId"] = List.Id;
                            HttpContext.Current.Session["BranchId"] = List.BranchId;
                            #endregion
                            #region GET COMPANY INFORMATION BY LOG_IN USER
                            var Coy = db.CM_Company_GetDetailByParam(null, List.CompanyId, null).ToList();
                            var Lst = Coy.FirstOrDefault();

                            HttpContext.Current.Session["CoyId"] = Lst.Id;
                            HttpContext.Current.Session["CompanyName"] = Lst.CompanyName;
                            HttpContext.Current.Session["CityId"] = Lst.CityId;
                            HttpContext.Current.Session["CountryId"] = Lst.CountryId;
                            HttpContext.Current.Session["AddressLine"] = Lst.AddressLine;
                            HttpContext.Current.Session["PhoneNumber"] = Lst.PhoneNumber;
                            HttpContext.Current.Session["CoyEmailAddress"] = Lst.EmailAddress;
                            HttpContext.Current.Session["CompanyWebsite"] = Lst.CompanyWebsite;
                            HttpContext.Current.Session["UploadLogo"] = Lst.UploadLogo;
                            HttpContext.Current.Session["Status"] = Lst.Status;
                            HttpContext.Current.Session["CityName"] = Lst.CityName;
                            HttpContext.Current.Session["CountryName"] = Lst.CountryName;
                            HttpContext.Current.Session["CallingCode"] = "+92".ToSafeString();

                            //if (RoleId != 1)
                            //{
                            //    var AGB = from GBR in db.BM_Branch
                            //              where GBR.Id == List.BranchId && GBR.CompanyId == Lst.Id
                            //              select new { BranchName = GBR.Description, BranchAdress = GBR.Address, BranchCityId = GBR.CityId };
                            //    HttpContext.Current.Session["BranchName"] = AGB.FirstOrDefault().BranchName;
                            //    HttpContext.Current.Session["BranchAddress"] = AGB.FirstOrDefault().BranchAdress;
                            //    var C = from CI in db.City
                            //            where CI.Id == AGB.FirstOrDefault().BranchCityId
                            //            select new { BranchCity = CI.Description };
                            //    HttpContext.Current.Session["BranchCity"] = C.FirstOrDefault().BranchCity;

                            //    #region GET BRANCH SETTING DETAILS
                            //    var GBS = from ACR in db.BM_BranchSetting
                            //              where
                            //              ACR.CompanyId == List.CompanyId && ACR.CampusId == List.BranchId && ACR.Status == true
                                         

                            //              select new
                            //              {
                            //                  ACR.RollCallSystemId,
                            //                  ACR.BillingMethodId,
                            //                  ACR.PolicyPeriodId,
                            //                  ACR.StudyGroupIds,
                            //                  ACR.StudyLevelIds,
                            //                  ACR.ChallanMethodId,
                                           
                            //              };


                            //    HttpContext.Current.Session["RollCallSystemId"] = GBS.FirstOrDefault().RollCallSystemId;
                            //    HttpContext.Current.Session["BillingMethodId"] = GBS.FirstOrDefault().BillingMethodId;
                            //    HttpContext.Current.Session["PolicyPeriodId"] = GBS.FirstOrDefault().PolicyPeriodId;
                            //    HttpContext.Current.Session["StudyGroupIds"] = GBS.FirstOrDefault().StudyGroupIds;
                            //    HttpContext.Current.Session["StudyLevelIds"] = GBS.FirstOrDefault().StudyLevelIds;
                            //    HttpContext.Current.Session["ChallanMethodId"] = GBS.FirstOrDefault().ChallanMethodId;

                            //    #endregion

                            //}
                            #endregion

                            #region GET ALLOWED RIGHTS FOR USER ID
                            var _RAW_AllowedRightsList = GetAllListFromDB.GetRightsByParameter().ToList();
                            var AllowedRightsList = _RAW_AllowedRightsList.GroupBy(item => item.Menu)
                                .Select(g => new MenuViewModel
                                {
                                    Menu = g.Key,
                                    SubMenu = g.GroupBy(x => x.SubMenu)
                                    .Select(mg => new ModuleViewModel
                                    {
                                        Id = mg.Select(x => x.Id).Distinct().ToList(),
                                        SubMenu = mg.Key.ToString(),
                                        DisplayName = mg.Select(x => x.DisplayName).ToList(),
                                        Description = mg.Select(x => x.Description).ToList(),
                                        DB_OperationType = mg.Select(x => x.DB_OperationType).ToList(),
                                    }).ToList()
                                }).ToList();


                            HttpContext.Current.Session["Menu"] = AllowedRightsList;
                            #endregion

                            return true;
                     }
                    }
                }
            }
            catch (Exception ex)
            {
                StatusCode = (int?)Http_DB_Response.CODE_INTERNAL_SERVER_ERROR;
            }
            StatusCode = (int?)Http_DB_Response.CODE_DATA_DOES_NOT_EXIST;
            RoleId = null; 
            return false;
        }
    }



}



