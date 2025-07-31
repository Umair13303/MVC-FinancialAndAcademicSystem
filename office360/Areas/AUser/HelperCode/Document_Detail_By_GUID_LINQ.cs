using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace office360.Areas.AUser.HelperCode
{
    public class Document_Detail_By_GUID_LINQ
    {
        #region HELPER FOR :: GET DATA USING LINQ (UM_USER) ::-- MAIN DB
        public static List<SQLParamters> GET_MT_UM_USER_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from U in db.UM_User
                        where 
                        U.GuID == PostedData.GuID
                        select new SQLParamters
                        {
                            Id = U.Id,
                            GuID = U.GuID,
                            Name = U.Name,
                            UserName = U.UserName,
                            Password = U.Password,
                            EmailAddress = U.EmailAddress,
                            MobileNumber = U.MobileNumber,
                            EmployeeId = U.EmployeeId,
                            RoleId = U.RoleId,
                            AllowedCampusIds = U.AllowedCampusIds,
                            IsLogIn = U.IsLogIn,
                            IsDeveloper = U.IsDeveloper,
                            BranchId = U.BranchId,
                            CompanyId = U.CompanyId,
                            Remarks = U.Remarks,

                        }).ToList());

                return DATA;
            }
        }

        #endregion


        public static List<SQLParamters> GET_MT_URM_USERRIGHT_INFO_BY_GUID(SQLParamters PostedData)
        {
            List<SQLParamters> DATA = new List<SQLParamters>();

            using (SESEntities db = new SESEntities())
            {
                DATA = ((List<SQLParamters>)
                       (from UR in db.URM_UserRight
                        where UR.GuID == PostedData.GuID 
                        select new SQLParamters
                        {
                            Id = UR.Id,
                            GuID = UR.GuID,
                            CompanyId = UR.CompanyId,
                            UserId = UR.UserId,
                            RightId = UR.RightId,
                            Remarks = UR.Remarks,

                        }).ToList());

                return DATA;
            }
        }

    }
}