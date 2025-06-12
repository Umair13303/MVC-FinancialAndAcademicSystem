using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;
using static office360.Models.General.Http_Server_Status;
using static office360.Models.General.DBListCondition;
using DocumentStatus = office360.Models.General.DocumentStatus;
using System.Data.Entity.Infrastructure;
using office360.Models.EDMX;
using office360.Models.General;
using office360.Common.CommonHelper;
using System.Data.Entity.Core.Objects;
using office360.Extensions;
using System;
namespace office360.Areas.AAcademic.HelperCode
{
    public class Check_Duplicate_By_LINQ
    {
        #region HELPER FOR :: CHECK IF CLASS(ACTIVE_CLASS) ALREADY EXIST
        public static int? IS_EXIST_ACM_CLASS_BY_PARAMETER(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                bool IsRecordExist=false;
                int? Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                try
                {
                    switch (PostedData.OperationType)
                    {
                        case nameof(DB_OperationType.INSERT_DATA_INTO_DB):

                            #region IN CASE OF INSERT :: CHECK IF ENTERY RECORD EXIST , BASED ON DATA ENTERED
                            IsRecordExist = db.ACM_Class
                                .Any(x =>
                                    x.CompanyId == Session_Manager.CompanyId 
                                &&  x.CampusId == PostedData.CampusId 
                                &&  x.Description == PostedData.Description 
                                &&  x.StudyGroupId == PostedData.StudyGroupId 
                                &&  x.StudyLevelId == PostedData.StudyLevelId 
                                &&  x.DocumentStatus == (int?)DocStatus.ACTIVE_ACADEMIC_CLASS 
                                &&  x.Status == true
                                );
                            #endregion

                            if (!IsRecordExist)
                                Response = (int?)Http_DB_Response.CODE_AUTHORIZED;
                            else
                                Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                            break;

                        case nameof(DB_OperationType.UPDATE_DATA_INTO_DB):

                            #region IN CASE OF UPDATE :: CHECK IF ENTERY RECORD EXIST , BASED ON SYSTEM GUID
                            IsRecordExist = db.ACM_Class.Any(x =>    x.GuID == PostedData.GuID);
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
                    return Http_Server_Status.Http_DB_Response.CODE_UN_KNOWN_ACTIVITY.ToInt();

                }

            }
        }
        #endregion

        #region HELPER FOR :: CHECK IF CLASS(ACTIVE_ADMISSIONSESSION) ALREADY EXIST
        public static int? IS_EXIST_AASM_ADMISSIONSESSION_BY_PARAMETER(_SqlParameters PostedData)
        {
            using (SESEntities db = new SESEntities())
            {
                int? Response = (int?)Http_DB_Response.CODE_DATA_ALREADY_EXIST;
                try
                {
                    bool IsRecordExist = false;
                    switch (PostedData.OperationType)
                    {
                        case nameof(DB_OperationType.INSERT_DATA_INTO_DB):
                            #region IN CASE OF INSERT :: CHECK IF ENTERY RECORD EXIST , BASED ON DATA ENTERED
                            IsRecordExist = db.AASM_AdmissionSession
                            .Any(x =>
                                x.CompanyId == Session_Manager.CompanyId
                            && x.CampusId == PostedData.CampusId
                            && x.Description == PostedData.Description
                            && x.DocumentStatus == (int?)DocStatus.ACTIVE_ACADEMIC_ADMISSION_SESSION
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
                            IsRecordExist = db.AASM_AdmissionSession.Any(x => x.GuID == PostedData.GuID);
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
                    return Http_Server_Status.Http_DB_Response.CODE_UN_KNOWN_ACTIVITY.ToInt();

                }

            }
        }
        #endregion


    }
}