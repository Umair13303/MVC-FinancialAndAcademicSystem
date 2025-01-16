using office360.Extensions;
using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;
using static office360.Models.General.DBListCondition;
using static office360.Models.General.Http_Server_Status;
namespace office360.GlobalHelper.LookUp
{
    public class LookUp_GetDataFromDB_SP
    {
        #region HELPER FOR :: GET DATA USING STORED PROCEDURE ::-- DB_LOOKUP
        public static List<LK_ChallanMethod_GetListByParam_Result> GET_LK1_ChallanMethod(_SqlParameters PostedData)
        {
            List<LK_ChallanMethod_GetListByParam_Result> DATA = new List<LK_ChallanMethod_GetListByParam_Result>();
            using (var db = new SESEntities())
            {
                DATA = db.LK_ChallanMethod_GetListByParam(
                                                        PostedData.DB_IF_PARAM,
                                                        PostedData.Id).ToList();

            }
            return DATA;
        }
        public static List<LK_StudyLevel_GetListByParam_Result> GET_LK1_StudyLevel(_SqlParameters PostedData)
        {
            List<LK_StudyLevel_GetListByParam_Result> data = new List<LK_StudyLevel_GetListByParam_Result>();
            using (var db = new SESEntities())
            {
                data = db.LK_StudyLevel_GetListByParam(
                                                        PostedData.DB_IF_PARAM,
                                                        Session_Manager.CompanyId,
                                                        PostedData.CampusId
                                                      ).ToList();
            }
            return data;
        }
        public static List<LK_StudyGroup_GetListByParam_Result> GET_LK1_StudyGroup(_SqlParameters PostedData)
        {
            List<LK_StudyGroup_GetListByParam_Result> DATA = new List<LK_StudyGroup_GetListByParam_Result>();
            using (var db = new SESEntities())
            {
                DATA = db.LK_StudyGroup_GetListByParam(
                                                        PostedData.DB_IF_PARAM,
                                                        Session_Manager.CompanyId,
                                                        PostedData.CampusId
                                                      ).ToList();
            }
            return DATA;
        }
        public static List<LK_WHTaxPolicy_GetListByParam_Result> GET_LK1_WHTaxPolicy(_SqlParameters PostedData)
        {
            List<LK_WHTaxPolicy_GetListByParam_Result> DATA = new List<LK_WHTaxPolicy_GetListByParam_Result>();
            using (var db = new SESEntities())
            {
                DATA = db.LK_WHTaxPolicy_GetListByParam(
                                                        PostedData.DB_IF_PARAM,
                                                        Session_Manager.CompanyId,
                                                        Session_Manager.BranchId,
                                                        PostedData.FeeStructureId
                                                        ).ToList();
            }
            return DATA;
        }
        #endregion
    }
}