using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace office360.Areas.AStudent.HelperCode
{
    public class Document_Detail_By_GUID_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ (SM_STUDENT) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_SM_STUDENT_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (FASEntities db = new FASEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from S in db.SM_Student
                        where S.CompanyId == Session_Manager.CompanyId && S.CampusId == PostedData.CampusId && S.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = S.Id,
                            GuID = S.GuID,
                            CampusId = S.CampusId,
                            AdmissionSessionId=S.AdmissionSessionId, 
                            ClassId=S.ClassId, 
                            AdmissionCategoryId=S.AdmissionCategoryId,
                            RegistrationNumber = S.RegistrationNumber,
                            StudentName =S.StudentName,
                            StudentCNIC= S.StudentCNIC,
                            BirthDate= S.BirthDate.ToString(), 
                            ReligionId= S.ReligionId, 
                            CountryId= S.CountryId,
                            DomicileDistrict= S.DomicileDistrict,
                            FatherName = S.FatherName,
                            FatherCNIC = S.FatherCNIC,
                            OccupationId = S.OccupationId,
                            IsFatherAlive = S.IsFatherAlive,
                            GuardianName = S.GuardianName,
                            GuardianCNIC = S.GuardianCNIC,
                            StudentMobile = S.StudentMobile,
                            StudentEmail = S.StudentEmail,
                            ParentMobile = S.ParentMobile,
                            LandLine = S.LandLine,
                            EmergencyMobile = S.EmergencyMobile,
                            Address = S.Address,
                            Remarks = S.Remarks,

                        }).ToList());

                return DATA;
            }
        }
        #endregion
    }
}