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
                    var CampusIds = PostedDataDetail.Select(p => p.CampusId).ToList();
                    var StudentCNICs = PostedDataDetail.Select(p => p.StudentCNIC).ToList();
                    switch (OperationType)
                    {
                        case nameof(DB_OperationType.INSERT_DATA_INTO_DB):
                            #region IN CASE OF INSERT :: CHECK IF ENTERY RECORD EXIST , BASED ON DATA ENTERED
                            IsRecordExist =
                                db.SM_Student
                                .Any(x =>
                                    x.CompanyId == Session_Manager.CompanyId
                                && CampusIds.Contains(x.CampusId)
                                && StudentCNICs.Contains(x.StudentCNIC)
                                && x.DocumentStatus == (int?)DOCUMENT_STATUS.ACTIVE_STUDENT
                                && x.Status == true
                                );
                            #endregion
                            if (!IsRecordExist)
                                Response = (int?)Http_DB_Response.CODE_AUTHORIZED;
                            else
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