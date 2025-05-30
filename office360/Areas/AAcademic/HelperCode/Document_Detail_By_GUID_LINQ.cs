using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;

namespace office360.Areas.AAcademic.HelperCode
{
    public class Document_Detail_By_GUID_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ (BM_BRANCH) ::-- MAIN DB
        public static List<_SqlParameters> GET_MT_ACM_CLASS_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> DATA = new List<_SqlParameters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<_SqlParameters>)
                       (from C in db.ACM_Class
                        where C.CompanyId == Session_Manager.CompanyId && C.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = C.Id,
                            GuID = C.GuID,
                            Code = C.Code,
                            CampusId = C.CampusId,
                            Description = C.Description,
                            StudyLevelId = C.StudyLevelId,
                            StudyGroupId = C.StudyGroupId,
                            Remarks = C.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion
    }
}