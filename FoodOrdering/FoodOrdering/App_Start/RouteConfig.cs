using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace FoodOrdering
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Index1",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index1", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "ClientIndex",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Main", action = "ClientIndex", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "VendorIndex",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Main", action = "VendorIndex", id = UrlParameter.Optional }
            );

        }
    }
}
