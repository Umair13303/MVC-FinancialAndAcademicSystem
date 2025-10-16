using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace office360.Areas.AAccount.HelperCode
{
    public class Document_Detail_By_GUID_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ (ACOAM_CHARTOFACCOUNT) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_ACOAM_CHARTOFACCOUNT_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from COA in db.ACOAM_ChartOfAccount
                        where COA.CompanyId == Session_Manager.CompanyId && COA.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = COA.Id,
                            GuID = COA.GuID,
                            Code = COA.Code,
                            Description = COA.Description,
                            AccountTypeId = COA.AccountTypeId,
                            AccountCategoryId = COA.AccountCategoryId,
                            FinancialStatementId = COA.FinancialStatementId,
                            Remarks = COA.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion

    }
}