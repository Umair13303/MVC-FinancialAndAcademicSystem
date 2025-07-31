using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace office360.Areas.ACompany.HelperCode
{
    public class Document_Detail_By_GUID_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ (CM_COMPANY) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_CM_COMPANY_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from C in db.CM_Company
                        where C.CompanyId == Session_Manager.CompanyId && C.GuID == PostedData.GuID
                        select new SQLParamters
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
        public static List<SQLParamters> GET_MT_RSM_RIGHTSETTING_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from RS in db.RSM_RightSetting
                        where
                        RS.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = RS.Id,
                            GuID = RS.GuID,
                            RightId = RS.RightId,
                            Description = RS.Description,
                            URLTypeId = RS.URLTypeId,
                            BranchId = RS.BranchId,
                            CompanyId = RS.CompanyId,
                            Remarks = RS.Remarks,

                        }).ToList());

                return DATA;
            }
        }

        #endregion

    }
}