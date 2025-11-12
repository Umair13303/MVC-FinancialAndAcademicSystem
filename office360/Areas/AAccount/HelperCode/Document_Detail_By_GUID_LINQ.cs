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
                       (from FT in db.AFTM_FeeType
                        where FT.CompanyId == Session_Manager.CompanyId && FT.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = FT.Id,
                            GuID = FT.GuID,
                            Code = FT.Code,
                            Description = FT.Description,
                            FeeCategoryId = FT.FeeCategoryId,
                            IsOtherFee = db.FeeCatagory.Where(FC => FC.Id == FT.FeeCategoryId).Select(FC => FC.IsOtherFee).FirstOrDefault(),
                            ChargingMethodId = FT.ChargingMethodId,
                            IsOnAdmission = FT.IsOnAdmission,
                            IsSecurity = FT.IsSecurity,
                            IsRefundable = FT.IsRefundable,
                            IsDiscount = FT.IsDiscount,
                            RevenueAccountId = FT.RevenueAccountId,
                            AssetAccountId = FT.AssetAccountId,
                            LiabilityAccountId = FT.LiabilityAccountId,
                            CostOfSaleAccountId = FT.CostOfSaleAccountId,
                            Remarks = FT.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion

        #region HELPER FOR :: GET DATA USING LINQ (ACFSM_CLASSFEESTRUCTURE && ACFSM_CLASSFEESTRUCTUREFEETYPE) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_ACFSM_CLASSFEESTRUCTURE_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from CFS in db.ACFSM_ClassFeeStructure
                        where CFS.CompanyId == Session_Manager.CompanyId && CFS.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = CFS.Id,
                            GuID = CFS.GuID,
                            CampusId = CFS.CampusId,
                            Description = CFS.Description,
                            ChallanMethodId = CFS.ChallanMethodId,
                            WHTaxPolicyId = CFS.WHTaxPolicyId,
                            AdmissionSessionId = CFS.AdmissionSessionId,
                            ClassId = CFS.ClassId,
                            Remarks = CFS.Remarks,
                        }).ToList());

                return DATA;
            }
        }
        public static List<SQLParamters> GET_MT_ACFSM_CLASSFEESTRUCTUREFEETYPE_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from CFSFT in db.ACFSM_ClassFeeStructureFeeType
                        join CFS in db.ACFSM_ClassFeeStructure on CFSFT.ClassFeeStructureId equals CFS.Id
                        where CFS.CompanyId == Session_Manager.CompanyId && CFS.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = CFSFT.Id,
                            GuID = CFSFT.GuID,
                            FeeType = db.AFTM_FeeType.Where(FT => FT.Id == CFSFT.FeeTypeId).Select(FT => FT.Description).FirstOrDefault(),
                            RevenueAccount = db.ACOAM_ChartOfAccount.Where(COA => COA.Id == CFSFT.RevenueAccountId).Select(COA => COA.Description).FirstOrDefault(),
                            AssetAccount = db.ACOAM_ChartOfAccount.Where(COA => COA.Id == CFSFT.AssetAccountId).Select(COA => COA.Description).FirstOrDefault(),
                            LiabilityAccount = db.ACOAM_ChartOfAccount.Where(COA => COA.Id == CFSFT.LiabilityAccountId).Select(COA => COA.Description).FirstOrDefault(),
                            CostOfSaleAccount = db.ACOAM_ChartOfAccount.Where(COA => COA.Id == CFSFT.CostOfSaleAccountId).Select(COA => COA.Description).FirstOrDefault(),
                            Amount= CFSFT.Amount,
                            FeeTypeId = CFSFT.FeeTypeId,
                            RevenueAccountId = CFSFT.RevenueAccountId,
                            AssetAccountId = CFSFT.AssetAccountId,
                            LiabilityAccountId = CFSFT.LiabilityAccountId,
                            CostOfSaleAccountId = CFSFT.CostOfSaleAccountId,
                        }).ToList());

                return DATA;
            }
        }
        #endregion


    }
}