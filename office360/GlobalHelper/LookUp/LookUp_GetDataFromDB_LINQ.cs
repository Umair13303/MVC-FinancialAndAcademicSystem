using office360.Extensions;
using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using static office360.Models.General.HttpServerStatus;
namespace office360.GlobalHelper.LookUp
{
    public class LookUp_GetDataFromDB_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ-QUERY ::-- DB_LOOKUP
        public static List<SQLParamters> GET_LK1_EnrollmentType(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.EnrollmentType
                     .Where(x => x.Status == true)
                     .Select(x => new SQLParamters
                     {
                         Id = x.Id,
                         Description = x.Description,
                     }).ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_Gender(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Gender
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_MartialStatus(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.MartialStatus
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_Religion(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Religion
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_Country(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Country
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = "( " + x.CallingCode + " )" + x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_Relationship(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Relationship
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_Occupation(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Occupation
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_PolicyPeriod(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.PolicyPeriod
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                             MonthsNo = x.MonthNo,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_CampusType(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.CampusType.Where(x => x.Status == true)
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        
        public static List<SQLParamters> GET_LK1_AcademicYear(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.AcademicYear.Where(x => x.Status == true)
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_OrganizationType(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.OrganizationType
                        .Where(x => x.Status == true)
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_City(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.City
                         .Where(x => x.CountryId == PostedData.CountryId && x.Status == true)
                         .Select(x => new SQLParamters { Id = x.Id, Description = x.Description, }).ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_RollCallSystem(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.RollCallSystem
                         .Select(x => new SQLParamters { Id = x.Id, Description = x.Description, }).ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_BillingMethod(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.BillingMethod
                         .Select(x => new SQLParamters { Id = x.Id, Description = x.Description, }).ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_RegistrationType(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.RegistrationType
                      .Select(x => new SQLParamters { Id = x.Id, Description = x.Description })
                      .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_FeeCatagory(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.FeeCatagory
                      .Where(X => X.Status == true)
                      .Select(x => new SQLParamters { Id = x.Id, Description = x.Description })
                      .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_ChargingMethod(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.ChargingMethod
                      .Select(x => new SQLParamters { Id = x.Id, Description = x.Description })
                      .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_AdmissionCatagory(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.AdmissionCatagory
                      .Select(x => new SQLParamters { Id = x.Id, Description = x.Description })
                      .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_ChallanType(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.ChallanType
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                             DB_IF_PARAM = x.DBFilter,

                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_Role(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Role
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_Right(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Right
                         .Select(x => new SQLParamters
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
        public static List<SQLParamters> GET_LK1_URLType(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.URLType
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_StudyLevel(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.StudyLevel
                        .Where(x => x.Status == true)
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_StudyGroup(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.StudyGroup
                        .Where(x => x.Status == true)
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_ChallanMethod(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.ChallanMethod
                        .Where(x => x.Status == true)
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                             ChallanNo = x.ChallanNo,
                             MonthsNo = x.MonthsNo,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_StudyScheme(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.StudyScheme
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                             IsSemesterRequired = x.IsSemesterRequired,
                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_Semester(SQLParamters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                var DATA = db.Semester
                        .Where(x=>x.StudySchemeId == PostedData.StudySchemeId)
                        .Select(x => new SQLParamters
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