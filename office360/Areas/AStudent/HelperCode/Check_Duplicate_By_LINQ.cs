using System.Linq;
using System.Web;
using static office360.Models.General.HttpServerStatus;
using System.Data.Entity.Infrastructure;
using office360.Models.EDMX;
using office360.Models.General;
using office360.Common.CommonHelper;
using System.Data.Entity.Core.Objects;
using office360.Extensions;
using System;
using System.Collections.Generic;
namespace office360.Areas.AStudent.HelperCode
{
    public class Check_Duplicate_By_LINQ
    {

        #region HELPER FOR :: CHECK IF STUDENT(ACTIVE_ENROLLED) ALREADY EXIST
        public static int? IS_EXIST_BULK_SM_STUDENT_BY_PARAMETER(string OperationType,List<TVParam.SM_Student_TVP> PostedDataDetail)
        {
            using (FASEntities db = new FASEntities())
            {
                int? Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                try
                {
                    bool IsRecordExist = false;
                    switch (OperationType)
                    {
                        case nameof(DB_OperationType.INSERT_DATA_INTO_DB):
                            #region IN CASE OF INSERT :: CHECK IF ENTERY RECORD EXIST , BASED ON DATA ENTERED
                            var CampusIds = PostedDataDetail.Select(PDD => PDD.CampusId).ToList();
                            var StudentCNICs = PostedDataDetail.Select(PDD => PDD.StudentCNIC).ToList();
                            IsRecordExist =
                                db.SM_Student
                                .Any(x =>
                                    x.CompanyId == Session_Manager.CompanyId
                                && CampusIds.Contains(x.CampusId)
                                && StudentCNICs.Contains(x.StudentCNIC)
                                && x.Status == true
                                );
                            #endregion
                            if (!IsRecordExist)
                                Response = (int?)Http_DB_Response.CODE_AUTHORIZED;
                            else
                                Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                            break;

                        case nameof(DB_OperationType.UPDATE_DATA_INTO_DB):
                            #region IN CASE OF UPDATE :: CHECK IF ENTERY RECORD EXIST , BASED ON SYSTEM GUID
                            var GuIDs = PostedDataDetail.Select(PDD => PDD.GuID).ToList();
                            IsRecordExist =
                                db.SM_Student
                                .Any(x =>
                                    x.CompanyId == Session_Manager.CompanyId
                                && GuIDs.Contains(x.GuID)
                                );
                            #endregion
                            if (!IsRecordExist)
                                Response = (int?)Http_DB_Response.CODE_DATA_DOES_NOT_EXIST;
                            else
                                Response = (int?)Http_DB_Response.CODE_AUTHORIZED;

                            break;

                        default:
                            Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                            break;

                    }
                    return Response;
                }
                catch (Exception Ex)
                {
                    return HttpServerStatus.Http_DB_Response.CODE_UN_KNOWN_ACTIVITY.ToInt();

                }

            }
        }
        #endregion
    }
}