using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;

namespace office360.Areas.ACompany.HelperCode
{
    public class Document_Detail_By_GUID_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ (CM_COMPANY) ::-- MAIN DB
        public static List<_SqlParameters> GET_MT_CM_COMPANY_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> DATA = new List<_SqlParameters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<_SqlParameters>)
                       (from C in db.CM_Company
                        where C.CompanyId == Session_Manager.CompanyId && C.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = C.Id,
                            GuID = C.GuID,
                            CompanyName = C.CompanyName,
                            CountryId = C.CountryId,
                            CityId = C.CityId,
                            Address = C.AddressLine,
                            PhoneNumber = C.PhoneNumber,
                            EmailAddress = C.EmailAddress,
                            CompanyWebsite = C.CompanyWebsite,
                            Remarks = C.Remarks,

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