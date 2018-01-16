using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FoodOrdering.Models;

namespace FoodOrdering.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return File("~/Views/Home/index.html", "text/html");
        }
        public ActionResult First()
        {
            return File("~/Views/Home/home.html", "text/html");
        }
        public ActionResult Blog()
        {
            return File("~/Views/Home/blog.html", "text/html");
        }
        public ActionResult About()
        {
            return File("~/Views/Home/about.html", "text/html");
        }

        [HttpPost]
        public JsonResult UserLogin (Client d)
        {
            using (FoodOrderingDbEntities dc = new FoodOrderingDbEntities())
            {
                var user = dc.Clients.Where(a => a.ClientId.Equals(d.ClientId) && a.Password.Equals(d.Password)).FirstOrDefault();
                if(user != null)
                {
                    return Json("Welcome" + " " + d.ClientId);
                }
                else
                {
                    return Json("Error! Kindly check credentials");
                }                
            }
        }
    }
}