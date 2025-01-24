using office360.Extensions;
using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;
using static office360.Models.General.DBListCondition;
using static office360.Models.General.Http_Server_Status;
namespace office360.GlobalHelper.LookUp
{
    public class LookUp_GetDataFromDB_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ-QUERY ::-- DB_LOOKUP
        public static List<_SqlParameters> GET_LK1_EnrollmentType(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.EnrollmentType
                     .Where(x => x.Status == true)
                     .Select(x => new _SqlParameters
                     {
                         Id = x.Id,
                         Description = x.Description,
                     }).ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_Gender(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Gender
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_MartialStatus(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.MartialStatus
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_Religion(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Religion
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_Country(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Country
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = "( " + x.CallingCode + " )" + x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_Relationship(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Relationship
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_Occupation(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Occupation
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_PolicyPeriod(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.PolicyPeriod
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                             MonthsNo = x.MonthNo,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_CampusType(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.CampusType.Where(x => x.Status == true)
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_OrganizationType(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.OrganizationType
                        .Where(x => x.Status == true)
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_City(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.City
                         .Where(x => x.CountryId == PostedData.CountryId && x.Status == true)
                         .Select(x => new _SqlParameters { Id = x.Id, Description = x.Description, }).ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_RollCallSystem(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.RollCallSystem
                         .Select(x => new _SqlParameters { Id = x.Id, Description = x.Description, }).ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_BillingMethod(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.BillingMethod
                         .Select(x => new _SqlParameters { Id = x.Id, Description = x.Description, }).ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_RegistrationType(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.RegistrationType
                      .Select(x => new _SqlParameters { Id = x.Id, Description = x.Description })
                      .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_FeeCatagory(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.FeeCatagory
                      .Where(X => X.Status == true)
                      .Select(x => new _SqlParameters { Id = x.Id, Description = x.Description })
                      .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_ChargingMethod(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.ChargingMethod
                      .Select(x => new _SqlParameters { Id = x.Id, Description = x.Description })
                      .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_AdmissionCatagory(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.AdmissionCatagory
                      .Select(x => new _SqlParameters { Id = x.Id, Description = x.Description })
                      .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_ChallanType(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.ChallanType
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                             DB_IF_PARAM = x.DB_IF_Condition,

                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_Role(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Role
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_Right(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Right
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.DisplayName + " [" + x.Menu +" / "+x.SubMenu +" ]",
                             Menu =  x.Menu,
                             SubMenu =  x.SubMenu,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<_SqlParameters> GET_LK1_URLType(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.URLType
                         .Select(x => new _SqlParameters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        #endregion

    }
}