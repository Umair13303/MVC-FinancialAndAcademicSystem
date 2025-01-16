using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
namespace office360.Models.General
{
    public class BULK_TTModel
    {
        public DataTable AppSessionDetail_BULK_TT()
        {
            // Create a DataTable instance
            DataTable AppSessionDetail_BULK = new DataTable();

            AppSessionDetail_BULK.Columns.Add("Id", typeof(Guid));
            AppSessionDetail_BULK.Columns.Add("GuID", typeof(Guid));
            AppSessionDetail_BULK.Columns.Add("AppSessionId", typeof(int));
            AppSessionDetail_BULK.Columns.Add("Description", typeof(string));
            AppSessionDetail_BULK.Columns.Add("PeriodStartOn", typeof(DateTime));
            AppSessionDetail_BULK.Columns.Add("PeriodEndOn", typeof(DateTime));
            AppSessionDetail_BULK.Columns.Add("Status", typeof(bool));

            return AppSessionDetail_BULK;
        }

    }
    public partial class AppSessionDetail_BULK_TT
    {
        public int Id { get; set; }
        public Nullable<System.Guid> GuID { get; set; }
        public Nullable<int> AppSessionId { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> PeriodStartOn { get; set; }
        public Nullable<System.DateTime> PeriodEndOn { get; set; }
        public Nullable<bool> Status { get; set; }
    }
    public partial class EnrStudent_BULK_TT
    {
        public int Id { get; set; }
        public Nullable<System.Guid> GuID { get; set; }
        public string Code { get; set; }
        public Nullable<int> CampusId { get; set; }
        public Nullable<int> SessionId { get; set; }
        public Nullable<int> RegisteredPeriodId { get; set; }
        public Nullable<int> ClassId { get; set; }
        public Nullable<int> AdmissionCatagoryId { get; set; }
        public string RegistrationNo { get; set; }
        public string StudentName { get; set; }
        public string StudentCNIC { get; set; }
        public string BirthDate { get; set; }
        public Nullable<int> ReligionId { get; set; }
        public Nullable<int> CountryId { get; set; }
        public string DomicileDistrict { get; set; }
        public string FatherName { get; set; }
        public string FatherCNIC { get; set; }
        public Nullable<int> OccupationId { get; set; }
        public Nullable<bool> IsFatherAlive { get; set; }
        public string GuardianName { get; set; }
        public string GuardianCNIC { get; set; }
        public string StudentMobile { get; set; }
        public string StudentEmail { get; set; }
        public string ParentMobile { get; set; }
        public string LandLine { get; set; }
        public string EmergencyMobile { get; set; }
        public string Address { get; set; }
    }
}