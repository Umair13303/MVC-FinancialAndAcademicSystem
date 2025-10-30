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

        #region HELPER FOR :: GET DATA USING LINQ (ADTM_DISCOUNTTYPE) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_ADTM_DISCOUNTTYPE_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from COA in db.ADTM_DiscountType
                        where COA.CompanyId == Session_Manager.CompanyId && COA.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = COA.Id,
                            GuID = COA.GuID,
                            Code = COA.Code,
                            Description = COA.Description,
                            CostOfSaleAccountId = COA.CostOfSaleAccountId,
                            IsByPercentage = COA.IsByPercentage,
                            DiscountPercentage = COA.DiscountPercentage,
                            IsByAmount = COA.IsByAmount,
                            DiscountAmount = COA.DiscountAmount,
                            Remarks = COA.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion

        #region HELPER FOR :: GET DATA USING LINQ (AFTM_FEETYPE) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_AFTM_FEETYPE_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from COA in db.AFTM_FeeType
                        where COA.CompanyId == Session_Manager.CompanyId && COA.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = COA.Id,
                            GuID = COA.GuID,
                            Code = COA.Code,
                            Description = COA.Description,
                            FeeCategoryId = COA.FeeCategoryId,
                            ChargingMethodId = COA.ChargingMethodId,
                            IsOnAdmission = COA.IsOnAdmission,
                            IsSecurity = COA.IsSecurity,
                            IsRefundable = COA.IsRefundable,
                            IsDiscount = COA.IsDiscount,
                            RevenueAccountId = COA.RevenueAccountId,
                            AssetAccountId = COA.AssetAccountId,
                            LiabilityAccountId = COA.LiabilityAccountId,
                            CostOfSaleAccountId = COA.CostOfSaleAccountId,
                            Remarks = COA.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion


    }
}