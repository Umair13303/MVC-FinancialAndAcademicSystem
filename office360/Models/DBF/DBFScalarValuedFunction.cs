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
    public class DBFScalarValuedFunction
    {
        public static decimal? WHTax(int? WHTaxPolicyId, decimal TaxableAmount)
        {
            try
            {
                string ConnectionString = ConfigurationManager.ConnectionStrings["FASQUERYEntities"].ConnectionString;
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    conn.Open();  // <-- You must open the connection!

                    using (SqlCommand cmd = new SqlCommand("SELECT dbo.fn_Calculation_WHTax(@WHTaxPolicyId, @TaxableAmount)", conn))
                    {
                        cmd.Parameters.AddWithValue("@WHTaxPolicyId", WHTaxPolicyId);
                        cmd.Parameters.AddWithValue("@TaxableAmount", TaxableAmount);
                        object result = cmd.ExecuteScalar();

                        if (result != null && result != DBNull.Value)
                            return Convert.ToDecimal(result);
                        else
                            return null;
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