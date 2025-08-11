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

                        return 200;
                    }
                }
            }
            catch(Exception Ex)
            {
                throw Ex;
            }

        }
    }
}