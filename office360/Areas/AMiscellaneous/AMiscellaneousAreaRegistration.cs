using System.Web.Mvc;

namespace office360.Areas.AMiscellaneous
{
    public class AMiscellaneousAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AMiscellaneous";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AMiscellaneous_default",
                "AMiscellaneous/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}