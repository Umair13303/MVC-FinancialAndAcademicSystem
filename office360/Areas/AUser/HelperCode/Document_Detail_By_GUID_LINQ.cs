using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;

namespace office360.Areas.AUser.HelperCode
{
    public class Document_Detail_By_GUID_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ (UM_USER) ::-- MAIN DB
        public static List<_SqlParameters> GET_MT_UM_USER_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> DATA = new List<_SqlParameters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<_SqlParameters>)
                       (from U in db.UM_User
                        where 
                        U.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = U.Id,
                            GuID = U.GuID,
                            Name = U.Name,
                            UserName = U.UserName,
                            Password = U.Password,
                            EmailAddress = U.EmailAddress,
                            MobileNumber = U.MobileNumber,
                            EmployeeId = U.EmployeeId,
                            RoleId = U.RoleId,
                            AllowedCampusIds = U.AllowedCampusIds,
                            IsLogIn = U.IsLogIn,
                            IsDeveloper = U.IsDeveloper,
                            BranchId = U.BranchId,
                            CompanyId = U.CompanyId,
                            Remarks = U.Remarks,

                        }).ToList());

                return DATA;
            }
        }

        #endregion
        #region HELPER FOR :: GET DATA USING LINQ (RSM_RIGHTSETTING) ::-- MAIN DB
        public static List<_SqlParameters> GET_MT_RSM_RIGHTSETTING_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> DATA = new List<_SqlParameters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<_SqlParameters>)
                       (from RU in db.RSM_RightSetting
                        where
                        RU.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = RU.Id,
                            GuID = RU.GuID,
                            RightId = RU.RightId,
                            Description = RU.Description,
                            URLTypeId = RU.URLTypeId,
                            BranchId = RU.BranchId,
                            CompanyId = RU.CompanyId,
                            Remarks = RU.Remarks,

                        }).ToList());

                return DATA;
            }
        }

        #endregion

    }
}