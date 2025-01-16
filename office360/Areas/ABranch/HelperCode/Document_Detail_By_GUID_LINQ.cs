using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;

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
                       (from GB in db.BM_Branch
                        where GB.CompanyId == Session_Manager.CompanyId && GB.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = GB.Id,
                            GuID = GB.GuID,
                            Code = GB.Code,
                            Description = GB.Description,
                            CampusTypeId = GB.CampusTypeId,
                            OrganizationTypeId = GB.OrganizationTypeId,
                            CountryId = GB.CountryId,
                            CityId = GB.CityId,
                            Address = GB.Address,
                            ContactNo = GB.ContactNo,
                            EmailAddress = GB.EmailAddress,
                            NTNNo = GB.NTNNo,
                            Remarks = GB.Remarks,
                            RollCallSystemId = db.BM_BranchSetting.Where(BS => BS.CampusId == GB.Id && BS.DocumentStatus == (int?)DocStatus.ACTIVE_BRANCH_SETTING).Select(BS => BS.RollCallSystemId).FirstOrDefault(),
                            BillingMethodId = db.BM_BranchSetting.Where(BS => BS.CampusId == GB.Id && BS.DocumentStatus == (int?)DocStatus.ACTIVE_BRANCH_SETTING).Select(BS => BS.BillingMethodId).FirstOrDefault(),
                            StudyLevelIds = db.BM_BranchSetting.Where(BS => BS.CampusId == GB.Id && BS.DocumentStatus == (int?)DocStatus.ACTIVE_BRANCH_SETTING).Select(BS => BS.StudyLevelIds).FirstOrDefault(),
                            StudyGroupIds = db.BM_BranchSetting.Where(BS => BS.CampusId == GB.Id && BS.DocumentStatus == (int?)DocStatus.ACTIVE_BRANCH_SETTING).Select(BS => BS.StudyGroupIds).FirstOrDefault(),
                            PolicyPeriodId = db.BM_BranchSetting.Where(BS => BS.CampusId == GB.Id && BS.DocumentStatus == (int?)DocStatus.ACTIVE_BRANCH_SETTING).Select(BS => BS.PolicyPeriodId).FirstOrDefault(),
                            ChallanMethodId = db.BM_BranchSetting.Where(BS => BS.CampusId == GB.Id && BS.DocumentStatus == (int?)DocStatus.ACTIVE_BRANCH_SETTING).Select(BS => BS.ChallanMethodId).FirstOrDefault()

                        }).ToList());

                return DATA;
            }
        }
        #endregion

    }
}