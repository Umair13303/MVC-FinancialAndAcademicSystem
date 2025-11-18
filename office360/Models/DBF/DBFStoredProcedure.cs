using office360.Common.CommonHelper;
using office360.Extensions;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace office360.Models.DBF
{
    public class DBFStoredProcedure
    {
        public static int? ACCM_ClassCurriculum_Upsert(string DB_OperationType, Guid? GuID,int? CampusId, string Description,int? ClassId, DateTime? CreatedOn, int? CreatedBy, DateTime? UpdatedOn, int? UpdatedBy, int? DocType,int? DocumentStatus,bool? Status, int? BranchId, int? CompanyId,string Remarks, List<TVParam.ACCM_ClassCurriculumSubject_TVP> TVP_ACCM_ClassCurriculum, SqlParameter Response)
        {
            try
            {
                string ConnectionString = ConfigurationManager.ConnectionStrings["FASQUERYEntities"].ConnectionString;
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("ACCM_ClassCurriculum_Upsert", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@DB_OperationType", DB_OperationType);
                        cmd.Parameters.AddWithValue("@GuID", GuID);
                        cmd.Parameters.AddWithValue("@CampusId", CampusId);
                        cmd.Parameters.AddWithValue("@Description", Description);
                        cmd.Parameters.AddWithValue("@ClassId", ClassId);
                        cmd.Parameters.AddWithValue("@CreatedOn", CreatedOn);
                        cmd.Parameters.AddWithValue("@CreatedBy", CreatedBy);
                        cmd.Parameters.AddWithValue("@UpdatedOn", UpdatedOn);
                        cmd.Parameters.AddWithValue("@UpdatedBy", UpdatedBy);
                        cmd.Parameters.AddWithValue("@DocType", DocType);
                        cmd.Parameters.AddWithValue("@DocumentStatus", DocumentStatus);
                        cmd.Parameters.AddWithValue("@Status", true);
                        cmd.Parameters.AddWithValue("@BranchId", BranchId);
                        cmd.Parameters.AddWithValue("@CompanyId", CompanyId);
                        cmd.Parameters.AddWithValue("@Remarks", Remarks);

                        SqlParameter TVParam = cmd.Parameters.AddWithValue("@TVP_ACCM_ClassCurriculum", TVP_ACCM_ClassCurriculum.ToDataTable());
                        TVParam.SqlDbType = SqlDbType.Structured;
                        TVParam.TypeName = "dbo.BULK_ACCM_ClassCurriculumSubject";


                        cmd.Parameters.Add(Response);

                        conn.Open();
                        cmd.ExecuteNonQuery();

                        return (int?)Response.Value;
                    }
                }
            }
            catch(Exception Ex)
            {
                throw Ex;
            }

        }
        public static int? AASM_AdmissionSession_Upsert(string DB_OperationType, Guid? GuID,int? CampusId, string Description,int? AcademicYearId,DateTime? AdmissionStartDate, DateTime? AdmissionEndDate, DateTime? CreatedOn, int? CreatedBy, DateTime? UpdatedOn, int? UpdatedBy, int? DocType,int? DocumentStatus,bool? Status, int? BranchId, int? CompanyId,string Remarks, List<TVParam.AASM_AdmissionSessionClass_TVP> TVP_AASM_AdmissionSessionClass, SqlParameter Response)
        {
            try
            {
                string ConnectionString = ConfigurationManager.ConnectionStrings["FASQUERYEntities"].ConnectionString;
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("AASM_AdmissionSession_Upsert", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@DB_OperationType", DB_OperationType ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@GuID", GuID ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@CampusId", CampusId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@Description", Description ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@AcademicYearId", AcademicYearId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@AdmissionStartDate", AdmissionStartDate ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@AdmissionEndDate", AdmissionEndDate ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@CreatedOn", CreatedOn ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@CreatedBy", CreatedBy ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@UpdatedOn", UpdatedOn ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@UpdatedBy", UpdatedBy ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@DocType", DocType ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@DocumentStatus", DocumentStatus ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@Status", Status ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@BranchId", BranchId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@CompanyId", CompanyId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@Remarks", Remarks ?? (object)DBNull.Value);

                        SqlParameter TVParam = cmd.Parameters.AddWithValue("@TVP_AASM_AdmissionSessionClass", TVP_AASM_AdmissionSessionClass.ToDataTable());
                        TVParam.SqlDbType = SqlDbType.Structured;
                        TVParam.TypeName = "dbo.BULK_AASM_AdmissionSessionClass";


                        cmd.Parameters.Add(Response);

                        conn.Open();
                        cmd.ExecuteNonQuery();

                        return (int?)Response.Value;
                    }
                }
            }
            catch(Exception Ex)
            {
                throw Ex;
            }

        }
        public static int? ACFSM_ClassFeeStructure_Upsert(string DB_OperationType,Guid? GuID,int? CampusId,string Description,int? ChallanMethodId,int? WHTaxPolicyId,int? AdmissionSessionId,int? ClassId,DateTime? CreatedOn,int? CreatedBy,DateTime? UpdatedOn,int? UpdatedBy,int? DocType,int? DocumentStatus,bool? Status,int? BranchId,int? CompanyId,string Remarks, List<TVParam.ACFSM_ClassFeeStructureFeeType_TVP> TVP_ACFSM_ClassFeeStructureFeeType_TVP, SqlParameter Response)
        {
            try
            {
                string ConnectionString = ConfigurationManager.ConnectionStrings["FASQUERYEntities"].ConnectionString;
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("ACFSM_ClassFeeStructure_Upsert", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@DB_OperationType", DB_OperationType ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@GuID", GuID ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@CampusId", CampusId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@Description", Description ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@ChallanMethodId", ChallanMethodId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@WHTaxPolicyId", WHTaxPolicyId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@AdmissionSessionId", AdmissionSessionId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@ClassId", ClassId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@CreatedOn", CreatedOn ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@CreatedBy", CreatedBy ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@UpdatedOn", UpdatedOn ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@UpdatedBy", UpdatedBy ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@DocType", DocType ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@DocumentStatus", DocumentStatus ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@Status", Status ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@BranchId", BranchId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@CompanyId", CompanyId ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@Remarks", Remarks ?? (object)DBNull.Value);

                        SqlParameter TVParam = cmd.Parameters.AddWithValue("@TVP_ACFSM_ClassFeeStructureFeeType", TVP_ACFSM_ClassFeeStructureFeeType_TVP.ToDataTable());
                        TVParam.SqlDbType = SqlDbType.Structured;
                        TVParam.TypeName = "dbo.BULK_ACFSM_ClassFeeStructureFeeType";


                        cmd.Parameters.Add(Response);

                        conn.Open();
                        cmd.ExecuteNonQuery();

                        return (int?)Response.Value;
                    }
                }
            }
            catch (Exception Ex)
            {
                throw Ex;
            }

        }
    }
}