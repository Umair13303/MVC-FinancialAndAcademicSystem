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
        public static List<SQLParamters> GET_LK1_EnrollmentType_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_Gender_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_MartialStatus_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_Religion_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_Country_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_Relationship_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_Occupation_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_PolicyPeriod_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_CampusType_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_AcademicYear_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_OrganizationType_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_City_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.City
                         .Where(x => x.CountryId == PostedData.CountryId && x.Status == true)
                         .Select(x => new SQLParamters { Id = x.Id, Description = x.Description, }).ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_RollCallSystem_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.RollCallSystem
                         .Select(x => new SQLParamters { Id = x.Id, Description = x.Description, }).ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_BillingMethod_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.BillingMethod
                         .Select(x => new SQLParamters { Id = x.Id, Description = x.Description, }).ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_RegistrationType_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.RegistrationType
                      .Select(x => new SQLParamters { Id = x.Id, Description = x.Description })
                      .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_FeeCatagory_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.FeeCatagory
                      .Select(x => new SQLParamters { Id = x.Id, Description = x.Description, IsOtherFee = x.IsOtherFee })
                      .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_ChargingMethod_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.ChargingMethod
                      .Select(x => new SQLParamters { Id = x.Id, Description = x.Description, IsRecurring = x.IsRecurring })
                      .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_AdmissionCatagory_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.AdmissionCatagory
                      .Select(x => new SQLParamters { Id = x.Id, Description = x.Description })
                      .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_ChallanType_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.ChallanType
                         .Select(x => new SQLParamters
                         {
                             Id = x.Id,
                             Description = x.Description,
                             DB_IF_PARAM = x.DB_IF_Condition,

                         })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_Role_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_Right_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_URLType_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_StudyLevel_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_StudyGroup_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_ChallanMethod_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_StudyScheme_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_Semester_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
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
        public static List<SQLParamters> GET_LK1_AccountType_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.AccountType
                        .Where(x=>x.Status == true)
                        .Select(x => new SQLParamters
                        {
                            Id = x.Id,
                            Description = x.Description,
                        })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_AccountCatagory_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.AccountCatagory
                        .Where(x=>x.Status == true && x.AccountTypeId == PostedData.AccountTypeId)
                        .Select(x => new SQLParamters
                        {
                            Id = x.Id,
                            Description = x.Description,
                        })
                         .ToList();

                return DATA;
            }
        }
        public static List<SQLParamters> GET_LK1_FinancialStatement_List(SQLParamters PostedData)
        {
            using (FASEntities db = new FASEntities())
            {
                var DATA = db.FinancialStatement
                        .Where(x=>x.Status == true)
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