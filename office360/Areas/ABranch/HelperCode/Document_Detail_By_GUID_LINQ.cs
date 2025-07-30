using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace office360.Areas.ABranch.HelperCode
{
    public class Document_Detail_By_GUID_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ (BM_BRANCH) ::-- MAIN DB
        public static List<_SqlParameters> GET_MT_BM_BRANCH_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> DATA = new List<_SqlParameters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<_SqlParameters>)
                       (from B in db.BM_Branch
                        where B.CompanyId == Session_Manager.CompanyId && B.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = B.Id,
                            GuID = B.GuID,
                            Code = B.Code,
                            Description = B.Description,
                            CampusTypeId = B.CampusTypeId,
                            OrganizationTypeId = B.OrganizationTypeId,
                            CountryId = B.CountryId,
                            CityId = B.CityId,
                            Address = B.Address,
                            ContactNo = B.ContactNo,
                            EmailAddress = B.EmailAddress,
                            NTNNo = B.NTNNo,
                            Remarks = B.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion

    }
}